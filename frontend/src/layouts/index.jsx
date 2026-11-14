import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import TopHeader from '../Components/TopHeader';

const RootLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-[#EDF2F9] font-sans text-[#203040]">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader
          astronautId="AST-0427 (demo)"
          missionDay={142}
          status="warning"
          onEmergency={() => navigate('/emergency/measurements')}
        />

        <main className="flex-1 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default RootLayout;