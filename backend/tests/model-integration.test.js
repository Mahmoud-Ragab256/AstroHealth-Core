// Start FastAPI first, then run with RUN_MODEL_INTEGRATION=1.
// Real Express HTTP -> real FastAPI/PyTorch; only MongoDB persistence is mocked.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { once } from 'node:events';
import express from 'express';
import Report from '../src/mongo/models/Report.js';
import * as endpoints from '../src/endpoints.js';
import { assessmentFields } from '../../shared/assessmentFields.js';

test('Express to live FastAPI inference for all five assessments', {
  skip: process.env.RUN_MODEL_INTEGRATION !== '1', timeout: 60000
}, async t => {
  const app = express();
  app.use(express.json());
  for (const type of Object.keys(assessmentFields)) app.post(`/api/${type}`, endpoints[type]);
  let saves = 0;
  t.mock.method(Report, 'create', async data => {
    const report = new Report(data);
    await report.validate();
    saves++;
    return report;
  });
  const server = app.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => server.close(resolve)));
  const base = `http://127.0.0.1:${server.address().port}`;
  const catalog = JSON.parse(await readFile(new URL('../../models/catalog.json', import.meta.url), 'utf8'));
  const sectionNames = { radiation: 'Radiation', psychological: 'Psychological', gravity: 'Gravity', respiration: 'Respiration', nutrition: 'Nutrition' };
  for (const [type, fields] of Object.entries(assessmentFields)) {
    const keys = Object.fromEntries(fields.map(field => [field.key === 'pao2' ? 'PaO₂' : field.key === 'paco2' ? 'PaCO₂' : field.name, field.key]));
    const body = { astronaut_id: 'AST-INTEGRATION', mission: 'Model API test', day: 0 };
    for (const [name, info] of Object.entries(catalog)) {
      if (info.status !== 'TRAINED_PROTOTYPE' || info.section !== sectionNames[type]) continue;
      const values = JSON.parse(await readFile(new URL(`../../models/examples/${name}_input.json`, import.meta.url), 'utf8'));
      for (const [feature, value] of Object.entries(values)) body[keys[feature]] = value;
    }
    const response = await fetch(`${base}/api/${type}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await response.json();
    assert.equal(response.status, 201, JSON.stringify(data));
    assert.equal(data.report.modelResponse.assessment_type, type);
    assert.equal(data.report.modelResponse.status, 'PREDICTED_PROTOTYPE');
    assert.ok(data.report.modelResponse.predictions.length);
    assert.deepEqual(data.report.submittedValues, body);
    assert.ok(data.report._id);
  }
  assert.equal(saves, 5);
  const failure = await fetch(`${base}/api/respiration`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ astronaut_id: 'AST-INTEGRATION', mission: 'Model API test', day: 0, pao2: 90 }) });
  assert.equal(failure.status, 422);
  assert.match((await failure.json()).message, /paco2/);
  assert.equal(saves, 5);
});
