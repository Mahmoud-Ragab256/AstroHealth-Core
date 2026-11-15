// Run with Vite on 127.0.0.1:5173. Uses installed Chrome/Edge and mocked API data.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import assert from 'node:assert/strict';
import { assessmentFields } from '../../shared/assessmentFields.js';

const browserPath = process.env.BROWSER_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
].find(existsSync);
if (!browserPath) throw new Error('Set BROWSER_PATH to a Chromium browser.');
const profile = mkdtempSync(join(tmpdir(), 'astrohealth-browser-'));
const browser = spawn(browserPath, ['--headless=new', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=9223', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: 'ignore' });
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
let socket;
try {
  let tabs;
  for (let i = 0; i < 80; i++) {
    try { tabs = await (await fetch('http://127.0.0.1:9223/json')).json(); break; } catch { await pause(100); }
  }
  if (!tabs) throw new Error('Browser did not start.');
  socket = new WebSocket(tabs.find(tab => tab.type === 'page').webSocketDebuggerUrl);
  await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }));
  let sequence = 0;
  const pending = new Map();
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error(`CDP timeout: ${method}`)), 10000);
      const id = ++sequence; pending.set(id, { resolve: value => { clearTimeout(timer); resolve(value); }, reject: error => { clearTimeout(timer); reject(error); } });
      socket.send(JSON.stringify({ id, method, params }));
    });
  }
  let saved;
  let fail = false;
  let calls = 0;
  let eventError;
  socket.addEventListener('message', async event => {
    const message = JSON.parse(event.data);
    if (message.method === 'Runtime.exceptionThrown') eventError = new Error(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text);
    if (message.id) {
      const request = pending.get(message.id); pending.delete(message.id);
      if (message.error) request?.reject(new Error(message.error.message)); else request?.resolve(message.result);
    }
    if (message.method === 'Fetch.requestPaused') {
      try {
        const { requestId, request } = message.params;
        let code = 200;
        let payload;
        if (request.method === 'POST') {
          calls++;
          const type = new URL(request.url).pathname.split('/').at(-1);
          const body = JSON.parse(request.postData);
          assert.deepEqual(Object.keys(body).sort(), ['astronaut_id', 'mission', 'day', ...assessmentFields[type].filter(f => f.key !== 'phq_9').map(f => f.key)].sort());
          for (const field of assessmentFields[type].filter(f => f.key !== 'phq_9')) assert.equal(typeof body[field.key], field.key === 'radiation_type' ? 'string' : 'number');
          await pause(250);
          if (fail) { code = 502; payload = { message: 'Model unavailable for browser test' }; }
          else {
            saved = { _id: '012345678901234567890123', assessment: { name: `${type} assessment`, type, date: new Date().toISOString() }, astronaut: { id: body.astronaut_id, mission: body.mission, day: body.day }, inputMeasurements: assessmentFields[type].map(f => ({ key: f.key, measurement: f.name, unit: f.unit, value: body[f.key] })), modelResponse: { summary: 'Browser test result', score: 0 } };
            code = 201; payload = { report: saved };
          }
        } else payload = new URL(request.url).pathname.endsWith('/reports') ? { reports: new URL(request.url).searchParams.get('astronaut_id') === 'EMPTY' ? [] : saved ? [saved] : [] } : { report: saved };
        await send('Fetch.fulfillRequest', { requestId, responseCode: code, responseHeaders: [{ name: 'Content-Type', value: 'application/json' }], body: Buffer.from(JSON.stringify(payload)).toString('base64') });
      } catch (error) { if (!error.message.includes('Invalid InterceptionId')) eventError = error; }
    }
  });
  await send('Page.enable');
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `if (location.origin === 'http://127.0.0.1:5173' && !localStorage.getItem('astronautData')) localStorage.setItem('astronautData', JSON.stringify({astronaut:'Browser astronaut', id:'AST-BROWSER',mission:'Browser mission',day:0,weight:'70kg'}));` });
  await send('Runtime.enable');
  await send('Fetch.enable', { patterns: [{ urlPattern: 'http://127.0.0.1:5173/api/*' }] });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
    return result.result.value;
  };
  async function until(expression) {
    for (let i = 0; i < 100; i++) {
      if (eventError) throw eventError;
      if (await evaluate(expression)) return;
      await pause(100);
    }
    throw new Error(`Timed out: ${expression}\n${await evaluate('document.body.innerText')}`);
  }
  async function navigate(path) {
    await send('Page.navigate', { url: `http://127.0.0.1:5173${path}` });
    await until('!!document.querySelector("form[data-assessment]")');
  }
  async function fill() {
    await evaluate(`(() => {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
      document.querySelectorAll('form[data-assessment] input').forEach(input => {
        const values = { astronaut_id: 'AST-BROWSER', mission: 'Browser mission', day: '0', radiation_type: 'Gamma', bmd_t_score: '-2.5' };
        setter.call(input, values[input.name] ?? '0.25'); input.dispatchEvent(new Event('input', { bubbles: true }));
      });
    })()`);
  }
  const routes = { radiation: '/radiation-test', psychological: '/psychological/assessment', gravity: '/gravity/assessment', nutrition: '/nutrition/assessment', respiration: '/nutrition/respiration' };
  for (const [type, path] of Object.entries(routes)) {
    await navigate(path);
    assert.equal(await evaluate('document.querySelectorAll("form[data-assessment] input").length'), assessmentFields[type].filter(f => f.key !== 'phq_9').length);
    assert.equal(await evaluate('[...document.querySelectorAll("form[data-assessment] input")].every(input => !!document.querySelector(`label[for="${input.id}"]`))'), true);
    await fill();
    await evaluate('document.querySelector("form[data-assessment]").requestSubmit()');
    await until('document.body.innerText.includes("Browser test result")');
    console.log(`PASS ${type}: exact fields, labels, numeric payload, saved report`);
  }
  await send('Page.reload');
  await until('document.body.innerText.includes("Browser test result")');
  console.log('PASS report refresh');
  await navigate(routes.gravity);
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await fill();
  fail = true;
  const before = calls;
  await evaluate('document.querySelector("form[data-assessment]").requestSubmit(); document.querySelector("form[data-assessment]").requestSubmit()');
  await until('document.body.innerText.includes("Model unavailable for browser test")');
  assert.equal(calls, before + 1);
  assert.equal(await evaluate('document.querySelector("input[name=bmd_t_score]").value'), '-2.5');
  assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'), true);
  assert.equal(await evaluate('document.querySelector("form[data-assessment]").getBoundingClientRect().width >= 300'), true);
  const screenshot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  writeFileSync(join(profile, 'assessment-mobile.png'), Buffer.from(screenshot.data, 'base64'));
  console.log(`PASS mobile, failure recovery, duplicate prevention; screenshot: ${join(profile, 'assessment-mobile.png')}`);
  fail = false;
  await evaluate('document.querySelector("form[data-assessment]").requestSubmit()');
  await until('document.body.innerText.includes("Browser test result")');
  console.log('PASS retry');
  await send('Page.navigate', { url: 'http://127.0.0.1:5173/reports' });
  await until('document.body.innerText.includes("Browser mission")');
  console.log('PASS automatic report history');
  await send('Page.navigate', {url:'http://127.0.0.1:5173/profile'});
  await until('!!document.querySelector("input[name=mission]")');
  await evaluate(`(() => { const input = document.querySelector('input[name=mission]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(input,'Saved mission'); input.dispatchEvent(new Event('input',{bubbles:true})); })()`);
  await evaluate('document.querySelector("form").requestSubmit()');
  await until('document.body.innerText.includes("Mission settings saved")');
  assert.equal(await evaluate('JSON.parse(localStorage.astronautData).weight'), '70kg');
  await navigate(routes.psychological);
  await evaluate('document.querySelector("#phq9 form").requestSubmit()');
  assert.equal(await evaluate('document.body.innerText.includes("Minimal symptom range")'),false);
  await evaluate(`document.querySelectorAll('#phq9 input[value="0"]').forEach(input => input.click())`);
  await evaluate('document.querySelector("#phq9 form").requestSubmit()');
  await until('document.body.innerText.includes("Minimal symptom range")');
  await evaluate(`document.querySelector('input[name="phq-8"][value="1"]').click()`);
  await until('document.body.innerText.includes("Follow-up is important")');
  await evaluate('document.querySelector("#phq9 form").requestSubmit()');
  await until('document.body.innerText.includes("Follow-up on question 9")');
  console.log('PASS saved profile, full PHQ-9, incomplete guard and question 9 follow-up');
  await send('Page.navigate',{url:'http://127.0.0.1:5173/psychological/puzzles'});
  await until('document.body.innerText.includes("Choose your challenge")');
  await evaluate(`document.querySelector('button[aria-label="Play Logic Puzzles"]').click()`);
  for (const answer of ['Module C','Omar','No','2','Danger']) {
    await until('!!document.querySelector("input[name=puzzle-option]")');
    await evaluate(`Array.from(document.querySelectorAll('input[name=puzzle-option]')).find(input => input.value === ${JSON.stringify(answer)}).click()`);
    await evaluate(`Array.from(document.querySelectorAll('button')).find(button => button.textContent === 'Check answer').click()`);
    await until('document.body.innerText.includes("10 points earned")');
    await evaluate(`Array.from(document.querySelectorAll('button')).find(button => /^(Next question|View results)/.test(button.textContent)).click()`);
  }
  await until('document.body.innerText.includes("50 points earned")');
  assert.equal(await evaluate('JSON.parse(localStorage.astro_puzzles_stats).sessionsPlayed'),1);
  assert.equal(await evaluate('document.documentElement.scrollWidth <= innerWidth'),true);
  const puzzlesShot = await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
  writeFileSync(join(profile,'puzzles-mobile.png'),Buffer.from(puzzlesShot.data,'base64'));
  console.log('PASS puzzle scoring, persisted session and mobile layout');
  await send('Browser.close');
} finally {
  socket?.close();
  browser.kill();
}
