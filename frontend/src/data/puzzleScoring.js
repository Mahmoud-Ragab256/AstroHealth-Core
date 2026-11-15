export function normalizeAnswer(value) {
  return String(value).toLowerCase().trim().replace(/[\s.,!?°()+-]/g, '');
}
export function checkPuzzleAnswer(question, answer) {
  const expected = question.answers || [question.answer];
  return expected.some(value => normalizeAnswer(value) === normalizeAnswer(answer));
}
export function readPuzzleStats(raw) {
  const empty = { totalScore: 0, sessionsPlayed: 0, history: [] };
  try {
    const data = JSON.parse(raw);
    if (!data || !Number.isFinite(data.totalScore) || !Number.isInteger(data.sessionsPlayed) || !Array.isArray(data.history)) return empty;
    return { ...data, history: data.history.filter(item => item && typeof item.title === 'string' && Number.isFinite(item.correct) && Number.isFinite(item.total)).slice(0, 8) };
  } catch { return empty; }
}
