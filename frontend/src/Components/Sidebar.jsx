import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({
    emergency: true,
    psychological: true,
    gravity: true,
    nutrition: true,
  });

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const navItems = [
    {
      label: 'Dashboard',
      arabic: 'الرئيسية',
      path: '/dashboard',
    },
    {
      label: 'Radiation test',
      arabic: 'اختبار الإشعاع',
      path: '/radiation-test',
    },
    {
      key: 'emergency',
      label: 'Emergency',
      arabic: 'الطوارئ',
      children: [
        { label: 'Measurements', arabic: 'القياسات', path: '/emergency/measurements' },
        { label: 'Videos', arabic: 'الفيديوهات', path: '/emergency/videos' },
      ],
    },
    {
      key: 'psychological',
      label: 'Psychological health',
      arabic: 'الصحة النفسية',
      children: [
        { label: 'Daily schedule', arabic: 'الجدول اليومي', path: '/psychological/schedule' },
        { label: 'Assessment', arabic: 'الاختبار النفسي', path: '/psychological/assessment' },
        { label: 'Puzzles', arabic: 'الألغاز', path: '/psychological/puzzles' },
      ],
    },
    {
      key: 'gravity',
      label: 'Gravity effects',
      arabic: 'تأثيرات الجاذبية',
      children: [
        { label: 'Assessment & decision', arabic: 'الاختبار والقرار', path: '/gravity/assessment' },
        { label: 'Exercises', arabic: 'التمارين', path: '/gravity/exercises' },
      ],
    },
    {
      key: 'nutrition',
      label: 'Nutrition & respiration',
      arabic: 'التغذية والتنفس',
      children: [
        { label: 'Nutrition', arabic: 'التغذية', path: '/nutrition/assessment' },
        { label: 'Respiration', arabic: 'التنفس', path: '/nutrition/respiration' },
      ],
    },
    {
      label: 'History & reports',
      arabic: 'التاريخ والتقارير',
      path: '/reports',
    },
  ];

  const getLinkClass = ({ isActive }) =>
    `block rounded-2xl px-5 py-3 transition-colors ${
      isActive
        ? 'bg-[#1D4F9C] text-white'
        : 'text-white hover:bg-white/5'
    }`;

  return (
    <aside className="w-72 shrink-0 bg-[#0A1B33] text-white h-screen sticky top-0 p-5 flex flex-col select-none">
      {/* Header / Brand */}
      <div className="px-3 pt-2 pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          AstroHealth Core
        </h1>
        <p className="text-xs font-medium text-gray-400 mt-1">
          Demonstration build
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto custom-scrollbar pr-2">
        {navItems.map((item) => {
          if (item.children) {
            const isOpen = openMenus[item.key];

            return (
              <div key={item.key} className="pt-1.5">
                <button
                  type="button"
                  onClick={() => toggleMenu(item.key)}
                  className="w-full flex items-center justify-between px-5 py-2.5 text-left rounded-2xl hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <div>
                    <div className="text-base font-medium text-white leading-snug">
                      {item.label}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">
                      {item.arabic}
                    </div>
                  </div>

                  <span className="text-[10px] text-white/80">
                    {isOpen ? '▲' : '▼'}
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-1.5 ml-5 pl-4 border-l-2 border-white/15 space-y-1.5">
                    {item.children.map((sub) => (
                      <NavLink
                        key={sub.path}
                        to={sub.path}
                        className={getLinkClass}
                      >
                        <div className="text-base font-medium leading-snug">
                          {sub.label}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {sub.arabic}
                        </div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={getLinkClass}
            >
              {({ isActive }) => (
                <>
                  <div className={`text-base leading-snug ${isActive ? 'font-bold' : 'font-medium'}`}>
                    {item.label}
                  </div>
                  <div className={`text-xs mt-0.5 ${isActive ? 'text-white/90' : 'text-gray-400'}`}>
                    {item.arabic}
                  </div>
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;