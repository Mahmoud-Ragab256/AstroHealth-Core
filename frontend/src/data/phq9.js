// Public-domain PHQ-9: https://www.apa.org/depression-guideline/patient-health-questionnaire.pdf
// Scoring: https://www.hiv.uw.edu/page/mental-health-screening/phq-9
export const phq9Questions = [
  'Little interest or pleasure in doing things',
  'Feeling down, depressed, or hopeless',
  'Trouble falling or staying asleep, or sleeping too much',
  'Feeling tired or having little energy',
  'Poor appetite or overeating',
  'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
  'Trouble concentrating on things, such as reading the newspaper or watching television',
  'Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual',
  'Thoughts that you would be better off dead or of hurting yourself in some way'
];

export const phq9Options = ['Not at all', 'Several days', 'More than half the days', 'Nearly every day'];

export function scorePhq9(answers) {
  if (!Array.isArray(answers) || answers.length !== 9 || Array.from(answers).some(value => !Number.isInteger(value) || value < 0 || value > 3)) {
    throw new Error('Answer all nine questions before calculating your score.');
  }
  const score = answers.reduce((total, value) => total + value, 0);
  const severity = score < 5 ? 'Minimal' : score < 10 ? 'Mild' : score < 15 ? 'Moderate' : score < 20 ? 'Moderately severe' : 'Severe';
  return { score, severity, needsSafetyFollowUp: answers[8] > 0 };
}
