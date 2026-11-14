import { Outlet } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#EDF2F9] font-sans text-[#203040]">
      <Sidebar />

      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;