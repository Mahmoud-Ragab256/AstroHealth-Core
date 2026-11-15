import AssessmentForm from '../Components/AssessmentForm';
import PageHeader from '../Components/PageHeader';
import img from '../assets/radiation-banner.jpeg';

export default function RadiationTest() {
  return <div className="space-y-6">
    <PageHeader bannerImage={img} tag="RADIATION TEST" step="02 / 07" title="Radiation Test" arabicTitle="?????? ???????" description="Enter radiation dose, blood cell counts and DNA damage measurements for analysis." />
    <AssessmentForm type="radiation" title="Radiation measurements" />
  </div>;
}
