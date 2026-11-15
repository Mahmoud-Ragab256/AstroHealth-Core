
import { useState, useMemo, useEffect } from 'react';

const NHFT_PLAYLIST = 'PLRSUkc3BoFgbK4HeRirDB7mYw0oiDZyyQ';

const exercises = [
  {
    id: 1,
    type: 'Resistance Training',
    title: 'Squats',
    targets: ['Legs', 'Glutes', 'Core'],
    duration: '15 min',
    intensity: 'High',
    level: 'Intermediate',
    condition: 'Bone Density Support',
    icon: '🏋️',
    videoId: 'YxImeOomkUk',
    videoTitle: 'Working Out Aboard the Space Station',
    videoSource: 'NASA',
    instructions: 'Perform squats with controlled movement and maintain proper posture throughout the exercise.'
  },
  {
    id: 2,
    type: 'Resistance Training',
    title: 'Deadlifts',
    targets: ['Back', 'Legs', 'Glutes'],
    duration: '15 min',
    intensity: 'High',
    level: 'Advanced',
    condition: 'Bone Density Support',
    icon: '🏋️‍♂️',
    playlist: true,
    playlistIndex: 3,
    videoTitle: 'Deadlift Demonstration',
    videoSource: 'NHFT Physiotherapy',
    instructions: 'Hinge at the hips while maintaining a neutral spine and controlled movement.'
  },
  {
    id: 3,
    type: 'Resistance Training',
    title: 'Chest Press',
    targets: ['Chest', 'Arms', 'Shoulders'],
    duration: '12 min',
    intensity: 'Moderate',
    level: 'Intermediate',
    condition: 'Muscle Mass Retention',
    icon: '💪',
    videoId: 'NaCRebEQ5og',
    videoTitle: 'Workout in 360 - Cosmic Kiss',
    videoSource: 'ESA / NASA',
    instructions: 'Perform controlled pressing movements while maintaining torso stability.'
  },
  {
    id: 4,
    type: 'Resistance Training',
    title: 'Resistance Band Exercises',
    targets: ['Full Body'],
    duration: '20 min',
    intensity: 'Low',
    level: 'Beginner',
    condition: 'Muscle Mass Retention',
    icon: '〰️',
    playlist: true,
    playlistIndex: 1,
    videoTitle: 'Resistance Exercise Demonstrations',
    videoSource: 'NHFT Physiotherapy',
    instructions: 'Use controlled resistance and maintain consistent tension throughout each movement.'
  },
  {
    id: 5,
    type: 'Resistance Training',
    title: 'Lower Body Resistance',
    targets: ['Legs', 'Glutes'],
    duration: '20 min',
    intensity: 'High',
    level: 'Intermediate',
    condition: 'Bone Density Support',
    icon: '🦵',
    playlist: true,
    playlistIndex: 7,
    videoTitle: 'Lower Body Exercise Demonstrations',
    videoSource: 'NHFT Physiotherapy',
    instructions: 'Perform lower body resistance movements targeting the calves, quadriceps and glutes.'
  },
  {
    id: 6,
    type: 'Resistance Training',
    title: 'Upper Body Resistance',
    targets: ['Back', 'Arms', 'Shoulders'],
    duration: '20 min',
    intensity: 'Moderate',
    level: 'Intermediate',
    condition: 'Muscle Mass Retention',
    icon: '🦾',
    videoId: 'YxImeOomkUk',
    videoTitle: 'ARED Resistance Training',
    videoSource: 'NASA',
    instructions: 'Perform resistance movements with controlled repetitions and stable posture.'
  },
  {
    id: 7,
    type: 'Aerobic Training',
    title: 'Treadmill Running',
    targets: ['Legs', 'Core'],
    duration: '30 min',
    intensity: 'Moderate',
    level: 'Intermediate',
    condition: 'Cardiovascular Conditioning',
    icon: '🏃',
    videoId: 'YL_7SATIW-Q',
    videoTitle: 'Physical Activity in Space',
    videoSource: 'Canadian Space Agency',
    instructions: 'Astronauts use a treadmill with a harness system to provide loading during running.'
  },
  {
    id: 8,
    type: 'Aerobic Training',
    title: 'Stationary Cycling',
    targets: ['Legs', 'Glutes'],
    duration: '30 min',
    intensity: 'Moderate',
    level: 'Beginner',
    condition: 'Cardiovascular Conditioning',
    icon: '🚴',
    videoId: 'YL_7SATIW-Q',
    videoTitle: 'Astronaut Cycling in Space',
    videoSource: 'Canadian Space Agency',
    instructions: 'Maintain a steady cycling cadence using the stationary bicycle designed for spaceflight.'
  },
  {
    id: 9,
    type: 'Aerobic Training',
    title: 'Cardiovascular Endurance',
    targets: ['Full Body'],
    duration: '25 min',
    intensity: 'High',
    level: 'Advanced',
    condition: 'Cardiovascular Conditioning',
    icon: '❤️',
    videoId: 'qKnf9EQsbtA',
    videoTitle: 'Horizons Mission - Exercise in Space',
    videoSource: 'European Space Agency',
    instructions: 'Focus on aerobic conditioning and controlled exercise intensity.'
  },
  {
    id: 10,
    type: 'Mobility & Balance',
    title: 'Mobility Exercises',
    targets: ['Full Body'],
    duration: '15 min',
    intensity: 'Low',
    level: 'Beginner',
    condition: 'Joint & Vestibular Care',
    icon: '🤸',
    playlist: true,
    playlistIndex: 5,
    videoTitle: 'Mobility Exercise Demonstrations',
    videoSource: 'NHFT Physiotherapy',
    instructions: 'Perform gentle mobility movements through a comfortable range of motion.'
  },
  {
    id: 11,
    type: 'Mobility & Balance',
    title: 'Coordination Exercises',
    targets: ['Core', 'Full Body'],
    duration: '15 min',
    intensity: 'Low',
    level: 'Beginner',
    condition: 'Joint & Vestibular Care',
    icon: '🎯',
    playlist: true,
    playlistIndex: 28,
    videoTitle: 'Coordination and Balance',
    videoSource: 'NHFT Physiotherapy',
    instructions: 'Practice controlled movements that challenge coordination and spatial awareness.'
  },
  {
    id: 12,
    type: 'Mobility & Balance',
    title: 'Balance Training',
    targets: ['Legs', 'Core'],
    duration: '15 min',
    intensity: 'Low',
    level: 'Intermediate',
    condition: 'Joint & Vestibular Care',
    icon: '⚖️',
    playlist: true,
    playlistIndex: 28,
    videoTitle: 'Balance Exercise Demonstrations',
    videoSource: 'NHFT Physiotherapy',
    instructions: 'Practice balance and postural stabilization with controlled movements.'
  },
  {
    id: 13,
    type: 'Mobility & Balance',
    title: 'Stretching',
    targets: ['Full Body'],
    duration: '10 min',
    intensity: 'Low',
    level: 'Beginner',
    condition: 'Joint & Vestibular Care',
    icon: '🧘',
    videoId: 'qKnf9EQsbtA',
    videoTitle: 'Exercise and Recovery in Space',
    videoSource: 'European Space Agency',
    instructions: 'Perform gentle static stretches targeting the hamstrings, hip flexors and back.'
  }
];

const typeStyles = {
  'Resistance Training': 'bg-purple-50 text-purple-700 border-purple-200',
  'Aerobic Training': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Mobility & Balance': 'bg-sky-50 text-sky-700 border-sky-200'
};

const categoryImages = {
  1: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800',
  2: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
  3: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
  4: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800',
  5: 'https://images.unsplash.com/photo-1434596922112-19c563067271?w=800',
  6: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800',
  7: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=800',
  8: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
  9: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800',
  10: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
  11: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
  12: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
  13: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800'
};

const GravityExercises = () => {
  const [exerciseType, setExerciseType] = useState('All');
  const [muscleGroup, setMuscleGroup] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [healthCondition, setHealthCondition] = useState('All');
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeDetails, setActiveDetails] = useState(null);

  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      return (
        (exerciseType === 'All' || ex.type === exerciseType) &&
        (muscleGroup === 'All' || ex.targets.includes(muscleGroup)) &&
        (difficulty === 'All' || ex.level === difficulty) &&
        (healthCondition === 'All' || ex.condition === healthCondition)
      );
    });
  }, [exerciseType, muscleGroup, difficulty, healthCondition]);

  const getVideoUrl = (exercise) => {
    if (exercise.playlist) {
      return `https://www.youtube-nocookie.com/embed/videoseries?list=${NHFT_PLAYLIST}&index=${exercise.playlistIndex || 0}&autoplay=1&rel=0`;
    }

    return `https://www.youtube-nocookie.com/embed/${exercise.videoId}?autoplay=1&rel=0`;
  };

  const closeModals = () => {
    setActiveVideo(null);
    setActiveDetails(null);
  };

  useEffect(() => {
    if (!activeVideo && !activeDetails) return;

    const handleKey = (event) => {
      if (event.key === 'Escape') closeModals();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeVideo, activeDetails]);

  const handleReset = () => {
    setExerciseType('All');
    setMuscleGroup('All');
    setDifficulty('All');
    setHealthCondition('All');
  };

  const openVideo = (exercise) => {
    setActiveDetails(null);
    setActiveVideo(exercise);
  };

  return (
    <div className="flex flex-col gap-6">

      {/* Warning */}
      <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
        <span className="text-xl">⚠️</span>
        <p>
          Exercises are illustrative. Follow the exercise prescription provided by your flight surgeon and exercise specialist.
        </p>
      </div>

      {/* Filters */}
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#0A1B33]">Find Your Exercise</h2>
            <p className="text-xs text-slate-500">Filter exercises by your training needs</p>
          </div>
          <button
            onClick={handleReset}
            className="rounded-full border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            ↺ Reset
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              label: 'Exercise Type',
              value: exerciseType,
              setter: setExerciseType,
              options: ['All', 'Resistance Training', 'Aerobic Training', 'Mobility & Balance']
            },
            {
              label: 'Muscle Group',
              value: muscleGroup,
              setter: setMuscleGroup,
              options: ['All', 'Full Body', 'Legs', 'Glutes', 'Core', 'Back', 'Chest', 'Arms', 'Shoulders']
            },
            {
              label: 'Difficulty',
              value: difficulty,
              setter: setDifficulty,
              options: ['All', 'Beginner', 'Intermediate', 'Advanced']
            },
            {
              label: 'Health Condition',
              value: healthCondition,
              setter: setHealthCondition,
              options: [
                'All',
                'Bone Density Support',
                'Muscle Mass Retention',
                'Cardiovascular Conditioning',
                'Joint & Vestibular Care'
              ]
            }
          ].map((filter) => (
            <div key={filter.label} className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-600">{filter.label}</label>
              <select
                value={filter.value}
                onChange={(e) => filter.setter(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs font-semibold text-slate-700 outline-none focus:border-blue-500"
              >
                {filter.options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </section>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {[
          { label: 'Resistance Training', icon: '🏋️' },
          { label: 'Aerobic Training', icon: '🏃' },
          { label: 'Mobility & Balance', icon: '🤸' }
        ].map((category) => (
          <button
            key={category.label}
            onClick={() => setExerciseType(
              exerciseType === category.label ? 'All' : category.label
            )}
            className={`rounded-full border px-4 py-2 text-xs font-bold transition-all ${
              exerciseType === category.label
                ? 'border-[#0A1B33] bg-[#0A1B33] text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
            }`}
          >
            {category.icon} {category.label}
          </button>
        ))}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#0A1B33]">Exercise Library</h2>
          <p className="text-xs text-slate-500">Explore your training demonstrations</p>
        </div>
        <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
          {filteredExercises.length} Exercises
        </span>
      </div>

      {/* Cards */}
      {filteredExercises.length ? (
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExercises.map((ex) => (
            <article
              key={ex.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Thumbnail */}
              <button
                type="button"
                onClick={() => openVideo(ex)}
                aria-label={`Watch ${ex.title}`}
                className="relative block aspect-video w-full overflow-hidden bg-[#0A1B33] text-left"
              >
                <img
                  src={categoryImages[ex.id]}
                  alt={`${ex.title} exercise`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#071629]/80 via-transparent to-[#071629]/10" />

                <span className="absolute left-3 top-3 rounded-md border border-white/20 bg-black/40 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
                  VIDEO GUIDE
                </span>

                <span className="absolute bottom-3 left-3 text-xs font-semibold text-white">
                  {ex.videoSource}
                </span>

                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-white/90 text-xl text-[#1D4F9C] shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white">
                    ▶
                  </span>
                </span>
              </button>

              {/* Card Content */}
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-3">
                  <span className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold ${typeStyles[ex.type]}`}>
                    {ex.type}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold text-[#0A1B33]">
                  {ex.title}
                </h3>

                <div className="mb-4 flex flex-wrap gap-1.5">
                  {ex.targets.map((target) => (
                    <span key={target} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                      {target}
                    </span>
                  ))}
                </div>

                <div className="mb-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50 p-3">
                  <div>
                    <p className="text-[10px] text-slate-500">Duration</p>
                    <p className="mt-1 text-xs font-bold text-[#0A1B33]">◷ {ex.duration}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Difficulty</p>
                    <p className="mt-1 text-xs font-bold text-[#0A1B33]">{ex.level}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Intensity</p>
                    <p className="mt-1 text-xs font-bold text-[#0A1B33]">{ex.intensity}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500">Condition</p>
                    <p className="mt-1 text-xs font-bold text-[#0A1B33]">{ex.condition}</p>
                  </div>
                </div>

                <div className="mt-auto grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveDetails(ex)}
                    className="rounded-full border border-slate-200 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    ⓘ Details
                  </button>

                  <button
                    type="button"
                    onClick={() => openVideo(ex)}
                    className="rounded-full bg-[#346E9E] py-2.5 text-xs font-bold text-white transition hover:bg-[#285880]"
                  >
                    ▶ Watch Video
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <span className="text-4xl">🔎</span>
          <h3 className="mt-3 font-bold text-[#0A1B33]">No exercises found</h3>
          <p className="mt-1 text-sm text-slate-500">Try changing your filters.</p>
          <button onClick={handleReset} className="mt-4 rounded-full bg-[#346E9E] px-5 py-2 text-xs font-bold text-white">
            Reset Filters
          </button>
        </div>
      )}

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020817]/85 p-3 backdrop-blur-sm sm:p-6"
          onClick={() => setActiveVideo(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-[#0A1B33] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-300">
                  GRAVITY EXERCISE LIBRARY
                </p>
                <h2 className="mt-1 truncate text-sm font-bold text-white sm:text-lg">
                  {activeVideo.title}
                </h2>
                <p className="mt-1 text-xs text-slate-400">{activeVideo.videoSource}</p>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-xl text-white transition hover:border-red-400 hover:bg-red-500/20 hover:text-red-300"
              >
                ×
              </button>
            </div>

            {/* Video */}
            <div className="aspect-video w-full bg-black">
              <iframe
                key={activeVideo.id}
                src={getVideoUrl(activeVideo)}
                title={activeVideo.videoTitle}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
              <div>
                <p className="text-sm font-bold text-white">{activeVideo.title}</p>
                <p className="mt-1 text-xs text-slate-400">
                  {activeVideo.duration} · {activeVideo.level}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold text-white transition hover:bg-white/10"
              >
                Close Video
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {activeDetails && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-[#020817]/75 p-4 backdrop-blur-sm"
          onClick={() => setActiveDetails(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#0A1B33] p-7 text-white">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                  Exercise Protocol
                </span>
                <button
                  onClick={() => setActiveDetails(null)}
                  className="text-2xl text-white/80 hover:text-white"
                  aria-label="Close details"
                >
                  ×
                </button>
              </div>
              <div className="mt-5 flex items-center gap-4">
                <span className="text-5xl">{activeDetails.icon}</span>
                <div>
                  <h2 className="text-xl font-bold">{activeDetails.title}</h2>
                  <p className="mt-1 text-xs text-slate-300">{activeDetails.type}</p>
                </div>
              </div>
            </div>

            <div className="space-y-5 p-6">
              <div>
                <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-[#346E9E]">
                  Exercise Instructions
                </h3>
                <p className="text-sm leading-7 text-slate-600">
                  {activeDetails.instructions}
                </p>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-bold text-slate-700">Target Muscles</h3>
                <div className="flex flex-wrap gap-2">
                  {activeDetails.targets.map((target) => (
                    <span key={target} className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800">
                      {target}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Duration</p>
                  <p className="mt-1 text-sm font-bold text-[#0A1B33]">{activeDetails.duration}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-xs text-slate-500">Difficulty</p>
                  <p className="mt-1 text-sm font-bold text-[#0A1B33]">{activeDetails.level}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openVideo(activeDetails)}
                className="w-full rounded-full bg-[#346E9E] py-3 text-sm font-bold text-white transition hover:bg-[#285880]"
              >
                ▶ Watch Demonstration
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GravityExercises;
