import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import TopHeader from '../Components/TopHeader';

const RootLayout = () => {
  const navigate = useNavigate();
  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#EDF2F9] font-sans text-[#203040]">
      <button type="button" aria-expanded={navigationOpen} aria-controls="main-navigation" onClick={() => setNavigationOpen(open => !open)} className="lg:hidden bg-navy text-white p-4 text-left font-semibold">
        {navigationOpen ? 'Close navigation' : 'Open navigation'}
      </button>
      <div id="main-navigation" className={`${navigationOpen ? 'block' : 'hidden'} lg:block`} onClick={event => { if (event.target.closest('a')) setNavigationOpen(false); }}>
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader
          astronautId="AST-0427 (demo)"
          missionDay={142}
          status="warning"
          onEmergency={() => navigate('/emergency/measurements')}
        />

        <main className="flex-1 p-4 sm:p-6 md:p-8 min-w-0">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
