import { Outlet } from 'react-router-dom';
import PageHeader from '../Components/PageHeader';

const EmergencyLayout = () => {
  return (
    <div className="flex flex-col space-y-6 pb-10">
      <PageHeader
        bannerImage="/images/emergency-banner.jpg"
        tag="EMERGENCY"
        step="03 / 07"
        title="Emergency"
        arabicTitle="الطوارئ"
        description="Emergency tests & measurements. A critical value raises an immediate alert and protocol instructions — it never waits for the AI analysis, and the AI is never the only decision-maker."
      />

      <Outlet />
    </div>
  );
};

export default EmergencyLayout;