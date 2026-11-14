import { useState, useEffect } from 'react';

const DailySchedule = () => {
  const scheduleItems = [
    { id: 1, start: '06:00', end: '06:30', title: 'Wake Up & Morning Health Check', category: 'Medical check', duration: '30 min' },
    { id: 2, start: '06:30', end: '07:15', title: 'Breakfast', category: 'Meal', duration: '45 min' },
    { id: 3, start: '07:15', end: '09:15', title: 'Scientific Work', category: 'Work', duration: '2 h 0 min' },
    { id: 4, start: '09:15', end: '09:30', title: 'Healthy Snack', category: 'Meal', duration: '15 min' },
    { id: 5, start: '09:30', end: '11:15', title: 'Work & Environmental Monitoring', category: 'Work', duration: '1 h 45 min' },
    { id: 6, start: '11:15', end: '12:30', title: 'Resistance Training', category: 'Exercise', duration: '1 h 15 min' },
    { id: 7, start: '12:30', end: '13:15', title: 'Lunch', category: 'Meal', duration: '45 min' },
    { id: 8, start: '13:15', end: '15:15', title: 'Scientific Work', category: 'Work', duration: '2 h 0 min' },
    { id: 9, start: '15:15', end: '15:45', title: 'Medical Assessment', category: 'Medical check', duration: '30 min' },
    { id: 10, start: '15:45', end: '17:00', title: 'Aerobic Training', category: 'Exercise', duration: '1 h 15 min' },
    { id: 11, start: '17:00', end: '17:30', title: 'Recovery & Personal Hygiene', category: 'Rest & social', duration: '30 min' },
    { id: 12, start: '17:30', end: '18:15', title: 'Dinner', category: 'Meal', duration: '45 min' },
    { id: 13, start: '18:15', end: '19:00', title: 'Relaxation & Social Communication', category: 'Rest & social', duration: '45 min' },
    { id: 14, start: '19:00', end: '20:45', title: 'Work & Daily Evaluation', category: 'Work', duration: '1 h 45 min' },
    { id: 15, start: '20:45', end: '21:30', title: 'Sleep Preparation', category: 'Rest & social', duration: '45 min' },
    { id: 16, start: '21:30', end: '06:00', title: 'Sleep', category: 'Sleep', duration: '8 h 30 min', isCurrent: true },
  ];

  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('astro_daily_schedule_completed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('astro_daily_schedule_completed', JSON.stringify(completedIds));
  }, [completedIds]);

  const toggleComplete = (id) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const completionPercentage = Math.round((completedIds.length / scheduleItems.length) * 100);

  const categoryStyles = {
    'Work': {
      card: 'bg-[#EEF5FC] border-[#C9DDF2]',
      dot: 'bg-[#2F80D1]',
    },
    'Exercise': {
      card: 'bg-[#EAF6F1] border-[#BCE0D0]',
      dot: 'bg-[#12805D]',
    },
    'Meal': {
      card: 'bg-[#FDF5E7] border-[#F2DCBA]',
      dot: 'bg-[#E59A24]',
    },
    'Medical check': {
      card: 'bg-[#FBECEC] border-[#F0C7C7]',
      dot: 'bg-[#DC2626]',
    },
    'Rest & social': {
      card: 'bg-[#F3EFFB] border-[#D8CEEE]',
      dot: 'bg-[#7C3AED]',
    },
    'Sleep': {
      card: 'bg-[#EBF0F5] border-[#C2D0DF]',
      dot: 'bg-[#475569]',
    },
  };

  const categoriesList = ['Work', 'Exercise', 'Meal', 'Medical check', 'Rest & social', 'Sleep'];

  return (
    <div className="flex flex-col space-y-6">
      {/* 1. Top 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {/* Current Activity */}
        <div className="rounded-2xl border-2 border-[#2F80D1] bg-white p-4 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-medium text-[#566678]">Current activity</span>
          <div className="mt-2">
            <h3 className="text-lg font-bold text-[#0A1B33]">Sleep</h3>
            <p className="text-xs font-mono text-[#566678] mt-0.5">21:30 – 06:00</p>
          </div>
        </div>

        {/* Next Activity */}
        <div className="rounded-2xl border border-gray-300 bg-white p-4 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-medium text-[#566678]">Next activity</span>
          <div className="mt-2">
            <h3 className="text-base font-bold text-[#0A1B33] leading-snug">
              Wake Up & Morning Health Check
            </h3>
            <p className="text-xs font-mono text-[#566678] mt-0.5">at 06:00</p>
          </div>
        </div>

        {/* Remaining in current activity */}
        <div className="rounded-2xl border border-gray-300 bg-white p-4 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-medium text-[#566678]">Remaining in current activity</span>
          <div className="mt-2">
            <div className="text-2xl font-bold text-[#0A1B33] font-mono">
              6 h 19 min
            </div>
          </div>
        </div>

        {/* Daily Completion */}
        <div className="rounded-2xl border border-gray-300 bg-white p-4 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-medium text-[#566678]">Daily completion</span>
          <div className="mt-2 space-y-2">
            <div className="text-2xl font-bold text-[#0A1B33] font-mono">
              {completionPercentage}%
            </div>
            <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#12805D] transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-[11px] text-[#566678]">
              {completedIds.length} of {scheduleItems.length} activities marked complete
            </p>
          </div>
        </div>
      </div>

      {/* 2. Category Filter / Legend Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categoriesList.map((cat) => (
          <span
            key={cat}
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-3.5 py-1 text-xs font-medium text-[#203040]"
          >
            <span className={`h-2 w-2 rounded-full ${categoryStyles[cat].dot}`}></span>
            <span>{cat}</span>
          </span>
        ))}
      </div>

      {/* 3. Timeline List */}
      <div className="flex flex-col space-y-2.5">
        {scheduleItems.map((item) => {
          const isCompleted = completedIds.includes(item.id);
          const style = categoryStyles[item.category];

          return (
            <div key={item.id} className="relative">
              {/* NOW Red Badge above current item */}
              {item.isCurrent && (
                <div className="flex justify-center -mb-2.5 relative z-10">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#A63A3A] text-white px-3 py-0.5 text-[11px] font-mono font-bold shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                    <span>NOW 23:41</span>
                  </span>
                </div>
              )}

              <div
                className={`rounded-2xl border px-4 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all ${style.card
                  } ${item.isCurrent ? 'ring-2 ring-[#2F80D1] shadow-sm' : ''}`}
              >
                <div className="flex items-start sm:items-center gap-4 md:gap-6">
                  {/* Time Column */}
                  <div className="font-mono text-xs font-bold text-[#0A1B33] w-14 shrink-0 leading-tight">
                    <div>{item.start} –</div>
                    <div>{item.end}</div>
                  </div>

                  {/* Activity Details */}
                  <div>
                    <h4
                      className={`font-bold text-sm md:text-base text-[#0A1B33] ${isCompleted ? 'line-through opacity-60' : ''
                        }`}
                    >
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#566678] mt-0.5">
                      {item.category} · {item.duration} ·{' '}
                      {isCompleted
                        ? 'Completed'
                        : item.isCurrent
                          ? 'In progress'
                          : 'Time passed — not marked'}
                    </p>
                  </div>
                </div>

                {/* Mark Complete Button */}
                <button
                  type="button"
                  onClick={() => toggleComplete(item.id)}
                  className={`self-start sm:self-center inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors cursor-pointer shrink-0 ${isCompleted
                      ? 'bg-[#12805D] border-[#12805D] text-white'
                      : 'bg-white border-gray-300 text-[#203040] hover:bg-gray-50'
                    }`}
                >
                  <span>{isCompleted ? '✓' : '○'}</span>
                  <span>{isCompleted ? 'Completed' : 'Mark complete'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <p className="text-xs text-[#566678] flex items-center gap-1.5 pt-1">
        <span>ⓘ</span>
        <span>Completion states are stored on this device only. Timeline covers 24 hours.</span>
      </p>
    </div>
  );
};

export default DailySchedule;