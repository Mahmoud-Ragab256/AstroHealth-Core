import { useEffect, useRef, useState } from 'react';
import { Brain, Lightbulb, Hash, Calculator, Type, Compass, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw, Trophy } from 'lucide-react';
import { puzzles } from '../../data/puzzles';
import { checkPuzzleAnswer, readPuzzleStats } from '../../data/puzzleScoring';

const icons = { logic: Lightbulb, memory: Brain, pattern: Hash, math: Calculator, word: Type, spatial: Compass };

export default function PsychologicalPuzzles() {
  const [active, setActive] = useState(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const [memorizing, setMemorizing] = useState(false);
  const [stats, setStats] = useState(() => {
    try { return readPuzzleStats(localStorage.getItem('astro_puzzles_stats')); } catch { return readPuzzleStats(null); }
  });
  const [storageError, setStorageError] = useState(false);
  const [dailyIndex] = useState(() => new Date().getDay() % puzzles.length);
  const guard = useRef({ answered: false, completed: false });
  const questionRef = useRef(null);
  const selectionRef = useRef(null);
  useEffect(() => { if (active) questionRef.current?.focus(); }, [active, index, finished, memorizing]);

  function start(puzzle) {
    setActive(puzzle); setIndex(0); setAnswer(''); setFeedback(null); setCorrect(0); setFinished(false);
    setMemorizing(puzzle.id === 'memory'); guard.current = { answered: false, completed: false };
  }
  function check() {
    if (!answer.trim() || guard.current.answered || memorizing) return;
    guard.current.answered = true;
    guard.current.advanced = false;
    const isCorrect = checkPuzzleAnswer(active.questions[index], answer);
    setFeedback({ isCorrect });
    if (isCorrect) setCorrect(value => value + 1);
  }
  function next() {
    if (!feedback || guard.current.completed || guard.current.advanced) return;
    guard.current.advanced = true;
    if (index === active.questions.length - 1) {
      guard.current.completed = true;
      const record = { id: Date.now(), title: active.title, correct, total: active.questions.length, points: correct * 10, allCorrect: correct === active.questions.length, time: new Date().toLocaleString() };
      const updated = { ...stats, totalScore: stats.totalScore + record.points, sessionsPlayed: stats.sessionsPlayed + 1, history: [record, ...stats.history].slice(0, 8) };
      setStats(updated);
      try { localStorage.setItem('astro_puzzles_stats', JSON.stringify(updated)); }
      catch { setStorageError(true); }
      setFinished(true);
    } else {
      setIndex(value => value + 1); setAnswer(''); setFeedback(null); setMemorizing(active.id === 'memory'); guard.current.answered = false;
    }
  }
  function leave() {
    setActive(null); setFeedback(null); setFinished(false);
    requestAnimationFrame(() => selectionRef.current?.focus());
  }
  const question = active?.questions[index];
  const split = question?.question.indexOf('. ');
  const displayQuestion = active?.id === 'memory' && split >= 0 ? question.question.slice(split + 2) : question?.question;

  return <div className="space-y-7">
    <div className="rounded-2xl border border-line bg-white px-6 py-5 flex flex-wrap gap-x-10 gap-y-4 items-center">
      <div className="flex items-center gap-3 text-navy"><Trophy size={22} className="text-primary" aria-hidden="true" /><div><p className="text-2xl font-bold">{stats.totalScore}</p><p className="text-xs text-muted">Total points</p></div></div>
      <div><p className="text-2xl font-bold text-navy">{stats.sessionsPlayed}</p><p className="text-xs text-muted">Completed sessions</p></div>
      <p className="text-sm text-muted max-w-sm sm:ml-auto">Practice at your own pace. Puzzle scores are for practice, not a clinical assessment.</p>
    </div>
    {storageError && <p role="status" className="text-sm text-amber-800">Progress is available for this visit, but your browser could not save it.</p>}

    {active ? <section aria-labelledby="puzzle-title" className="rounded-3xl border border-line bg-white overflow-hidden">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line p-5 sm:p-7 bg-surface/40">
        <div><p className="text-sm text-muted mb-1">{finished ? 'Session complete' : `Question ${index + 1} of ${active.questions.length}`}</p><h2 id="puzzle-title" className="text-xl font-bold text-navy">{active.title}</h2></div>
        <button onClick={leave} className="inline-flex items-center gap-2 text-sm font-semibold text-primary"><ArrowLeft size={16} aria-hidden="true" />{finished ? 'All puzzles' : 'Exit session'}</button>
      </header>
      <progress className="block h-1.5 w-full accent-primary" value={finished ? active.questions.length : index + (feedback ? 1 : 0)} max={active.questions.length} aria-label="Puzzle progress" />
      <div className="p-5 sm:p-8 max-w-3xl mx-auto">
        {finished ? <div className="py-6 text-center space-y-5">
          <CheckCircle2 size={44} className="mx-auto text-health" aria-hidden="true" />
          <h3 ref={questionRef} tabIndex={-1} className="text-3xl font-bold text-navy">Session complete</h3>
          <p className="text-5xl font-bold text-primary">{correct}<span className="text-xl text-muted"> / {active.questions.length}</span></p>
          <p className="text-muted">Correct answers · {correct * 10} points earned</p>
          <div className="flex flex-wrap justify-center gap-3"><button onClick={() => start(active)} className="rounded-full bg-primary px-6 py-3 text-white font-semibold inline-flex items-center gap-2"><RotateCcw size={16} aria-hidden="true" />Play again</button><button onClick={leave} className="rounded-full border border-line px-6 py-3 font-semibold">Choose another puzzle</button></div>
        </div> : memorizing ? <div className="space-y-6 py-4">
          <h3 ref={questionRef} tabIndex={-1} className="text-xl font-bold text-navy">Take a moment to remember this sequence</h3>
          <p className="rounded-2xl bg-surface p-6 text-xl font-semibold leading-relaxed text-navy">{question.question.slice(0, split)}</p>
          <p className="text-sm text-muted">The sequence will be hidden when you continue.</p>
          <button onClick={() => setMemorizing(false)} className="rounded-full bg-primary px-6 py-3 text-white font-semibold">I'm ready</button>
        </div> : <div className="space-y-6">
          <h3 ref={questionRef} tabIndex={-1} className="text-xl sm:text-2xl font-bold text-navy leading-relaxed">{displayQuestion}</h3>
          {active.id === 'word' ? <div><label htmlFor="puzzle-answer" className="block text-sm font-semibold mb-2">Your answer</label><input id="puzzle-answer" autoComplete="off" value={answer} disabled={Boolean(feedback)} onChange={event => setAnswer(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); check(); } }} className="w-full rounded-xl border border-line p-4 text-lg focus:outline-primary" placeholder="Type the unscrambled word" /></div> : <fieldset disabled={Boolean(feedback)} className="space-y-3"><legend className="sr-only">Choose your answer</legend>{question.options.map((option, position) => <label key={option} className={`flex gap-3 cursor-pointer items-center rounded-xl border p-4 focus-within:ring-2 focus-within:ring-primary ${answer === option ? 'border-primary bg-primary/5 text-primary' : 'border-line text-ink hover:bg-surface/40'}`}><input type="radio" name="puzzle-option" value={option} checked={answer === option} onChange={() => setAnswer(option)} className="sr-only" /><span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-line bg-white text-sm font-bold">{String.fromCharCode(65 + position)}</span><span className="font-medium">{option}</span></label>)}</fieldset>}
          {feedback && <div role="status" className={`rounded-xl border p-4 ${feedback.isCorrect ? 'border-emerald-200 bg-emerald-50 text-health' : 'border-amber-200 bg-amber-50 text-amber-950'}`}><p className="font-bold">{feedback.isCorrect ? 'Correct · 10 points earned' : 'Not quite — keep going'}</p>{!feedback.isCorrect && <p className="mt-1 text-sm">Answer: {question.answerDisplay || question.answer}</p>}</div>}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5"><p className="text-sm text-muted">{correct * 10} points this session</p>{feedback ? <button onClick={next} className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-white font-semibold">{index === active.questions.length - 1 ? 'View results' : 'Next question'}<ArrowRight size={16} aria-hidden="true" /></button> : <button onClick={check} disabled={!answer.trim()} className="rounded-full bg-primary px-6 py-3 text-white font-semibold disabled:opacity-40">Check answer</button>}</div>
        </div>}
      </div>
    </section> : <>
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-navy p-6 text-white"><div><p className="text-sm text-slate-300">Today's practice</p><h2 className="text-xl font-bold mt-1">{puzzles[dailyIndex].title}</h2><p className="text-sm text-slate-300 mt-2">Five questions. One focused break.</p></div><button onClick={() => start(puzzles[dailyIndex])} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-navy">Start practice<ArrowRight size={16} aria-hidden="true" /></button></section>
      <section className="space-y-4"><h2 ref={selectionRef} tabIndex={-1} className="text-2xl font-bold text-navy">Choose your challenge</h2><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{puzzles.map(puzzle => {
        const Icon = icons[puzzle.id];
        return <article key={puzzle.id} className="flex flex-col rounded-2xl border border-line bg-white p-6"><span className="mb-4 w-fit rounded-xl bg-surface p-3 text-primary"><Icon size={24} aria-hidden="true" /></span><h3 className="text-lg font-bold text-navy">{puzzle.title}</h3><p className="mt-2 text-sm text-muted leading-relaxed flex-1">{puzzle.description}</p><div className="mt-6 flex items-center justify-between gap-3"><span className="text-xs text-muted">5 questions · 10 points each</span><button aria-label={`Play ${puzzle.title}`} onClick={() => start(puzzle)} className="rounded-full border border-line px-4 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white">Play</button></div></article>;
      })}</div></section>
    </>}
    <section className="rounded-2xl border border-line bg-white p-6"><h2 className="text-lg font-bold text-navy">Recent sessions</h2>{!stats.history.length ? <p className="mt-3 text-sm text-muted">Your completed sessions will appear here.</p> : <ul className="mt-4 divide-y divide-line">{stats.history.map((entry, position) => <li key={`${entry.id}-${position}`} className="flex flex-wrap justify-between items-center gap-3 py-4"><div><p className="font-semibold text-ink">{entry.title}</p><p className="text-xs text-muted mt-1">{entry.time}</p></div><p className="text-sm text-primary font-semibold">{entry.correct}/{entry.total} correct · {entry.points} points</p></li>)}</ul>}</section>
  </div>;
}
