import { useState } from 'react';
import PageHeader from '../Components/PageHeader';
import AssessmentSectionCard from '../Components/AssessmentSectionCard';
import img from '../assets/radiation-banner.jpeg';

const RadiationTest = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (fieldName, newValue) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Radiation Measurements:', formValues);
    setActiveStep(1);
  };

  const steps = ['Measure', 'Validate', 'AI Analysis', 'Report'];

  const radiationDoseInputs = [
    {
      name: 'absorbedDose',
      label: 'Absorbed Dose',
      unit: 'Gy',
      required: true,
    },
    {
      name: 'equivalentDose',
      label: 'Equivalent Dose',
      unit: 'Sv',
      required: true,
    },
    {
      name: 'effectiveDose',
      label: 'Effective Dose (when available)',
      unit: 'Sv',
      required: false,
    },
    {
      name: 'radiationType',
      label: 'Radiation Type',
      type: 'select',
      placeholder: 'Select',
      options: ['Gamma / X-Ray', 'Galactic Cosmic Rays (GCR)', 'Solar Particle Event (SPE)', 'Neutron'],
      required: true,
    },
    {
      name: 'exposureDuration',
      label: 'Exposure Duration',
      unit: 'hours',
      required: true,
    },
    {
      name: 'cumulativeExposure',
      label: 'Cumulative Radiation Exposure',
      unit: 'Sv',
      required: true,
    },
  ];

  const cbcInputs = [
    {
      name: 'totalWbc',
      label: 'Total WBC',
      unit: 'cells/µL',
      required: true,
      hasMultipleCases: true,
      refRange: '4,500–11,000 cells/µL',
    },
    {
      name: 'neutrophils',
      label: 'Neutrophils',
      unit: 'cells/µL',
      required: true,
      hasMultipleCases: true,
      refRange: '1,800–7,700 cells/µL',
    },
    {
      name: 'lymphocytes',
      label: 'Lymphocytes',
      unit: 'cells/µL',
      required: true,
      hasMultipleCases: true,
      refRange: '1,000–4,800 cells/µL',
    },
    {
      name: 'monocytes',
      label: 'Monocytes',
      unit: 'cells/µL',
      required: true,
      hasMultipleCases: true,
      refRange: '200–800 cells/µL',
    },
    {
      name: 'eosinophils',
      label: 'Eosinophils',
      unit: 'cells/µL',
      required: true,
      hasMultipleCases: true,
      refRange: '0–500 cells/µL',
    },
    {
      name: 'basophils',
      label: 'Basophils',
      unit: 'cells/µL',
      required: true,
      hasMultipleCases: true,
      refRange: '0–200 cells/µL',
    },
  ];

  const dnaBiomarkersInputs = [
    // γ-H2AX
    {
      name: 'yh2axMeasurement',
      label: 'γ-H2AX — Measurement',
      required: true,
    },
    {
      name: 'yh2axUnit',
      label: 'γ-H2AX — Unit / Scoring Method',
      placeholder: 'e.g. foci/cell, % tail DNA, MN/1000 BN',
      required: true,
    },
    {
      name: 'yh2axRef',
      label: 'γ-H2AX — Lab Reference (if provided)',
      placeholder: 'As stated by the laboratory',
      required: false,
    },
    {
      name: 'yh2axDate',
      label: 'γ-H2AX — Test Date',
      type: 'date',
      required: true,
    },
    {
      name: 'yh2axSource',
      label: 'γ-H2AX — Laboratory Source',
      placeholder: 'Laboratory / instrument name',
      required: true,
    },

    // Comet Assay
    {
      name: 'cometMeasurement',
      label: 'Comet Assay — Measurement',
      required: true,
    },
    {
      name: 'cometUnit',
      label: 'Comet Assay — Unit / Scoring Method',
      placeholder: 'e.g. foci/cell, % tail DNA, MN/1000 BN',
      required: true,
    },
    {
      name: 'cometRef',
      label: 'Comet Assay — Lab Reference (if provided)',
      placeholder: 'As stated by the laboratory',
      required: false,
    },
    {
      name: 'cometDate',
      label: 'Comet Assay — Test Date',
      type: 'date',
      required: true,
    },
    {
      name: 'cometSource',
      label: 'Comet Assay — Laboratory Source',
      placeholder: 'Laboratory / instrument name',
      required: true,
    },

    // Micronucleus Assay
    {
      name: 'micronucleusMeasurement',
      label: 'Micronucleus Assay — Measurement',
      required: true,
    },
    {
      name: 'micronucleusUnit',
      label: 'Micronucleus Assay — Unit / Scoring Method',
      placeholder: 'e.g. foci/cell, % tail DNA, MN/1000 BN',
      required: true,
    },
    {
      name: 'micronucleusRef',
      label: 'Micronucleus Assay — Lab Reference (if provided)',
      placeholder: 'As stated by the laboratory',
      required: false,
    },
    {
      name: 'micronucleusDate',
      label: 'Micronucleus Assay — Test Date',
      type: 'date',
      required: true,
    },
    {
      name: 'micronucleusSource',
      label: 'Micronucleus Assay — Laboratory Source',
      placeholder: 'Laboratory / instrument name',
      required: true,
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6 pb-10">
      {/* 1. Page Header */}
      <PageHeader
        bannerImage={img}
        tag="RADIATION TEST"
        step="02 / 07"
        title="Radiation Test"
        arabicTitle="اختبار الإشعاع"
        description="Assess radiation-related health risk from absorbed and equivalent dose, white blood cell count and DNA damage biomarkers. Laboratory results and AI risk predictions are reported separately."
      />

      {/* 2. Stepper Bar */}
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
                className={`h-7 w-7 rounded-full inline-flex items-center justify-center text-xs font-bold transition-colors ${isActive || isCompleted
                  ? 'bg-[#0A1B33] text-white'
                  : 'bg-gray-100 text-gray-500 border border-gray-300'
                  }`}
              >
                {isCompleted ? '✓' : index + 1}
              </span>
              <span
                className={`text-sm font-bold ${isActive ? 'text-[#0A1B33]' : 'text-gray-500'
                  }`}
              >
                {step}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. Section A: Radiation Dose */}
      <AssessmentSectionCard
        title="A. Radiation Dose"
        arabicTitle="جرعة الإشعاع"
        infoText="Gray (Gy) measures absorbed energy; Sievert (Sv) weights that energy by radiation type and tissue. They are distinct quantities — enter both as reported by the dosimeter."
        inputs={radiationDoseInputs}
        values={formValues}
        onChange={handleInputChange}
      />

      {/* 4. Section B: White Blood Cell Count (CBC) */}
      <AssessmentSectionCard
        title="B. White Blood Cell Count (CBC)"
        arabicTitle="تعداد خلايا الدم البيضاء"
        infoText="Enter a complete blood count (CBC). Reference intervals shown are demonstration defaults for a general adult — use 'Edit range' to set your laboratory's own interval if it differs (e.g. for an astronaut)."
        inputs={cbcInputs}
        values={formValues}
        onChange={handleInputChange}
        onEditRange={(input) => console.log('Edit range for:', input.name)}
      />

      {/* 5. Section C: DNA Damage Biomarkers */}
      <AssessmentSectionCard
        title="C. DNA Damage Biomarkers"
        arabicTitle="مؤشرات تلف الحمض النووي"
        infoText="γ-H2AX, Comet Assay and Micronucleus Assay are different laboratory methods with different units and scoring. They are not interchangeable and no reference interval is assumed — enter the laboratory's own reference if provided."
        inputs={dnaBiomarkersInputs}
        values={formValues}
        onChange={handleInputChange}
      />

      {/* 6. Submit Action */}
      <div className="space-y-2 pt-2">
        <button
          type="submit"
          className="bg-[#1D4F9C] hover:bg-[#173F7D] text-white font-semibold text-base px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-colors cursor-pointer shadow-sm"
        >
          <span>➤</span>
          <span>Submit Measurements</span>
        </button>

        <p className="text-xs text-[#566678]">
          Fields marked * are required. Measurements are sent to the backend API for analysis.
        </p>
      </div>
    </form>
  );
};

export default RadiationTest;