import { Outlet } from 'react-router-dom';
import PageHeader from '../Components/PageHeader';
import img from '../assets/psychological-banner.jpeg';

const PsychologicalLayout = () => {
  return (
    <div className="flex flex-col space-y-6 pb-10">
      <PageHeader
        bannerImage={img}
        tag="PSYCHOLOGICAL HEALTH"
        step="04 / 07"
        title="Daily Schedule"
        arabicTitle="الجدول اليومي"
        description="A proposed 24-hour mission routine. This is an example schedule, not a mandatory or NASA-approved protocol."
      />

      <Outlet />
    </div>
  );
};

export default PsychologicalLayout;