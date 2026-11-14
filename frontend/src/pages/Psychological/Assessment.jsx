import { useState } from 'react';

const PsychologicalAssessment = () => {
  const [isStarted, setIsStarted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [submittedScore, setSubmittedScore] = useState(null);

  const severityRanges = [
    { range: '0–4', label: 'Minimal', color: 'text-[#12805D] bg-green-50 border-green-300' },
    { range: '5–9', label: 'Mild', color: 'text-[#1D4F9C] bg-blue-50 border-blue-300' },
    { range: '10–14', label: 'Moderate', color: 'text-amber-800 bg-amber-50 border-amber-300' },
    { range: '15–19', label: 'Moderately Severe', color: 'text-orange-800 bg-orange-50 border-orange-300' },
    { range: '20–27', label: 'Severe', color: 'text-red-800 bg-red-50 border-red-300' },
  ];

  const phq9Questions = [
    'Little interest or pleasure in doing things',
    'Feeling down, depressed, or hopeless',
    'Trouble falling or staying asleep, or sleeping too much',
    'Feeling tired or having little energy',
    'Poor appetite or overeating',
    'Feeling bad about yourself — or that you are a failure or have let yourself or your family down',
    'Trouble concentrating on things, such as reading or monitoring station telemetry',
    'Moving or speaking so slowly that other crewmates could have noticed — or the opposite, being so fidgety or restless',
    'Thoughts that you would be better off dead, or of hurting yourself in some way',
  ];

  const answerOptions = [
    { value: 0, label: 'Not at all (0)' },
    { value: 1, label: 'Several days (1)' },
    { value: 2, label: 'More than half the days (2)' },
    { value: 3, label: 'Nearly every day (3)' },
  ];

  const handleSelectOption = (qIndex, val) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: val }));
  };

  const handleCalculateScore = (e) => {
    e.preventDefault();
    const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
    setSubmittedScore(total);
  };

  const getSeverity = (score) => {
    if (score <= 4) return severityRanges[0];
    if (score <= 9) return severityRanges[1];
    if (score <= 14) return severityRanges[2];
    if (score <= 19) return severityRanges[3];
    return severityRanges[4];
  };

  const allAnswered = Object.keys(answers).length === phq9Questions.length;

  return (
    <div className="flex flex-col space-y-6">
      {/* Main PHQ-9 Card */}
      <div className="rounded-3xl border border-gray-300 bg-white p-6 md:p-8 shadow-sm space-y-5">
        <h2 className="text-xl md:text-2xl font-bold text-[#0A1B33]">
          PHQ-9 · Patient Health Questionnaire
        </h2>

        {/* Assessment Period Notice Box */}
        <div className="rounded-2xl bg-[#EDF2F9] border border-[#D8E0E7] p-4 text-sm text-[#203040] leading-relaxed">
          <span className="font-bold text-[#0A1B33]">
            Assessment period: the last 2 weeks.
          </span>{' '}
          PHQ-9 is not a daily questionnaire — use the Daily Check-in tab for a quick daily mood and stress record.
        </div>

        {/* Subtitle Metadata */}
        <p className="text-sm text-[#566678]">
          Nine questions · about 2 minutes · results are a screening result, not a diagnosis.
        </p>

        {/* Severity Scale Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          {severityRanges.map((item) => (
            <div
              key={item.range}
              className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-3.5 py-1.5 text-xs font-medium text-[#203040]"
            >
              <span className="font-mono font-bold text-[#0A1B33]">{item.range}</span>
              <span className="text-[#566678]">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Start Button or Active Questionnaire */}
        {!isStarted ? (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setIsStarted(true);
                setSubmittedScore(null);
              }}
              className="bg-[#346E9E] hover:bg-[#285880] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors cursor-pointer shadow-sm"
            >
              Start PHQ-9
            </button>
          </div>
        ) : (
          <form onSubmit={handleCalculateScore} className="pt-4 border-t border-gray-200 space-y-6">
            <p className="text-sm font-bold text-[#0A1B33]">
              Over the last 2 weeks, how often have you been bothered by any of the following problems?
            </p>

            <div className="space-y-4">
              {phq9Questions.map((question, qIndex) => (
                <div
                  key={qIndex}
                  className="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-4 space-y-3"
                >
                  <p className="text-sm font-bold text-[#0A1B33]">
                    {qIndex + 1}. {question}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {answerOptions.map((opt) => {
                      const isSelected = answers[qIndex] === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleSelectOption(qIndex, opt.value)}
                          className={`px-3.5 py-2 rounded-xl border text-xs font-semibold text-left transition-colors cursor-pointer ${isSelected
                              ? 'bg-[#0A1B33] border-[#0A1B33] text-white'
                              : 'bg-white border-gray-300 text-[#203040] hover:bg-gray-50'
                            }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                disabled={!allAnswered}
                className={`font-semibold text-sm px-6 py-3 rounded-full transition-colors ${allAnswered
                    ? 'bg-[#1D4F9C] hover:bg-[#173F7D] text-white cursor-pointer'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                Calculate Screening Score
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsStarted(false);
                  setAnswers({});
                  setSubmittedScore(null);
                }}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold text-sm px-5 py-3 rounded-full transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Screening Result Box */}
        {submittedScore !== null && (
          <div className="rounded-2xl border border-gray-300 bg-[#F8FAFC] p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#566678]">
                PHQ-9 SCREENING RESULT
              </div>
              <div className="text-2xl font-bold text-[#0A1B33] font-mono mt-1">
                Total Score: {submittedScore} / 27
              </div>
            </div>

            <span
              className={`rounded-full border px-4 py-1.5 text-sm font-bold ${getSeverity(submittedScore).color
                }`}
            >
              {getSeverity(submittedScore).range} · {getSeverity(submittedScore).label}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PsychologicalAssessment;