import { useState, useEffect } from 'react';

const TopHeader = ({
  badgeText = 'Demonstration data',
  astronautId = 'AST-0427 (demo)',
  missionDay = 142,
  status = 'warning',
  onEmergency,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    const savedStartTime = localStorage.getItem('ship_timer_start');
    if (savedStartTime) {
      return Math.floor((Date.now() - Number(savedStartTime)) / 1000);
    }
    const now = Date.now();
    localStorage.setItem('ship_timer_start', String(now));
    return 0;
  });

  useEffect(() => {
    const startTime = Number(localStorage.getItem('ship_timer_start')) || Date.now();

    const timer = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(elapsedSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(elapsedSeconds % 60).padStart(2, '0');

  const statusBadgeClass =
    status === 'normal'
      ? 'bg-green-100 border-green-500 text-green-800'
      : status === 'critical'
        ? 'bg-red-100 border-red-500 text-red-800'
        : status === 'warning'
          ? 'bg-amber-50 border-amber-500 text-amber-800'
          : 'bg-gray-100 border-gray-400 text-gray-800';

  return (
    <header className="w-full bg-white border-b border-[#D8E0E7] px-6 md:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
      {/* Left Side: Ship Time & Demonstration Badge */}
      <div className="flex items-center gap-5">
        <div>
          <div className="font-mono font-bold text-[#0A1B33] text-3xl leading-none tracking-tight">
            {hours}:{minutes}
            <span className="text-xl text-[#566678]">:{seconds}</span>
          </div>
          <div className="text-sm text-[#566678] mt-1">
            Ship time (local)
          </div>
        </div>

        {badgeText && (
          <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-[#2F80D1] bg-[#EDF2F9] px-4 py-1.5 text-sm font-medium text-[#1D4F9C]">
            <span>🧪</span>
            <span>{badgeText}</span>
          </div>
        )}
      </div>

      {/* Right Side: Astronaut Info, Status Badge & Emergency Button */}
      <div className="flex items-center gap-4 md:gap-5">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-[#EDF2F9] text-[#1D4F9C] flex items-center justify-center text-xl shrink-0">
            👤
          </div>

          <div>
            <div className="font-bold text-[#0A1B33] text-base leading-snug">
              {astronautId}
            </div>
            <div className="text-sm text-[#566678]">
              Mission day {missionDay}
            </div>
          </div>
        </div>

        <div
          className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-bold uppercase ${statusBadgeClass}`}
        >
          <span>⚠</span>
          <span>{status}</span>
        </div>

        <button
          type="button"
          onClick={onEmergency}
          className="bg-[#A63A3A] hover:bg-[#8E2F2F] text-white font-semibold text-base px-5 py-2.5 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <span>🚨</span>
          <span>Emergency</span>
        </button>
      </div>
    </header>
  );
};

export default TopHeader;