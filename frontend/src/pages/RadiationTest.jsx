
import { useState } from 'react';
import PageHeader from '../Components/PageHeader';
import AssessmentSectionCard from '../Components/AssessmentSectionCard';
import img from '../assets/radiation-banner.jpeg';

const API_URL = 'http://localhost:5000/api/radiation';
const RadiationTest = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (fieldName, newValue) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  };

  const steps = ['Measure', 'Validate', 'AI Analysis', 'Report'];

  // A. Radiation Dose
  const radiationDoseInputs = [
    {
      name: 'absorbedDose',
      label: 'Absorbed Dose',
      unit: 'Gy',
      type: 'number',
      required: true,
    },
    {
      name: 'equivalentDose',
      label: 'Equivalent Dose',
      unit: 'Sv',
      type: 'number',
      required: true,
    },
    {
      name: 'effectiveDose',
      label: 'Effective Dose',
      unit: 'Sv',
      type: 'number',
      required: false,
    },
    {
      name: 'cumulativeRadiationDose',
      label: 'Cumulative Radiation Dose',
      unit: 'Sv',
      type: 'number',
      required: true,
    },
  ];

  // B. Complete Blood Count
  const cbcInputs = [
    {
      name: 'wbc',
      label: 'WBC',
      unit: 'cells/µL',
      type: 'number',
      required: true,
    },
    {
      name: 'neutrophilsAbsolute',
      label: 'Neutrophils (absolute)',
      unit: 'cells/µL',
      type: 'number',
      required: true,
    },
    {
      name: 'lymphocytesAbsolute',
      label: 'Lymphocytes (absolute)',
      unit: 'cells/µL',
      type: 'number',
      required: true,
    },
    {
      name: 'monocytesAbsolute',
      label: 'Monocytes (absolute)',
      unit: 'cells/µL',
      type: 'number',
      required: true,
    },
    {
      name: 'eosinophilsAbsolute',
      label: 'Eosinophils (absolute)',
      unit: 'cells/µL',
      type: 'number',
      required: true,
    },
    {
      name: 'basophilsAbsolute',
      label: 'Basophils (absolute)',
      unit: 'cells/µL',
      type: 'number',
      required: true,
    },
  ];

  // C. DNA Damage Biomarkers
  const dnaBiomarkersInputs = [
    {
      name: 'gammaH2AX',
      label: 'γ-H2AX',
      placeholder: 'Enter γ-H2AX measurement',
      required: true,
    },
    {
      name: 'cometAssay',
      label: 'Comet Assay',
      placeholder: 'Enter Comet Assay result',
      required: true,
    },
    {
      name: 'micronucleusAssay',
      label: 'Micronucleus Assay',
      placeholder: 'Enter Micronucleus Assay result',
      required: true,
    },
  ];

  // D. Additional Information
  const additionalInputs = [
    {
      name: 'radiationType',
      label: 'Radiation Type',
      type: 'select',
      placeholder: 'Select Radiation Type',
      options: [
        'Gamma / X-Ray',
        'Galactic Cosmic Rays (GCR)',
        'Solar Particle Event (SPE)',
        'Neutron',
      ],
      required: true,
    },
    {
      name: 'exposureDuration',
      label: 'Exposure Duration',
      unit: 'hours',
      type: 'number',
      required: true,
    },
  ];

  
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  const numericFields = [
    'absorbedDose',
    'equivalentDose',
    'effectiveDose',
    'cumulativeRadiationDose',
    'wbc',
    'neutrophilsAbsolute',
    'lymphocytesAbsolute',
    'monocytesAbsolute',
    'eosinophilsAbsolute',
    'basophilsAbsolute',
    'exposureDuration',
  ];

  const measurements = { ...formValues };

  numericFields.forEach((field) => {
    if (
      measurements[field] === '' ||
      measurements[field] === undefined
    ) {
      measurements[field] = null;
    } else {
      measurements[field] = Number(measurements[field]);
    }
  });

  try {
    const response = await fetch(
      'http://localhost:5000/api/radiation',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...measurements,
          submittedAt: new Date().toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to submit radiation measurements');
    }

    const savedData = await response.json();

    console.log('Saved Radiation Measurements:', savedData);

    setMessage('Radiation measurements submitted successfully!');
    setActiveStep(1);

  } catch (error) {
    console.error('Submission Error:', error);
    setMessage('Failed to submit measurements. Please try again.');

  } finally {
    setLoading(false);
  }
};


  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col space-y-6 pb-10"
    >
      <PageHeader
        bannerImage={img}
        tag="RADIATION TEST"
        step="02 / 07"
        title="Radiation Test"
        arabicTitle="اختبار الإشعاع"
        description="Assess radiation-related health risk using radiation dose, blood cell counts and DNA damage biomarkers."
      />

      {/* Stepper */}
      <div className="rounded-2xl bg-white border border-gray-300 shadow-sm px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <button
              key={step}
              type="button"
              onClick={() => setActiveStep(index)}
              className="inline-flex items-center gap-2.5 cursor-pointer"
            >
              <span
                className={`h-7 w-7 rounded-full inline-flex items-center justify-center text-xs font-bold ${
                  isActive || isCompleted
                    ? 'bg-[#0A1B33] text-white'
                    : 'bg-gray-100 text-gray-500 border border-gray-300'
                }`}
              >
                {isCompleted ? '✓' : index + 1}
              </span>

              <span
                className={`text-sm font-bold ${
                  isActive ? 'text-[#0A1B33]' : 'text-gray-500'
                }`}
              >
                {step}
              </span>
            </button>
          );
        })}
      </div>

      {/* A. Radiation Dose */}
      <AssessmentSectionCard
        title="A. Radiation Dose"
        arabicTitle="جرعة الإشعاع"
        infoText="Enter absorbed, equivalent, effective and cumulative radiation dose measurements as reported by the dosimeter."
        inputs={radiationDoseInputs}
        values={formValues}
        onChange={handleInputChange}
      />

      {/* B. CBC */}
      <AssessmentSectionCard
        title="B. White Blood Cell Count (CBC)"
        arabicTitle="تعداد خلايا الدم البيضاء"
        infoText="Enter the total WBC count and absolute counts of the five main white blood cell types."
        inputs={cbcInputs}
        values={formValues}
        onChange={handleInputChange}
      />

      {/* C. DNA Biomarkers */}
      <AssessmentSectionCard
        title="C. DNA Damage Biomarkers"
        arabicTitle="مؤشرات تلف الحمض النووي"
        infoText="Enter the available laboratory measurements for the three DNA damage biomarkers."
        inputs={dnaBiomarkersInputs}
        values={formValues}
        onChange={handleInputChange}
      />

      {/* D. Additional Information */}
      <AssessmentSectionCard
        title="D. Additional Information"
        arabicTitle="معلومات إضافية"
        infoText="Specify the radiation type and total exposure duration."
        inputs={additionalInputs}
        values={formValues}
        onChange={handleInputChange}
      />

      {/* Submit */}
      <div className="space-y-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1D4F9C] hover:bg-[#173F7D] disabled:opacity-60 text-white font-semibold text-base px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-colors cursor-pointer shadow-sm"
        >
          <span>➤</span>
          <span>
            {loading ? 'Submitting...' : 'Submit Measurements'}
          </span>
        </button>

        {message && (
          <p
            className={`text-sm font-medium ${
              message.includes('successfully')
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {message}
          </p>
        )}

        <p className="text-xs text-[#566678]">
          Fields marked * are required. Measurements are sent to the backend API.
        </p>
      </div>
    </form>
  );
};

export default RadiationTest;
