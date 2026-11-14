import { useState } from 'react';
import AssessmentSectionCard from '../../Components/AssessmentSectionCard';

const NutritionAssessment = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formValues, setFormValues] = useState({});

  const steps = ['Measure', 'Validate', 'AI analysis', 'Report'];

  const handleInputChange = (fieldName, newValue) => {
    setFormValues((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Nutrition Assessment Measurements:', formValues);
    setActiveStep(1);
  };

  const immuneInputs = [
    {
      name: 'wbcCount',
      label: 'White Blood Cell Count',
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
      name: 'crp',
      label: 'C-reactive protein (immune biomarker, when available)',
      unit: 'mg/L',
      required: false,
      hasMultipleCases: true,
      refRange: '≤ 5 mg/L',
    },
  ];

  const nutritionalInputs = [
    {
      name: 'proteinIntake',
      label: 'Protein Intake',
      unit: 'g/day',
      required: true,
    },
    {
      name: 'calciumSerum',
      label: 'Calcium (serum)',
      unit: 'mg/dL',
      required: true,
      hasMultipleCases: true,
      refRange: '8.6–10.2 mg/dL',
    },
    {
      name: 'vitaminD',
      label: 'Vitamin D (25-OH)',
      unit: 'ng/mL',
      required: true,
      hasMultipleCases: true,
      refRange: '30–100 ng/mL',
    },
    {
      name: 'vitaminK',
      label: 'Vitamin K (plasma phylloquinone)',
      unit: 'ng/mL',
      required: false,
    },
    {
      name: 'ironSerum',
      label: 'Iron (serum)',
      unit: 'µg/dL',
      required: true,
      hasMultipleCases: true,
      refRange: '60–170 µg/dL',
    },
    {
      name: 'omega3Index',
      label: 'Omega-3 index',
      unit: '%',
      required: false,
    },
    {
      name: 'urineSpecificGravity',
      label: 'Hydration — Urine Specific Gravity',
      unit: 'SG',
      required: true,
      hasMultipleCases: true,
      refRange: '1.005–1.03 SG',
    },
    {
      name: 'albumin',
      label: 'Nutritional Biomarker — Albumin',
      unit: 'g/dL',
      required: true,
      hasMultipleCases: true,
      refRange: '3.5–5 g/dL',
    },
  ];

  const bloodGasInputs = [
    {
      name: 'pao2',
      label: 'Blood Oxygen (PaO₂) — arterial',
      unit: 'mmHg',
      required: true,
      hasMultipleCases: true,
      refRange: '75–100 mmHg',
    },
    {
      name: 'paco2',
      label: 'Carbon Dioxide (PaCO₂) — arterial',
      unit: 'mmHg',
      required: true,
      hasMultipleCases: true,
      refRange: '35–45 mmHg',
    },
    {
      name: 'bloodPh',
      label: 'Blood pH (when available)',
      unit: 'pH',
      required: false,
      hasMultipleCases: true,
      refRange: '7.35–7.45 pH',
    },
    {
      name: 'spo2',
      label: 'Oxygen Saturation (SpO₂) — pulse oximetry',
      unit: '%',
      required: true,
      hasMultipleCases: true,
      refRange: '95–100 %',
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
      {/* 1. Stepper Bar */}
      <div className="rounded-2xl bg-white border border-gray-300 shadow-sm px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;
          const stepNumber = String(index + 1).padStart(2, '0');

          return (
            <button
              key={step}
              type="button"
              onClick={() => setActiveStep(index)}
              className="inline-flex items-center gap-2.5 cursor-pointer"
            >
              <span
                className={`h-7 w-7 rounded-full inline-flex items-center justify-center text-xs font-mono font-bold transition-colors ${isActive || isCompleted
                  ? 'bg-[#0A1B33] text-white'
                  : 'bg-gray-100 text-gray-500 border border-gray-300'
                  }`}
              >
                {isCompleted ? '✓' : stepNumber}
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

      {/* 2. Section A: Immune System Efficiency */}
      <AssessmentSectionCard
        title="A. Immune System Efficiency"
        arabicTitle="كفاءة المناعة"
        inputs={immuneInputs}
        values={formValues}
        onChange={handleInputChange}
        onEditRange={(input) => console.log('Edit range for:', input.name)}
      />

      {/* 3. Section B: Nutritional Status */}
      <AssessmentSectionCard
        title="B. Nutritional Status"
        arabicTitle="الحالة الغذائية"
        inputs={nutritionalInputs}
        values={formValues}
        onChange={handleInputChange}
        onEditRange={(input) => console.log('Edit range for:', input.name)}
      />

      {/* 4. Section C: Blood Gas Measurements */}
      <AssessmentSectionCard
        title="C. Blood Gas Measurements"
        arabicTitle="غازات الدم"
        infoText="PaO₂ and PaCO₂ come from an arterial blood gas sample. SpO₂ is a non-invasive pulse-oximetry estimate. They are not interchangeable."
        inputs={bloodGasInputs}
        values={formValues}
        onChange={handleInputChange}
        onEditRange={(input) => console.log('Edit range for:', input.name)}
      />

      {/* 5. Submit Action */}
      <div className="space-y-2 pt-2">
        <button
          type="submit"
          className="bg-[#346E9E] hover:bg-[#285880] text-white font-semibold text-base px-7 py-3.5 rounded-full inline-flex items-center gap-2.5 transition-colors cursor-pointer shadow-sm"
        >
          <span>➤</span>
          <span>Submit Measurements</span>
        </button>

        <p className="text-xs text-[#566678]">
          Fields marked * are required. Measurements are sent to the Express API for analysis.
        </p>
      </div>
    </form>
  );
};

export default NutritionAssessment;