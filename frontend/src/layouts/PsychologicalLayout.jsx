import { NavLink, Outlet, useLocation } from 'react-router-dom';
import PageHeader from '../Components/PageHeader';
import img from '../assets/psychological-banner.jpeg';

const PsychologicalLayout = () => {
  const { pathname } = useLocation();
  const section = pathname.split('/').at(-1);
  const pages = {
    schedule: { title: 'Daily schedule', arabicTitle: 'الجدول اليومي', description: 'A proposed mission routine with time for work, movement, rest, and recovery.' },
    assessment: { title: 'Psychological assessment', arabicTitle: 'التقييم النفسي', description: 'Check in on your mood with PHQ-9, then record your sleep and wellbeing measurements.' },
    puzzles: { title: 'Cognitive puzzles', arabicTitle: 'الألغاز الذهنية', description: 'Take a focused break. Practice logic, memory, patterns, and problem solving at your own pace.' }
  };
  return (
    <div className="flex flex-col space-y-6 pb-10">
      <PageHeader
        bannerImage={img}
        compact
        tag="PSYCHOLOGICAL HEALTH"
        step="04 / 07"
        {...pages[section] || pages.schedule}
      />

      <nav aria-label="Psychological health sections" className="flex flex-wrap gap-2">
        {Object.entries(pages).map(([path, page]) => <NavLink key={path} to={`/psychological/${path}`} className={({ isActive }) => `rounded-full px-5 py-2.5 text-sm font-semibold border ${isActive ? 'bg-navy border-navy text-white' : 'bg-white border-line text-muted hover:text-primary'}`}>{page.title}</NavLink>)}
      </nav>

      <Outlet />
    </div>
  );
};

export default PsychologicalLayout;
