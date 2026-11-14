import { Outlet } from 'react-router-dom';
import PageHeader from '../Components/PageHeader';
import img from '../assets/nutrition-banner.jpeg';

const NutritionLayout = () => {
  return (
    <div className={img}>
      <PageHeader
        bannerImage={img}
        tag="NUTRITION & RESPIRATION"
        step="06 / 07"
        title="Nutrition & Respiration"
        arabicTitle="التغذية والتنفس"
        description="Nutrition assessment — monitor immune efficiency, nutritional status and blood gases."
      />

      <Outlet />
    </div>
  );
};

export default NutritionLayout;