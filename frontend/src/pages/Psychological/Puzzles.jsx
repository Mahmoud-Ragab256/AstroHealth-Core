
import { useEffect, useState } from 'react';

const createInitialStats = () => ({
  totalScore: 0,
  sessionsPlayed: 0,
  playedTypes: [],
  completedDaily: false,
  completedHard: false,
  history: [],
});

const puzzles = [
  // 1. LOGIC PUZZLES
  {
    id: 'logic',
    icon: '💡',
    title: 'Logic Puzzles',
    description: 'Deduce the correct conclusion.',
    questions: [
      {
        question: 'If Module A has higher pressure than Module B, and Module C has lower pressure than Module B, which module has the lowest pressure?',
        options: ['Module A', 'Module B', 'Module C'],
        answer: 'Module C',
      },
      {
        question: 'Three astronauts are standing in a line. Ali is before Sara, and Sara is before Omar. Who is standing last?',
        options: ['Ali', 'Sara', 'Omar'],
        answer: 'Omar',
      },
      {
        question: 'All oxygen tanks are equipment. Some equipment is damaged. Can we conclude that all oxygen tanks are damaged?',
        options: ['Yes', 'No', 'Not enough information'],
        answer: 'No',
      },
      {
        question: 'A spaceship has 4 engines. Two engines stop working. How many engines are still working?',
        options: ['1', '2', '3'],
        answer: '2',
      },
      {
        question: 'Every red warning light indicates danger. The warning light is red. What does it indicate?',
        options: ['Safety', 'Danger', 'Normal operation'],
        answer: 'Danger',
      },
    ],
  },

  // 2. MEMORY GAMES
  {
    id: 'memory',
    icon: '🧠',
    title: 'Memory Games',
    description: 'Remember details and sequences.',
    questions: [
      {
        question: 'Telemetry sequence: O2 — 98 — kPa — 101. What was the 3rd item in the sequence?',
        options: ['98', 'kPa', '101'],
        answer: 'kPa',
      },
      {
        question: 'Remember this sequence: 12 — 25 — 38 — 44. What was the 2nd number?',
        options: ['12', '25', '38'],
        answer: '25',
      },
      {
        question: 'A crew checklist contains: Helmet — Oxygen — Gloves — Radio. What was the last item?',
        options: ['Helmet', 'Gloves', 'Radio'],
        answer: 'Radio',
      },
      {
        question: 'Remember these numbers: 7 — 14 — 21 — 28 — 35. What was the 4th number?',
        options: ['21', '28', '35'],
        answer: '28',
      },
      {
        question: 'The mission colors are Blue — Red — Green — Yellow. What was the first color?',
        options: ['Red', 'Blue', 'Yellow'],
        answer: 'Blue',
      },
    ],
  },

  // 3. PATTERN RECOGNITION
  {
    id: 'pattern',
    icon: '🔢',
    title: 'Pattern Recognition',
    description: 'Find the next number.',
    questions: [
      {
        question: 'Find the next number in the orbital pulse sequence: 2, 6, 12, 20, 30, ?',
        options: ['38', '40', '42'],
        answer: '42',
      },
      {
        question: 'Complete the sequence: 3, 6, 9, 12, ?',
        options: ['14', '15', '18'],
        answer: '15',
      },
      {
        question: 'Find the missing number: 1, 4, 9, 16, 25, ?',
        options: ['30', '35', '36'],
        answer: '36',
      },
      {
        question: 'Complete the sequence: 100, 90, 80, 70, ?',
        options: ['50', '60', '65'],
        answer: '60',
      },
      {
        question: 'Find the next number: 2, 4, 8, 16, 32, ?',
        options: ['48', '64', '72'],
        answer: '64',
      },
    ],
  },

  // 4. MATHEMATICAL CHALLENGES
  {
    id: 'math',
    icon: '➗',
    title: 'Mathematical Challenges',
    description: 'Solve quick mental calculations.',
    questions: [
      {
        question: 'Cabin oxygen reserve is 480 L. If crew consumption is 35 L/hour, how much remains after 6 hours?',
        options: ['270 L', '290 L', '310 L'],
        answer: '270 L',
      },
      {
        question: 'A spaceship travels 120 km in 2 hours. What is its average speed?',
        options: ['40 km/h', '60 km/h', '80 km/h'],
        answer: '60 km/h',
      },
      {
        question: 'An astronaut has 200 food units. The crew consumes 25 units per day. How many days will the food last?',
        options: ['6 days', '8 days', '10 days'],
        answer: '8 days',
      },
      {
        question: 'A spacecraft has 5 batteries, each producing 12 volts. What is their total voltage if connected in series?',
        options: ['50 volts', '60 volts', '70 volts'],
        answer: '60 volts',
      },
      {
        question: 'A mission starts at 08:00 and lasts 7 hours and 30 minutes. At what time does it end?',
        options: ['14:30', '15:00', '15:30'],
        answer: '15:30',
      },
    ],
  },

  // 5. WORD PUZZLES - TEXT INPUT ONLY
  {
    id: 'word',
    icon: '🔤',
    title: 'Word Puzzles',
    description: 'Unscramble the mission word.',
    questions: [
      {
        question: 'Unscramble the space telemetry term: T R O I B',
        answers: ['orbit'],
        answerDisplay: 'ORBIT',
      },
      {
        question: 'Unscramble the space object: T A N E P L',
        answers: ['planet'],
        answerDisplay: 'PLANET',
      },
      {
        question: 'Unscramble the space vehicle: T E K O R C',
        answers: ['rocket'],
        answerDisplay: 'ROCKET',
      },
      {
        question: 'Unscramble the word related to astronauts: C A P S E',
        answers: ['space'],
        answerDisplay: 'SPACE',
      },
      {
        question: 'Unscramble the word describing a journey: N O I S S M I',
        answers: ['mission'],
        answerDisplay: 'MISSION',
      },
    ],
  },

  // 6. SPATIAL REASONING
  {
    id: 'spatial',
    icon: '🧊',
    title: 'Spatial Reasoning',
    description: 'Visualize directions and rotations.',
    questions: [
      {
        question: 'Docking port hatch faces North (+Y). After a 90° clockwise yaw rotation, which direction does it face?',
        options: ['West (-X)', 'East (+X)', 'South (-Y)'],
        answer: 'East (+X)',
      },
      {
        question: 'An astronaut faces East. They turn 180 degrees. Which direction are they facing now?',
        options: ['North', 'West', 'South'],
        answer: 'West',
      },
      {
        question: 'A spacecraft is facing North. It turns 90 degrees counterclockwise. Which direction does it face?',
        options: ['East', 'West', 'South'],
        answer: 'West',
      },
      {
        question: 'An astronaut moves 3 steps North and then 3 steps South. Where are they relative to their starting point?',
        options: ['North of starting point', 'South of starting point', 'At the starting point'],
        answer: 'At the starting point',
      },
      {
        question: 'A robot faces South. It makes a 90-degree clockwise turn. Which direction does it face?',
        options: ['East', 'West', 'North'],
        answer: 'West',
      },
    ],
  },
];

const normalizeAnswer = (value) =>
  String(value)
    .toLowerCase()
    .trim()
    .replace(/[\s.,!?°()+\-]/g, '');

const PsychologicalPuzzles = () => {
  const [difficulty, setDifficulty] = useState('Easy');
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  const [activeGame, setActiveGame] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [gameFeedback, setGameFeedback] = useState(null);

  const [sessionScore, setSessionScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('astro_puzzles_stats');

      return saved
        ? { ...createInitialStats(), ...JSON.parse(saved) }
        : createInitialStats();
    } catch {
      return createInitialStats();
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('astro_puzzles_stats', JSON.stringify(stats));
    } catch (error) {
      console.error('Unable to save puzzle statistics:', error);
    }
  }, [stats]);

  const achievementsList = [
    {
      id: 'first-mission',
      title: 'First Mission',
      description: 'Complete any puzzle session.',
      unlocked: stats.sessionsPlayed >= 1,
    },
    {
      id: 'sharp-mind',
      title: 'Sharp Mind',
      description: 'Answer all five questions correctly.',
      unlocked: stats.history.some((h) => h.allCorrect),
    },
    {
      id: 'hard-mode',
      title: 'Hard Mode',
      description: 'Complete a session on Hard.',
      unlocked: stats.completedHard,
    },
    {
      id: 'well-rounded',
      title: 'Well-Rounded',
      description: 'Play all six puzzle types.',
      unlocked: stats.playedTypes.length >= 6,
    },
    {
      id: 'daily-challenger',
      title: 'Daily Challenger',
      description: 'Finish a daily challenge.',
      unlocked: stats.completedDaily,
    },
    {
      id: 'century',
      title: 'Century',
      description: 'Reach 100 total points.',
      unlocked: stats.totalScore >= 100,
    },
  ];

  const unlockedCount = achievementsList.filter((a) => a.unlocked).length;

  const currentQuestion = activeGame
    ? activeGame.questions[questionIndex]
    : null;

  const totalQuestions = activeGame?.questions.length || 5;

  const progress =
    ((questionIndex + (gameFeedback ? 1 : 0)) / totalQuestions) * 100;

  const startPuzzle = (puzzle, modeDifficulty = difficulty, isDaily = false) => {
    setActiveGame({ ...puzzle, modeDifficulty, isDaily });
    setQuestionIndex(0);
    setUserAnswer('');
    setGameFeedback(null);
    setSessionScore(0);
    setCorrectAnswers(0);
    setShowResults(false);
  };

  const handleAnswerSubmit = (answer) => {
    if (!activeGame || gameFeedback || !answer?.trim()) return;

    const isWordPuzzle = activeGame.id === 'word';

    const isCorrect = isWordPuzzle
      ? currentQuestion.answers.some(
          (item) => normalizeAnswer(item) === normalizeAnswer(answer)
        )
      : normalizeAnswer(currentQuestion.answer) === normalizeAnswer(answer);

    const pointsEarned = isCorrect
      ? activeGame.modeDifficulty === 'Hard'
        ? 30
        : activeGame.modeDifficulty === 'Medium'
          ? 20
          : 10
      : 0;

    setUserAnswer(answer);

    setGameFeedback({
      isCorrect,
      pointsEarned,
    });

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
    }

    setSessionScore((prev) => prev + pointsEarned);
  };

  const finishSession = () => {
    if (!activeGame || showResults) return;

    const allCorrect = correctAnswers === totalQuestions;

    const completedSession = {
      id: Date.now(),
      title: activeGame.title,
      difficulty: activeGame.modeDifficulty,
      points: sessionScore,
      correct: correctAnswers,
      total: totalQuestions,
      allCorrect,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setStats((prev) => ({
      ...prev,
      totalScore: prev.totalScore + sessionScore,
      sessionsPlayed: prev.sessionsPlayed + 1,
      playedTypes: prev.playedTypes.includes(activeGame.id)
        ? prev.playedTypes
        : [...prev.playedTypes, activeGame.id],
      completedDaily: prev.completedDaily || activeGame.isDaily,
      completedHard:
        prev.completedHard || activeGame.modeDifficulty === 'Hard',
      history: [completedSession, ...prev.history].slice(0, 8),
    }));

    setShowResults(true);
  };

  const nextQuestion = () => {
    if (questionIndex === totalQuestions - 1) {
      finishSession();
      return;
    }

    setQuestionIndex((prev) => prev + 1);
    setUserAnswer('');
    setGameFeedback(null);
  };

  const closePuzzle = () => {
    setActiveGame(null);
    setQuestionIndex(0);
    setUserAnswer('');
    setGameFeedback(null);
    setSessionScore(0);
    setCorrectAnswers(0);
    setShowResults(false);
  };

  return (
    <div className="flex flex-col space-y-6">

      {/* SCORE SUMMARY */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium text-[#566678]">Total score</div>
          <div className="text-3xl font-bold text-[#0A1B33] font-mono mt-1">
            {stats.totalScore}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium text-[#566678]">Sessions played</div>
          <div className="text-3xl font-bold text-[#0A1B33] font-mono mt-1">
            {stats.sessionsPlayed}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium text-[#566678]">Achievements</div>
          <div className="text-3xl font-bold text-[#0A1B33] font-mono mt-1">
            {unlockedCount}
            <span className="text-base font-normal text-[#566678]"> / 6</span>
          </div>
        </div>
      </div>

      {/* DAILY CHALLENGE */}

      <div className="rounded-2xl border-2 border-[#2F80D1] bg-white p-4 md:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-[#EDF2F9] text-[#1D4F9C] flex items-center justify-center font-bold text-lg shrink-0">
            T
          </div>

          <div>
            <div className="font-bold text-[#0A1B33] text-base">
              📅 Daily Challenge
            </div>
            <p className="text-xs text-[#566678] mt-0.5">
              Word Puzzles · Medium · 5 Questions
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => startPuzzle(puzzles[4], 'Medium', true)}
          className="bg-[#346E9E] hover:bg-[#285880] text-white font-semibold text-xs md:text-sm px-5 py-2.5 rounded-full transition-colors cursor-pointer shrink-0"
        >
          Start daily challenge
        </button>
      </div>

      {/* CHOOSE A PUZZLE */}

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#0A1B33]">
            Choose a puzzle
          </h2>

          <div className="inline-flex rounded-full bg-white border border-gray-300 p-1">
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                  difficulty === level
                    ? 'bg-[#346E9E] text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {puzzles.map((puzzle) => (
            <div
              key={puzzle.id}
              className="rounded-2xl border border-gray-300 bg-white p-5 shadow-sm flex flex-col justify-between space-y-4 h-full"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-[#0A1B33] text-base">
                  <span className="text-[#1D4F9C] text-xl">{puzzle.icon}</span>
                  <span>{puzzle.title}</span>
                </div>

                <p className="text-xs text-[#566678]">{puzzle.description}</p>

                <p className="text-xs text-[#346E9E] font-semibold pt-1">
                  5 Questions · 1 Session
                </p>
              </div>

              <button
                type="button"
                onClick={() => startPuzzle(puzzle, difficulty, false)}
                className="w-full bg-[#346E9E] hover:bg-[#285880] text-white font-semibold text-xs py-2.5 px-4 rounded-full inline-flex items-center justify-center gap-2 transition-colors cursor-pointer mt-auto"
              >
                <span>▷</span>
                <span>Play · {difficulty}</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ACHIEVEMENTS & HISTORY */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">

        <div className="rounded-3xl border border-gray-300 bg-white p-5 md:p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#0A1B33] flex items-center gap-2">
            <span>🏅</span>
            <span>Achievements</span>
          </h3>

          <div className="space-y-2.5">
            {achievementsList.map((ach) => (
              <div
                key={ach.id}
                className={`rounded-2xl border p-3.5 flex items-center gap-3.5 ${
                  ach.unlocked
                    ? 'bg-green-50/60 border-green-300'
                    : 'bg-[#F8FAFC] border-gray-200'
                }`}
              >
                <span className="text-lg shrink-0">
                  {ach.unlocked ? '🏆' : '🔒'}
                </span>

                <div>
                  <div className="text-xs font-bold text-[#0A1B33]">
                    {ach.title} —{' '}
                    <span className={ach.unlocked ? 'text-[#12805D]' : 'text-[#566678]'}>
                      {ach.unlocked ? 'Unlocked' : 'Locked'}
                    </span>
                  </div>

                  <p className="text-xs text-[#566678] mt-0.5">
                    {ach.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-gray-300 bg-white p-5 md:p-6 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-[#0A1B33] mb-4">
            Progress history
          </h3>

          {stats.history.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 space-y-2">
              <span className="text-4xl text-gray-300">🧩</span>
              <div className="text-sm font-bold text-[#0A1B33]">
                No sessions yet
              </div>
              <p className="text-xs text-[#566678]">
                Complete a puzzle session to start your history.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {stats.history.map((session) => (
                <div
                  key={session.id}
                  className="rounded-2xl border border-gray-200 bg-[#F8FAFC] p-3.5 flex items-center justify-between gap-3"
                >
                  <div>
                    <div className="text-xs font-bold text-[#0A1B33]">
                      {session.title} · {session.difficulty}
                    </div>

                    <div className="text-[11px] text-[#566678] mt-0.5">
                      {session.correct}/{session.total} correct · {session.time}
                    </div>
                  </div>

                  <span className="rounded-full px-3 py-1 text-xs font-mono font-bold bg-blue-100 text-[#1D4F9C] shrink-0">
                    +{session.points} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CREW LEADERBOARD */}

      <div className="rounded-3xl border border-gray-300 bg-white p-5 md:p-6 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 font-bold text-[#0A1B33] text-base">
            <span>🏆</span>
            <span>Crew leaderboard</span>
          </div>

          <label className="inline-flex items-center gap-2 text-xs text-[#203040] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showLeaderboard}
              onChange={(e) => setShowLeaderboard(e.target.checked)}
              className="rounded border-gray-300 text-[#1D4F9C] focus:ring-[#1D4F9C]"
            />
            <span>Show leaderboard (mission setting)</span>
          </label>
        </div>

        {!showLeaderboard ? (
          <p className="text-xs text-[#566678]">
            The leaderboard is off. Turn it on only if the crew has agreed to share scores.
          </p>
        ) : (
          <div className="pt-2 divide-y divide-gray-200 text-xs">
            {[
              { crew: 'AST-0427 (You)', score: stats.totalScore },
              { crew: 'AST-0391 (Commander)', score: 140 },
              { crew: 'AST-0512 (Flight Eng.)', score: 110 },
            ]
              .sort((a, b) => b.score - a.score)
              .map((row, idx) => (
                <div
                  key={row.crew}
                  className="py-2.5 flex items-center justify-between"
                >
                  <span className="font-bold text-[#0A1B33]">
                    #{idx + 1} · {row.crew}
                  </span>

                  <span className="font-mono font-bold text-[#1D4F9C]">
                    {row.score} pts
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* PUZZLE MODAL */}

      {activeGame && currentQuestion && (
        <div
          className="fixed inset-0 z-50 bg-[#071426]/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={closePuzzle}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeGame.title}
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto rounded-3xl border border-[#DCE6F2] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* HEADER */}

            <div className="relative overflow-hidden bg-gradient-to-r from-[#0A1B33] via-[#173C65] to-[#346E9E] px-6 sm:px-8 py-6">
              <div className="absolute -right-10 -top-16 w-48 h-48 rounded-full border border-white/10" />
              <div className="absolute -right-4 -top-10 w-32 h-32 rounded-full border border-white/10" />

              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-200">
                    ASTROCARE · MENTAL MISSION
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
                    {activeGame.icon} {activeGame.title}
                  </h2>

                  <p className="text-xs text-blue-200 mt-1">
                    {activeGame.modeDifficulty} Level
                    {activeGame.isDaily ? ' · Daily Challenge' : ''}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closePuzzle}
                  aria-label="Close puzzle"
                  className="relative shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-lg transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* PROGRESS */}

              {!showResults && (
                <div className="relative mt-7">
                  <div className="flex justify-between items-center text-xs text-blue-100 mb-2">
                    <span className="font-semibold">Mission Progress</span>

                    <span className="font-mono font-bold">
                      Question {questionIndex + 1} / {totalQuestions}
                    </span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-blue-300 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* BODY */}

            <div className="px-6 sm:px-8 py-7 sm:py-8">

              {/* FINAL RESULTS */}

              {showResults ? (
                <div className="text-center py-5">
                  <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-4xl mx-auto mb-5">
                    🏆
                  </div>

                  <h3 className="text-2xl font-bold text-[#0A1B33]">
                    Mission Completed!
                  </h3>

                  <p className="text-sm text-[#718096] mt-2">
                    You have successfully completed this puzzle session.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="rounded-2xl bg-[#F1F6FC] border border-blue-100 p-5">
                      <div className="text-xs text-[#566678]">
                        Correct Answers
                      </div>
                      <div className="text-3xl font-bold text-[#346E9E] mt-2">
                        {correctAnswers}/{totalQuestions}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#F1F6FC] border border-blue-100 p-5">
                      <div className="text-xs text-[#566678]">
                        Points Earned
                      </div>
                      <div className="text-3xl font-bold text-[#346E9E] mt-2">
                        {sessionScore}
                      </div>
                    </div>
                  </div>

                  <p className="text-sm font-semibold text-[#346E9E] mt-6">
                    {correctAnswers === 5
                      ? 'Excellent work! Perfect score!'
                      : 'Great effort! Keep practicing to improve your score.'}
                  </p>

                  <button
                    type="button"
                    onClick={closePuzzle}
                    className="w-full mt-7 rounded-full bg-[#0A1B33] hover:bg-[#173C65] text-white font-bold text-sm px-6 py-4 transition-colors shadow-lg"
                  >
                    Finish Mission ✓
                  </button>
                </div>
              ) : (
                <>
                  {!gameFeedback ? (
                    <>
                      <div className="flex items-center gap-2 mb-5">
                        <span className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-50 text-[#346E9E] font-bold text-sm">
                          {questionIndex + 1}
                        </span>

                        <span className="text-xs font-bold uppercase tracking-wider text-[#346E9E]">
                          Mission Question
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-[#0A1B33] leading-relaxed min-h-[75px]">
                        {currentQuestion.question}
                      </h3>

                      {/* WORD PUZZLES: INPUT ONLY */}

                      {activeGame.id === 'word' ? (
                        <div className="mt-6">
                          <label
                            htmlFor="puzzle-answer"
                            className="block text-sm font-semibold text-[#0A1B33] mb-2"
                          >
                            Your Answer
                          </label>

                          <input
                            id="puzzle-answer"
                            type="text"
                            autoComplete="off"
                            autoFocus
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAnswerSubmit(userAnswer);
                              }
                            }}
                            placeholder="Write your answer here..."
                            className="w-full rounded-2xl border-2 border-[#DCE6F2] bg-[#F8FAFC] px-5 py-4 text-base text-[#0A1B33] outline-none transition-all placeholder:text-gray-400 focus:border-[#346E9E] focus:bg-white focus:ring-4 focus:ring-blue-100"
                          />

                          <button
                            type="button"
                            disabled={!userAnswer.trim()}
                            onClick={() => handleAnswerSubmit(userAnswer)}
                            className="w-full sm:w-auto sm:ml-auto sm:flex mt-6 min-w-[170px] rounded-full bg-[#346E9E] hover:bg-[#285880] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm px-8 py-3.5 transition-all shadow-md"
                          >
                            Submit Answer →
                          </button>
                        </div>
                      ) : (

                        /* OTHER SECTIONS: MULTIPLE CHOICE */

                        <div className="space-y-3 mt-7">
                          {currentQuestion.options.map((option, index) => {
                            const letters = ['A', 'B', 'C'];

                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => handleAnswerSubmit(option)}
                                className="w-full flex items-center gap-4 text-left px-4 py-4 rounded-2xl border-2 border-[#DCE6F2] bg-[#F8FAFC] text-[#0A1B33] hover:border-[#346E9E] hover:bg-[#EDF2F9] transition-all group"
                              >
                                <span className="w-9 h-9 rounded-xl flex items-center justify-center bg-white border border-gray-200 text-sm font-bold text-[#346E9E] group-hover:bg-[#346E9E] group-hover:text-white transition-colors shrink-0">
                                  {letters[index]}
                                </span>

                                <span className="text-sm font-semibold">
                                  {option}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ) : (

                    /* FEEDBACK */

                    <div className="py-3">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 ${
                          gameFeedback.isCorrect
                            ? 'bg-green-100'
                            : 'bg-red-100'
                        }`}
                      >
                        {gameFeedback.isCorrect ? '✓' : '✕'}
                      </div>

                      <h3
                        className={`text-2xl font-bold ${
                          gameFeedback.isCorrect
                            ? 'text-green-700'
                            : 'text-red-600'
                        }`}
                      >
                        {gameFeedback.isCorrect
                          ? 'Correct Answer!'
                          : 'Not Quite!'}
                      </h3>

                      <p className="text-sm text-[#566678] mt-2">
                        {gameFeedback.isCorrect
                          ? `Great job! You earned ${gameFeedback.pointsEarned} points.`
                          : 'Keep going! Every question is a chance to improve.'}
                      </p>

                      {!gameFeedback.isCorrect && (
                        <div className="mt-5 rounded-2xl border border-blue-100 bg-[#F1F6FC] p-4">
                          <p className="text-xs font-bold text-[#346E9E] uppercase tracking-wider">
                            Correct Answer
                          </p>

                          <p className="text-lg font-bold text-[#0A1B33] mt-1">
                            {activeGame.id === 'word'
                              ? currentQuestion.answerDisplay
                              : currentQuestion.answer}
                          </p>
                        </div>
                      )}

                      <div className="mt-6 rounded-2xl bg-[#F8FAFC] border border-gray-200 p-4 flex items-center justify-between">
                        <span className="text-sm text-[#566678]">
                          Session Score
                        </span>

                        <span className="text-xl font-bold font-mono text-[#346E9E]">
                          {sessionScore} pts
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={nextQuestion}
                        className="w-full mt-6 rounded-full bg-[#0A1B33] hover:bg-[#173C65] text-white font-bold text-sm px-6 py-4 transition-colors shadow-lg"
                      >
                        {questionIndex === totalQuestions - 1
                          ? 'View Final Results →'
                          : 'Next Question →'}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* FOOTER */}

            <div className="border-t border-gray-100 px-6 sm:px-8 py-4 flex items-center justify-between gap-3 bg-[#FBFCFE]">
              <span className="text-xs text-[#718096]">
                ASTROCARE · Mental Fitness
              </span>

              <span className="text-xs font-semibold text-[#346E9E]">
                {correctAnswers} / {totalQuestions} Correct
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologicalPuzzles;
