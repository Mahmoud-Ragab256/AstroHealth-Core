import { assessmentFields } from '../../../shared/assessmentFields.js';

export function buildAssessmentPayload(type, values) {
  const fields = assessmentFields[type];
  if (!fields) throw new Error('Unknown assessment type.');
  const astronaut_id = values.astronaut_id?.trim();
  const mission = values.mission?.trim();
  if (!astronaut_id || !mission) throw new Error('Enter the astronaut ID and mission.');
  const day = Number(values.day);
  if (values.day === '' || values.day == null || !Number.isInteger(day) || day < 0) {
    throw new Error('Enter a mission day of zero or greater.');
  }
  const payload = { astronaut_id, mission, day };
  let count = 0;
  for (const field of fields) {
    const raw = values[field.key];
    if (raw == null || String(raw).trim() === '') continue;
    const value = field.key === 'radiation_type' ? String(raw).trim() : Number(raw);
    if (typeof value === 'number' && !Number.isFinite(value)) {
      throw new Error(`Enter a number for ${field.name}.`);
    }
    payload[field.key] = value;
    count++;
  }
  if (!count) throw new Error('Enter at least one measurement.');
  return payload;
}

export async function requestApi(path, options = {}) {
  const response = await fetch(`/api${path}`, options);
  let data;
  try { data = await response.json(); } catch { throw new Error('The server returned an unreadable response. Please try again.'); }
  if (!response.ok) throw new Error(data.message || 'The request failed. Please try again.');
  return data;
}

export async function submitAssessment(type, values, signal) {
  const data = await requestApi(`/${type}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(buildAssessmentPayload(type, values)), signal
  });
  if (!data.report?._id) throw new Error('The server did not return a saved report.');
  return data.report;
}
