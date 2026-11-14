import { useState, useMemo } from 'react';

const GravityExercises = () => {
  const [exerciseType, setExerciseType] = useState('All');
  const [muscleGroup, setMuscleGroup] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [healthCondition, setHealthCondition] = useState('All');
  const [activeModal, setActiveModal] = useState(null); // { type: 'details' | 'video', exercise }

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
      bgColor: 'bg-[#3A2E6E]',
      icon: '🏋️',
      instructions: 'Perform using the Advanced Resistive Exercise Device (ARED) with shoulder harness engaged and neutral lumbar spine alignment.',
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
      bgColor: 'bg-[#3A2E6E]',
      icon: '🏋️‍♂️',
      instructions: 'Hinge at the hips while maintaining constant ARED vacuum cylinder tension; focus on posterior chain loading.',
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
      bgColor: 'bg-[#3A2E6E]',
      icon: '💪',
      instructions: 'Secure torso restraint strap to the ARED bench and press handles smoothly through full range of motion.',
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
      bgColor: 'bg-[#3A2E6E]',
      icon: '〰️',
      instructions: 'Anchor elastic bungee cords to deck handrails for controlled upper and lower body tension sets.',
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
      bgColor: 'bg-[#3A2E6E]',
      icon: '🦵',
      instructions: 'Targeted calf raises, leg presses, and hip abduction movements to counteract lower-limb unloading.',
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
      bgColor: 'bg-[#3A2E6E]',
      icon: '🦾',
      instructions: 'Upright rows, bicep curls, and overhead presses calibrated for microgravity postural stability.',
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
      bgColor: 'bg-[#1D6B57]',
      icon: '🏃',
      instructions: 'Attach subject loading bungees at 70–85% body weight equivalent on T2 treadmill to provide impact loading.',
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
      bgColor: 'bg-[#1D6B57]',
      icon: '🚴',
      instructions: 'Clip cycling shoes into CEVIS pedals and engage waist belt; maintain steady 75–85 RPM cadence.',
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
      bgColor: 'bg-[#1D6B57]',
      icon: '❤️',
      instructions: 'High-intensity interval protocol alternating 3-minute aerobic surges with 2-minute active recovery.',
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
      bgColor: 'bg-[#295A7A]',
      icon: '🤸',
      instructions: 'Controlled spinal decompression rotations, thoracic extensions, and multi-planar joint mobility drills.',
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
      bgColor: 'bg-[#295A7A]',
      icon: '🎯',
      instructions: 'Proprioceptive hand-eye and spatial orientation tasks designed to support neurovestibular adaptation.',
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
      bgColor: 'bg-[#295A7A]',
      icon: '⚖️',
      instructions: 'Single-leg stabilization and dynamic posture recovery drills in preparation for planetary gravity re-entry.',
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
      bgColor: 'bg-[#295A7A]',
      icon: '🧘',
      instructions: 'Post-workout static flexibility routine targeting hamstrings, hip flexors, and paraspinal muscles.',
    },
  ];

  const handleReset = () => {
    setExerciseType('All');
    setMuscleGroup('All');
    setDifficulty('All');
    setHealthCondition('All');
  };

  const filteredExercises = useMemo(() => {
    return exercises.filter((ex) => {
      const matchType = exerciseType === 'All' || ex.type === exerciseType;
      const matchMuscle = muscleGroup === 'All' || ex.targets.includes(muscleGroup);
      const matchDifficulty = difficulty === 'All' || ex.level === difficulty;
      const matchCondition = healthCondition === 'All' || ex.condition === healthCondition;
      return matchType && matchMuscle && matchDifficulty && matchCondition;
    });
  }, [exerciseType, muscleGroup, difficulty, healthCondition]);

  const typeBadgeStyles = {
    'Resistance Training': 'bg-purple-50 text-[#3A2E6E] border-purple-200',
    'Aerobic Training': 'bg-emerald-50 text-[#1D6B57] border-emerald-200',
    'Mobility & Balance': 'bg-sky-50 text-[#295A7A] border-sky-200',
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* 1. Illustrative Warning Notice */}
      <div className="rounded-2xl border border-amber-300 bg-amber-50/70 p-4 flex items-start gap-3 text-xs md:text-sm text-amber-950 leading-relaxed">
        <span className="text-amber-600 text-base shrink-0">⚠️</span>
        <p>
          Exercises here are illustrative. Programmes are not personalised to you — follow the exercise prescription set by your flight surgeon and exercise specialist.
        </p>
      </div>

      {/* 2. Filter Bar Card */}
      <div className="rounded-3xl border border-gray-300 bg-white p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {/* Exercise Type */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-[#203040]">Exercise Type</label>
            <select
              value={exerciseType}
              onChange={(e) => setExerciseType(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-medium text-gray-900 focus:border-[#1D4F9C] focus:outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Resistance Training">Resistance Training</option>
              <option value="Aerobic Training">Aerobic Training</option>
              <option value="Mobility & Balance">Mobility & Balance</option>
            </select>
          </div>

          {/* Muscle Group */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-[#203040]">Muscle Group</label>
            <select
              value={muscleGroup}
              onChange={(e) => setMuscleGroup(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-medium text-gray-900 focus:border-[#1D4F9C] focus:outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Full Body">Full Body</option>
              <option value="Legs">Legs</option>
              <option value="Glutes">Glutes</option>
              <option value="Core">Core</option>
              <option value="Back">Back</option>
              <option value="Chest">Chest</option>
              <option value="Arms">Arms</option>
              <option value="Shoulders">Shoulders</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-[#203040]">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-medium text-gray-900 focus:border-[#1D4F9C] focus:outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Health Condition */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-[#203040]">Health Condition</label>
            <select
              value={healthCondition}
              onChange={(e) => setHealthCondition(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-medium text-gray-900 focus:border-[#1D4F9C] focus:outline-none cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Bone Density Support">Bone Density Support</option>
              <option value="Muscle Mass Retention">Muscle Mass Retention</option>
              <option value="Cardiovascular Conditioning">Cardiovascular Conditioning</option>
              <option value="Joint & Vestibular Care">Joint & Vestibular Care</option>
            </select>
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 px-3.5 py-1 text-xs font-semibold text-[#203040] transition-colors cursor-pointer"
          >
            <span>↺</span>
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* 3. Quick Category Toggle Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { label: 'Resistance Training', icon: '🏋️', color: 'text-[#3A2E6E] border-purple-300 bg-purple-50/70' },
          { label: 'Aerobic Training', icon: '🏃', color: 'text-[#1D6B57] border-emerald-300 bg-emerald-50/70' },
          { label: 'Mobility & Balance', icon: '🤸', color: 'text-[#295A7A] border-sky-300 bg-sky-50/70' },
        ].map((cat) => {
          const isSelected = exerciseType === cat.label;
          return (
            <button
              key={cat.label}
              type="button"
              onClick={() => setExerciseType(isSelected ? 'All' : cat.label)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${isSelected ? `${cat.color} ring-2 ring-offset-1 ring-[#0A1B33]` : `${cat.color} opacity-90 hover:opacity-100`
                }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Exercises Cards Grid (Equal height, 3-4 columns on large screens) */}
      {filteredExercises.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
          {filteredExercises.map((ex) => (
            <div
              key={ex.id}
              className="rounded-3xl border border-gray-300 bg-white shadow-sm overflow-hidden flex flex-col h-full"
            >
              {/* Top Colored Thumbnail */}
              <div className={`relative h-32 ${ex.bgColor} flex items-center justify-center shrink-0`}>
                <span className="absolute top-3 left-3 rounded-md bg-black/40 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                  ILLUSTRATIVE GUIDE
                </span>
                <span className="text-3xl text-white/90">{ex.icon}</span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${typeBadgeStyles[ex.type]
                      }`}
                  >
                    {ex.type}
                  </span>

                  <h3 className="font-bold text-base text-[#0A1B33] leading-snug">
                    {ex.title}
                  </h3>

                  {/* Specs Table */}
                  <div className="space-y-1.5 pt-1 text-xs">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[#566678] shrink-0">Target</span>
                      <div className="flex flex-wrap justify-end gap-1">
                        {ex.targets.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-[#EDF2F9] px-2 py-0.5 text-[10px] font-semibold text-[#203040]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#566678]">Duration</span>
                      <span className="font-bold text-[#0A1B33]">{ex.duration}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#566678]">Intensity</span>
                      <span className="font-bold text-[#0A1B33] inline-flex items-center gap-1">
                        <span
                          className={`h-2 w-2 rounded-full ${ex.intensity === 'High'
                              ? 'bg-red-500'
                              : ex.intensity === 'Moderate'
                                ? 'bg-amber-500'
                                : 'bg-emerald-500'
                            }`}
                        ></span>
                        {ex.intensity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#566678]">Level</span>
                      <span className="font-bold text-[#0A1B33]">{ex.level}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2 mt-auto">
                  <button
                    type="button"
                    onClick={() => setActiveModal({ type: 'details', exercise: ex })}
                    className="bg-[#346E9E] hover:bg-[#285880] text-white font-semibold text-xs py-2 px-3 rounded-full inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>ⓘ</span>
                    <span>Details</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModal({ type: 'video', exercise: ex })}
                    className="border border-gray-300 hover:bg-gray-50 text-[#203040] font-semibold text-xs py-2 px-2.5 rounded-full inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>▷</span>
                    <span>Demo</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-gray-300 bg-white p-8 text-center text-sm text-[#566678]">
          No exercises match the selected filter criteria. Click Reset to view all programs.
        </div>
      )}

      {/* Details / Demonstration Modal */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white border border-gray-300 overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-44 ${activeModal.exercise.bgColor} flex flex-col items-center justify-center text-white space-y-2`}>
              <span className="text-4xl">{activeModal.exercise.icon}</span>
              <span className="rounded-full bg-black/40 px-3 py-1 text-[11px] font-mono uppercase">
                {activeModal.type === 'video' ? 'ILLUSTRATIVE DEMONSTRATION' : 'EXERCISE PROTOCOL DETAILS'}
              </span>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1D4F9C]">
                  {activeModal.exercise.type} · {activeModal.exercise.duration}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="text-sm font-bold text-gray-500 hover:text-gray-900 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <h3 className="text-xl font-bold text-[#0A1B33]">
                {activeModal.exercise.title}
              </h3>

              <p className="text-sm text-[#203040] leading-relaxed">
                {activeModal.exercise.instructions}
              </p>

              <div className="pt-2 flex flex-wrap gap-1.5">
                {activeModal.exercise.targets.map((target) => (
                  <span
                    key={target}
                    className="rounded-full bg-[#EDF2F9] px-3 py-1 text-xs font-semibold text-[#0A1B33]"
                  >
                    Target: {target}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GravityExercises;