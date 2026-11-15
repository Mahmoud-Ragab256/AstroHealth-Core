import test from 'node:test';
import assert from 'node:assert/strict';
import Report from '../src/mongo/models/Report.js';
import Measurement from '../src/mongo/models/Measurement.js';
import * as endpoints from '../src/endpoints.js';
import { gravityFields, respirationFields, nutritionFields } from '../src/assessmentFields.js';

const identity = { astronaut_id: 'AST-001', mission: 'Test mission', day: 0 };
async function invoke(handler, body) {
  const res = {
    status(code) { this.code = code; return this; },
    json(payload) { this.payload = payload; return this; }
  };
  await handler({ body, params: { astronautId: identity.astronaut_id } }, res);
  return res;
}

const cases = [
  ['gravity', Object.fromEntries(gravityFields.map(f => [f.key, -1]))],
  ['respiration', Object.fromEntries(respirationFields.map(f => [f.key, 1]))],
  ['nutrition', Object.fromEntries(nutritionFields.map(f => [f.key, 1]))],
  ['psychological', { sleep_duration: 8, awakenings: 0 }],
  ['radiation', { absorbed_dose: 0, radiation_type: 'gamma' }]
];

for (const [type, values] of cases) {
  test(`${type}: forwards to matching path and returns the saved report`, async t => {
    const body = { ...identity, ...values };
    const result = { diagnosis: { text: 'Model result' }, extra: { scores: [0, 1], details: {} } };
    const order = [];
    t.mock.method(globalThis, 'fetch', async (url, options) => {
      assert.equal(new URL(url).pathname, `/api/${type}`);
      assert.equal(options.method, 'POST');
      assert.deepEqual(JSON.parse(options.body), body);
      order.push('model');
      return { ok: true, json: async () => result };
    });
    t.mock.method(Report, 'create', async doc => {
      order.push('save');
      const report = new Report(doc);
      await report.validate();
      assert.deepEqual(report.modelResponse, result);
      assert.deepEqual(report.submittedValues, body);
      assert.equal(report.inputMeasurements.length, Object.keys(values).length);
      return report;
    });
    const res = await invoke(endpoints[type], body);
    assert.equal(res.code, 201);
    assert.ok(res.payload.report._id);
    assert.deepEqual(res.payload.report.modelResponse, result);
    assert.deepEqual(order, ['model', 'save']);
  });
}

test('rejects invalid requests before model or storage calls', async t => {
  const fetchMock = t.mock.method(globalThis, 'fetch', async () => { throw new Error('Unexpected call'); });
  const saveMock = t.mock.method(Report, 'create', async () => { throw new Error('Unexpected call'); });
  for (const body of [undefined, [], {}, { ...identity }, { ...identity, day: -1, pao2: 80 },
    { ...identity, mission: '', pao2: 80 }, { ...identity, pao2: null }, { ...identity, pao2: '80' }]) {
    assert.equal((await invoke(endpoints.respiration, body)).code, 400);
  }
  assert.equal(fetchMock.mock.callCount(), 0);
  assert.equal(saveMock.mock.callCount(), 0);
});

test('upstream failures never save a report', async t => {
  const saveMock = t.mock.method(Report, 'create', async () => { throw new Error('Unexpected save'); });
  const responses = [
    async () => ({ ok: false }),
    async () => { throw new Error('Connection refused'); },
    async () => ({ ok: true, json: async () => { throw new SyntaxError('Invalid JSON'); } }),
    ...[null, [], {}, 'invalid'].map(value => async () => ({ ok: true, json: async () => value }))
  ];
  const fetchMock = t.mock.method(globalThis, 'fetch', responses[0]);
  for (const implementation of responses) {
    fetchMock.mock.mockImplementation(implementation);
    assert.equal((await invoke(endpoints.respiration, { ...identity, pao2: 80 })).code, 502);
  }
  fetchMock.mock.mockImplementation(async () => { throw new DOMException('Timeout', 'TimeoutError'); });
  assert.equal((await invoke(endpoints.respiration, { ...identity, pao2: 80 })).code, 504);
  assert.equal(saveMock.mock.callCount(), 0);
});

test('database failure does not return a successful report', async t => {
  t.mock.method(globalThis, 'fetch', async () => ({ ok: true, json: async () => ({ result: 'ok' }) }));
  t.mock.method(Report, 'create', async () => { throw new Error('Database unavailable'); });
  const res = await invoke(endpoints.respiration, { ...identity, pao2: 80 });
  assert.equal(res.code, 500);
  assert.equal(res.payload.report, undefined);
});

test('legacy reports still require their interpreted fields', async () => {
  const report = new Report({
    assessment: { name: 'Legacy', type: 'Routine', date: new Date() },
    astronaut: { id: 'AST-001', mission: 'Test', day: 1 }
  });
  await assert.rejects(report.validate(), /diagnosis/);
  report.diagnosis = 'Legacy diagnosis';
  report.prediction = 'Legacy prediction';
  report.recommendation = 'Legacy recommendation';
  await report.validate();
});

test('analytics combines legacy and report measurements chronologically', async t => {
  t.mock.method(Measurement, 'find', query => {
    assert.deepEqual(query, { astronaut_id: identity.astronaut_id });
    return { sort: () => ({ lean: async () => [{ measurement: 'Sleep Duration', value: 7, createdAt: new Date('2026-01-01') }] }) };
  });
  t.mock.method(Report, 'find', query => {
    assert.equal(query['astronaut.id'], identity.astronaut_id);
    return { select: () => ({ lean: async () => [{ _id: 'r1', createdAt: new Date('2026-01-02'), inputMeasurements: [
      { key: 'sleep_duration', measurement: 'Sleep Duration', value: 8 },
      { key: 'absorbed_dose', measurement: 'Absorbed Dose', value: 0 },
      { key: 'bmd_t_score', measurement: 'BMD T-score', value: -1 }
    ] }] }) };
  });
  const res = await invoke(endpoints.analytics);
  assert.equal(res.code, 200);
  assert.deepEqual(res.payload.sleepDuration.map(m => m.value), [7, 8]);
  assert.equal(res.payload.radiationExposure.length, 1);
  assert.equal(res.payload.boneDensity.length, 1);
});
