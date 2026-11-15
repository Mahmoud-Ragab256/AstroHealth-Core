import test from 'node:test';
import assert from 'node:assert/strict';
import { buildAssessmentPayload, submitAssessment } from '../src/api/assessments.js';
import { assessmentFields } from '../../shared/assessmentFields.js';

for (const [type, fields] of Object.entries(assessmentFields)) {
  test(`${type} sends exactly the backend keys as numbers`, () => {
    const values = { astronaut_id: ' AST-1 ', mission: ' Test ', day: '0', ignored: 'extra' };
    for (const field of fields) values[field.key] = field.key === 'radiation_type' ? 'Gamma' : '0.25';
    const payload = buildAssessmentPayload(type, values);
    assert.deepEqual(Object.keys(payload).sort(), ['astronaut_id', 'mission', 'day', ...fields.map(f => f.key)].sort());
    assert.equal(payload.astronaut_id, 'AST-1');
    assert.equal(payload.day, 0);
    for (const field of fields) assert.equal(typeof payload[field.key], field.key === 'radiation_type' ? 'string' : 'number');
  });
}

test('omits blank values and preserves zero and negative measurements', () => {
  const payload = buildAssessmentPayload('gravity', { astronaut_id: 'A', mission: 'M', day: '1', bmd_t_score: '-2.5', muscle_loss: '0', calcium: '', vitamin_d: ' ' });
  assert.equal(payload.bmd_t_score, -2.5);
  assert.equal(payload.muscle_loss, 0);
  assert.equal('calcium' in payload, false);
  assert.equal('vitamin_d' in payload, false);
});

test('rejects missing identity, day and empty assessments', () => {
  for (const data of [{}, { astronaut_id: 'A', mission: 'M', day: '' }, { astronaut_id: 'A', mission: 'M', day: '0' }]) {
    assert.throws(() => buildAssessmentPayload('respiration', data));
  }
});

test('submit uses same-origin API and returns the saved report', async t => {
  const report = { _id: '012345678901234567890123', modelResponse: { risk: 0 } };
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, '/api/respiration');
    assert.deepEqual(JSON.parse(options.body), { astronaut_id: 'A', mission: 'M', day: 0, pao2: 80 });
    return { ok: true, json: async () => ({ report }) };
  });
  assert.deepEqual(await submitAssessment('respiration', { astronaut_id: 'A', mission: 'M', day: '0', pao2: '80' }), report);
});

test('model errors remain visible to the form', async t => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: false, json: async () => ({ message: 'Model service timed out' }) }));
  await assert.rejects(submitAssessment('respiration', { astronaut_id: 'A', mission: 'M', day: '0', pao2: '80' }), /timed out/);
});
