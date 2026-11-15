import test from 'node:test';
import assert from 'node:assert/strict';
import { scorePhq9, phq9Questions } from '../src/data/phq9.js';
import { completeDemoProfile, parseAstronautProfile, profileIsReady } from '../src/data/astronautProfile.js';
import { checkPuzzleAnswer, readPuzzleStats } from '../src/data/puzzleScoring.js';
import { puzzles } from '../src/data/puzzles.js';

for (const [score, severity] of [[0, 'Minimal'], [4, 'Minimal'], [5, 'Mild'], [9, 'Mild'], [10, 'Moderate'], [14, 'Moderate'], [15, 'Moderately severe'], [19, 'Moderately severe'], [20, 'Severe'], [27, 'Severe']]) {
  test(`PHQ-9 boundary ${score}: ${severity}`, () => {
    let remaining = score;
    const answers = Array.from({ length: 9 }, () => { const value = Math.min(3, remaining); remaining -= value; return value; });
    assert.equal(scorePhq9(answers).score, score);
    assert.equal(scorePhq9(answers).severity, severity);
  });
}
test('PHQ-9 requires all nine valid responses, including zero', () => {
  assert.equal(phq9Questions.length, 9);
  for (const invalid of [[], Array(9), Array(9).fill(null), Array(9).fill('0'), Array(9).fill(4), Array(9).fill(-1), Array(9).fill(1.5)]) assert.throws(() => scorePhq9(invalid));
  assert.equal(scorePhq9(Array(9).fill(0)).score, 0);
});
test('question 9 requires follow-up even with a low total', () => {
  const result = scorePhq9([0, 0, 0, 0, 0, 0, 0, 0, 1]);
  assert.equal(result.severity, 'Minimal');
  assert.equal(result.needsSafetyFollowUp, true);
});
test('profile handles existing field names and preserves other metadata', () => {
  const profile = parseAstronautProfile(JSON.stringify({ astronaut: 'A', id: ' AST-1 ', mission: ' Test ', day: '0', weight: '70kg', sex: 'male' }));
  assert.equal(profile.id, 'AST-1');
  assert.equal(profile.day, 0);
  assert.equal(profile.weight, '70kg');
  assert.equal(profileIsReady(profile), true);
});
test('missing or malformed profile does not invent identity or mission', () => {
  for (const raw of [null, 'invalid', '[]', '{}', '{"day":true}', '{"id":"A"}']) assert.equal(profileIsReady(parseAstronautProfile(raw)), false);
});
test('all puzzle answers are scoreable and word answers ignore case and spaces', () => {
  for (const puzzle of puzzles) {
    assert.equal(puzzle.questions.length, 5);
    for (const question of puzzle.questions) assert.equal(checkPuzzleAnswer(question, question.answer || question.answers[0]), true);
  }
  assert.equal(checkPuzzleAnswer(puzzles.find(p => p.id === 'word').questions[0], ' O R B I T '), true);
  assert.equal(checkPuzzleAnswer(puzzles[0].questions[0], 'wrong'), false);
});
test('corrupt puzzle history recovers safely', () => {
  assert.equal(readPuzzleStats('invalid').sessionsPlayed, 0);
  assert.deepEqual(readPuzzleStats('{"totalScore":10,"sessionsPlayed":1,"history":[null]}').history, []);
});

test('demo setup fills missing metadata and preserves existing identity and zero day', () => {
  const existing = { astronaut: 'Mahmoud', id: 'AST-1', weight: '70kg', day: 0 };
  const result = completeDemoProfile(existing, () => { throw new Error('Must preserve ID'); });
  assert.equal(result.mission, 'AstroHealth Demo Mission');
  assert.equal(result.day, 0);
  assert.equal(result.weight, '70kg');
  assert.equal(result.id, 'AST-1');
  assert.deepEqual(completeDemoProfile(result), result);
  assert.equal(profileIsReady(completeDemoProfile({}, () => 'DEMO-unique')), true);
});
