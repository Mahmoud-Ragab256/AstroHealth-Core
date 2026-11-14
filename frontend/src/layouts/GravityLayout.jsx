import { Outlet } from 'react-router-dom';
import PageHeader from '../Components/PageHeader';
import img from '../assets/gravity-banner.jpeg';

const GravityLayout = () => {
  return (
    <div className="flex flex-col space-y-6 pb-10">
      <PageHeader
        bannerImage={img}
        tag="GRAVITY EFFECTS"
        step="05 / 07"
        title="Gravity Effects"
        arabicTitle="تأثيرات الجاذبية"
        description="Assessment & Decision — evaluate bone, muscle and cardiovascular health during microgravity exposure."
      />

      <Outlet />
    </div>
  );
};

export default GravityLayout;