import { useState, useEffect } from 'react';

const PsychologicalPuzzles = () => {
  const [difficulty, setDifficulty] = useState('Easy');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [gameFeedback, setGameFeedback] = useState(null);

  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('astro_puzzles_stats');
      return saved
        ? JSON.parse(saved)
        : {
          totalScore: 0,
          sessionsPlayed: 0,
          playedTypes: [],
          completedDaily: false,
          completedHard: false,
          history: [],
        };
    } catch {
      return {
        totalScore: 0,
        sessionsPlayed: 0,
        playedTypes: [],
        completedDaily: false,
        completedHard: false,
        history: [],
      };
    }
  });

  useEffect(() => {
    localStorage.setItem('astro_puzzles_stats', JSON.stringify(stats));
  }, [stats]);

  const puzzles = [
    {
      id: 'logic',
      icon: '💡',
      title: 'Logic Puzzles',
      description: 'Deduce the correct conclusion.',
      question: 'If Module A has higher pressure than Module B, and Module C has lower pressure than Module B, which module has the lowest pressure?',
      options: ['Module A', 'Module B', 'Module C'],
      answer: 'Module C',
    },
    {
      id: 'memory',
      icon: '🧠',
      title: 'Memory Games',
      description: 'Repeat the sequence you saw.',
      question: 'Telemetry sequence: O2 — 98 — kPa — 101. What was the 3rd item in the sequence?',
      options: ['98', 'kPa', '101'],
      answer: 'kPa',
    },
    {
      id: 'pattern',
      icon: '🔢',
      title: 'Pattern Recognition',
      description: 'Find the next number.',
      question: 'Find the next number in the orbital pulse sequence: 2, 6, 12, 20, 30, ?',
      options: ['38', '40', '42'],
      answer: '42',
    },
    {
      id: 'math',
      icon: '#',
      title: 'Mathematical Challenges',
      description: 'Quick mental arithmetic.',
      question: 'Cabin oxygen reserve is 480 L. If crew consumption is 35 L/hour, how much remains after 6 hours?',
      options: ['270 L', '290 L', '310 L'],
      answer: '270 L',
    },
    {
      id: 'word',
      icon: '🔤',
      title: 'Word Puzzles',
      description: 'Unscramble the mission word.',
      question: 'Unscramble the space telemetry term: T R O I B',
      options: ['ORBIT', 'ROBOT', 'BOOST'],
      answer: 'ORBIT',
    },
    {
      id: 'spatial',
      icon: '🧊',
      title: 'Spatial Reasoning',
      description: 'Rotate the pattern in your mind.',
      question: 'Docking port hatch faces North (+Y). After a 90° clockwise yaw rotation, which direction does it face?',
      options: ['West (-X)', 'East (+X)', 'South (-Y)'],
      answer: 'East (+X)',
    },
  ];

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
      description: 'Answer every round correctly in one session.',
      unlocked: stats.history.some((h) => h.correct),
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

  const startPuzzle = (puzzle, modeDifficulty = difficulty, isDaily = false) => {
    setActiveGame({ ...puzzle, modeDifficulty, isDaily });
    setUserAnswer('');
    setGameFeedback(null);
  };

  const handleAnswerSubmit = (selectedOption) => {
    if (!activeGame || gameFeedback) return;
    setUserAnswer(selectedOption);

    const isCorrect = selectedOption === activeGame.answer;
    const pointsEarned = isCorrect
      ? activeGame.modeDifficulty === 'Hard'
        ? 30
        : activeGame.modeDifficulty === 'Medium'
          ? 20
          : 10
      : 0;

    setGameFeedback({
      isCorrect,
      pointsEarned,
    });

    setStats((prev) => ({
      totalScore: prev.totalScore + pointsEarned,
      sessionsPlayed: prev.sessionsPlayed + 1,
      playedTypes: prev.playedTypes.includes(activeGame.id)
        ? prev.playedTypes
        : [...prev.playedTypes, activeGame.id],
      completedDaily: prev.completedDaily || (activeGame.isDaily && isCorrect),
      completedHard: prev.completedHard || (activeGame.modeDifficulty === 'Hard' && isCorrect),
      history: [
        {
          id: Date.now(),
          title: activeGame.title,
          difficulty: activeGame.modeDifficulty,
          points: pointsEarned,
          correct: isCorrect,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
        ...prev.history.slice(0, 7),
      ],
    }));
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* 1. Top 3 Score Summary Cards */}
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
            {unlockedCount} <span className="text-base font-normal text-[#566678]">/ 6</span>
          </div>
        </div>
      </div>

      {/* 2. Daily Challenge Banner */}
      <div className="rounded-2xl border-2 border-[#2F80D1] bg-white p-4 md:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="h-11 w-11 rounded-xl bg-[#EDF2F9] text-[#1D4F9C] flex items-center justify-center font-bold text-lg shrink-0">
            T
          </div>
          <div>
            <div className="font-bold text-[#0A1B33] text-base flex items-center gap-2">
              <span>📅</span>
              <span>Daily Challenge</span>
            </div>
            <p className="text-xs text-[#566678] mt-0.5">
              Word Puzzles · Medium · same puzzle for the whole crew today
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => startPuzzle(puzzles[4], 'Medium', true)}
          className="bg-[#346E9E] hover:bg-[#285880] text-white font-semibold text-xs md:text-sm px-5 py-2.5 rounded-full transition-colors cursor-pointer shrink-0 self-start sm:self-center"
        >
          Start daily challenge
        </button>
      </div>

      {/* 3. Choose a Puzzle Section */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-bold text-[#0A1B33]">Choose a puzzle</h2>

          <div className="inline-flex rounded-full bg-white border border-gray-300 p-1">
            {['Easy', 'Medium', 'Hard'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setDifficulty(level)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${difficulty === level
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
                  <span className="text-[#1D4F9C]">{puzzle.icon}</span>
                  <span>{puzzle.title}</span>
                </div>
                <p className="text-xs text-[#566678]">{puzzle.description}</p>
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

      {/* 4. Achievements & Progress History Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        {/* Achievements Card */}
        <div className="rounded-3xl border border-gray-300 bg-white p-5 md:p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-[#0A1B33] flex items-center gap-2">
            <span>🏅</span>
            <span>Achievements</span>
          </h3>

          <div className="space-y-2.5">
            {achievementsList.map((ach) => (
              <div
                key={ach.id}
                className={`rounded-2xl border p-3.5 flex items-center gap-3.5 ${ach.unlocked
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
                  <p className="text-xs text-[#566678] mt-0.5">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress History Card */}
        <div className="rounded-3xl border border-gray-300 bg-white p-5 md:p-6 shadow-sm flex flex-col">
          <h3 className="text-base font-bold text-[#0A1B33] mb-4">
            Progress history
          </h3>

          {stats.history.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 space-y-2">
              <span className="text-4xl text-gray-300">🧩</span>
              <div className="text-sm font-bold text-[#0A1B33]">No sessions yet</div>
              <p className="text-xs text-[#566678]">
                Play a puzzle to start your history.
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
                      {session.time}
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-mono font-bold ${session.correct
                        ? 'bg-green-100 text-[#12805D]'
                        : 'bg-gray-200 text-gray-600'
                      }`}
                  >
                    +{session.points} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 5. Crew Leaderboard Card */}
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
              { rank: 1, crew: 'AST-0427 (You)', score: stats.totalScore },
              { rank: 2, crew: 'AST-0391 (Commander)', score: 140 },
              { rank: 3, crew: 'AST-0512 (Flight Eng.)', score: 110 },
            ]
              .sort((a, b) => b.score - a.score)
              .map((row, idx) => (
                <div key={row.crew} className="py-2.5 flex items-center justify-between">
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

      {/* Interactive Puzzle Modal */}
      {activeGame && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setActiveGame(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white border border-gray-300 p-6 shadow-xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1D4F9C]">
                {activeGame.title} · {activeGame.modeDifficulty}
              </span>
              <button
                type="button"
                onClick={() => setActiveGame(null)}
                className="text-sm font-bold text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-base font-bold text-[#0A1B33] leading-relaxed">
              {activeGame.question}
            </p>

            <div className="space-y-2.5">
              {activeGame.options.map((option) => {
                const isSelected = userAnswer === option;
                const isRight = gameFeedback && option === activeGame.answer;
                const isWrong = gameFeedback && isSelected && !gameFeedback.isCorrect;

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={Boolean(gameFeedback)}
                    onClick={() => handleAnswerSubmit(option)}
                    className={`w-full text-left px-4 py-3 rounded-2xl border text-sm font-semibold transition-colors cursor-pointer ${isRight
                        ? 'bg-green-100 border-green-500 text-green-900'
                        : isWrong
                          ? 'bg-red-100 border-red-500 text-red-900'
                          : 'bg-[#F8FAFC] border-gray-300 text-[#0A1B33] hover:bg-[#EDF2F9]'
                      }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {gameFeedback && (
              <div className="rounded-2xl bg-[#EDF2F9] p-4 flex items-center justify-between">
                <span className="text-sm font-bold text-[#0A1B33]">
                  {gameFeedback.isCorrect
                    ? `Correct! +${gameFeedback.pointsEarned} points`
                    : `Incorrect — Answer: ${activeGame.answer}`}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveGame(null)}
                  className="bg-[#0A1B33] text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PsychologicalPuzzles;