import { useRef, useState } from 'react';
import { ClipboardList, Check, ArrowDown } from 'lucide-react';
import { phq9Options, phq9Questions, scorePhq9 } from '../data/phq9';

export default function Phq9Assessment({ onScore }) {
  const [answers, setAnswers] = useState(Array(9).fill(null));
  const [difficulty, setDifficulty] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const formRef = useRef(null);
  const resultRef = useRef(null);
  const completed = answers.filter(value => value !== null).length;
  function answer(index, value) {
    setAnswers(previous => previous.map((entry, position) => position === index ? value : entry));
    setResult(null); onScore(null); setError('');
  }
  function calculate(event) {
    event.preventDefault();
    try {
      const next = scorePhq9(answers);
      setResult(next); setError(''); onScore(next.score);
      requestAnimationFrame(() => resultRef.current?.focus());
    } catch (failure) {
      setError(failure.message);
      formRef.current?.querySelector(`input[name="phq-${answers.findIndex(value => value === null)}"]`)?.focus();
    }
  }
  function reset() {
    setAnswers(Array(9).fill(null)); setDifficulty(''); setResult(null); setError(''); onScore(null);
    formRef.current?.querySelector('input')?.focus();
  }
  return <section id="phq9" aria-labelledby="phq9-heading" className="space-y-5">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-3"><span className="rounded-xl bg-primary/10 p-3 text-primary"><ClipboardList aria-hidden="true" /></span><div><h2 id="phq9-heading" className="text-2xl font-bold text-navy">Mood check-in · PHQ-9</h2><p className="text-sm text-muted mt-1">9 questions · About the last two weeks</p></div></div>
      <a href="#wellbeing-measurements" className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Skip to measurements <ArrowDown size={16} aria-hidden="true" /></a>
    </div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_17rem] items-start">
      <form noValidate ref={formRef} onSubmit={calculate} className="rounded-3xl border border-line bg-white overflow-hidden">
        <div className="p-5 sm:p-7 border-b border-line bg-surface/40">
          <h3 className="text-lg font-semibold text-navy">Over the last 2 weeks, how often have you been bothered by any of the following problems?</h3>
          <p className="mt-2 text-sm text-muted">Choose one answer for each question. There are no right or wrong answers.</p>
        </div>
        <div className="divide-y divide-line">{phq9Questions.map((question, index) => <fieldset key={question} className="p-5 sm:p-7" data-phq-question={index}>
          <legend className="float-left w-full mb-4 flex gap-3 text-base font-semibold leading-relaxed text-navy"><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${answers[index] !== null ? 'bg-primary text-white' : 'bg-surface text-muted'}`}>{answers[index] !== null ? <Check size={14} aria-label={`Question ${index + 1} answered`} /> : index + 1}</span><span>{question}</span></legend>
          <div className="clear-both grid grid-cols-2 sm:grid-cols-4 gap-2">{phq9Options.map((option, value) => <label key={option} className={`relative cursor-pointer rounded-xl border p-3 text-sm leading-snug transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${answers[index] === value ? 'border-primary bg-primary/5 text-primary' : 'border-line hover:border-primary/50 text-muted'}`}>
            <input type="radio" name={`phq-${index}`} value={value} checked={answers[index] === value} onChange={() => answer(index, value)} className="sr-only" />
            <span className="mb-1 block font-bold text-base">{value}</span>{option}
          </label>)}</div>
        </fieldset>)}</div>
        <fieldset className="border-t border-line p-5 sm:p-7 bg-surface/30">
          <legend className="float-left w-full mb-3 font-semibold text-navy">How difficult have these problems made work, home responsibilities, or getting along with others?</legend>
          <p className="clear-both text-sm text-muted mb-3">Optional context. This does not change your score.</p>
          <div className="grid sm:grid-cols-2 gap-2">{['Not difficult at all', 'Somewhat difficult', 'Very difficult', 'Extremely difficult'].map(option => <label key={option} className="flex gap-3 items-center rounded-lg p-2 text-sm"><input type="radio" name="phq-impact" checked={difficulty === option} onChange={() => setDifficulty(option)} className="accent-primary h-4 w-4" />{option}</label>)}</div>
        </fieldset>
        <div className="p-5 sm:p-7 border-t border-line space-y-4">
          {error && <p role="alert" className="text-red-800 text-sm">{error}</p>}
          {answers[8] > 0 && <div role="alert" className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 leading-relaxed"><strong>Follow-up is important.</strong> Your answer to question 9 needs a direct conversation with your medical officer or a qualified mental-health professional, regardless of the total score. If you feel at immediate risk of acting on these thoughts, seek urgent in-person help or contact local emergency services now.</div>}
          <div className="flex flex-wrap gap-3"><button className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-dark">Calculate my score</button><button type="button" onClick={reset} className="rounded-full border border-line px-5 py-3 text-sm font-semibold text-muted hover:bg-surface">Start again</button></div>
        </div>
      </form>
      <aside className="space-y-4 xl:sticky xl:top-6">
        <div className="rounded-2xl border border-line bg-white p-5">
          <div className="flex justify-between text-sm font-semibold text-navy"><span>Your progress</span><span>{completed} / 9</span></div>
          <progress value={completed} max={9} aria-label="Answered questions" className="mt-3 h-2 w-full accent-primary" />
          <p className="mt-3 text-sm leading-relaxed text-muted">Answer all nine questions to see a score from 0 to 27.</p>
        </div>
        <section ref={resultRef} tabIndex={-1} aria-live="polite" aria-label="PHQ-9 result" className="rounded-2xl border border-line bg-navy p-5 text-white">
          <h3 className="font-semibold">Your screening result</h3>
          {result ? <><p className="text-5xl font-bold mt-4">{result.score}<span className="text-lg text-slate-300 font-normal"> / 27</span></p><p className="font-semibold mt-3">{result.severity} symptom range</p><p className="text-sm mt-3 text-slate-200 leading-relaxed">{result.score >= 10 ? 'Arrange a review with a qualified clinician to discuss your symptoms and next steps.' : 'Discuss symptoms that concern you, persist, or affect your daily life with a qualified clinician.'}</p>{result.needsSafetyFollowUp && <p className="mt-3 text-sm font-semibold text-amber-200">Follow-up on question 9 is needed regardless of this score.</p>}</> : <p className="mt-3 text-sm text-slate-200">Your result will appear here after you calculate your score.</p>}
        </section>
        <div className="text-sm text-muted leading-relaxed space-y-3"><p>This is a screening questionnaire, not a diagnosis or an AI prediction. Individual answers stay on this page and are cleared when you leave. A calculated score can be included in the assessment below.</p><a href="https://www.apa.org/depression-guideline/patient-health-questionnaire.pdf" target="_blank" rel="noreferrer" className="block text-primary underline">Original PHQ-9 questionnaire</a><a href="https://www.hiv.uw.edu/page/mental-health-screening/phq-9" target="_blank" rel="noreferrer" className="block text-primary underline">Scoring reference</a></div>
      </aside>
    </div>
  </section>;
}
