import { useState } from 'react';
import AssessmentSectionCard from '../../Components/AssessmentSectionCard';

const GravityAssessment = () => {
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
    console.log('Submitted Gravity Assessment Measurements:', formValues);
    setActiveStep(1);
  };

  const boneHealthInputs = [
    {
      name: 'bmd',
      label: 'Bone Mineral Density (BMD)',
      unit: 'g/cm²',
      required: true,
    },
    {
      name: 'boneDensityChange',
      label: 'Bone Density Change',
      unit: '%',
      required: true,
    },
    {
      name: 'calcium',
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
      name: 'ctx',
      label: 'Bone Turnover Marker — CTX (when available)',
      unit: 'ng/mL',
      required: false,
    },
  ];

  const muscleHealthInputs = [
    {
      name: 'muscleMass',
      label: 'Muscle Mass',
      unit: 'kg',
      required: true,
    },
    {
      name: 'muscleStrength',
      label: 'Muscle Strength (grip dynamometer)',
      unit: 'kg',
      required: true,
    },
    {
      name: 'muscleLoss',
      label: 'Muscle Loss',
      unit: '%',
      required: true,
    },
    {
      name: 'exerciseDuration',
      label: 'Exercise Duration (daily average)',
      unit: 'min/day',
      required: true,
    },
    {
      name: 'physicalPerformanceScore',
      label: 'Physical Performance Score',
      unit: '0–100',
      required: true,
    },
  ];

  const cardiovascularInputs = [
    {
      name: 'restingHeartRate',
      label: 'Heart Rate (resting)',
      unit: 'BPM',
      required: true,
      hasMultipleCases: true,
      refRange: '60–100 BPM',
    },
    {
      name: 'systolicBp',
      label: 'Blood Pressure — Systolic',
      unit: 'mmHg',
      required: true,
      hasMultipleCases: true,
      refRange: '90–130 mmHg',
    },
    {
      name: 'diastolicBp',
      label: 'Blood Pressure — Diastolic',
      unit: 'mmHg',
      required: true,
      hasMultipleCases: true,
      refRange: '60–85 mmHg',
    },
    {
      name: 'orthostaticTolerance',
      label: 'Orthostatic Tolerance (when available)',
      unit: 'min',
      required: false,
    },
    {
      name: 'vo2Max',
      label: 'Cardiovascular Exercise Capacity (VO₂ max)',
      unit: 'mL/kg/min',
      required: true,
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

      {/* 2. Section A: Bone Health */}
      <AssessmentSectionCard
        title="A. Bone Health"
        arabicTitle="صحة العظام"
        inputs={boneHealthInputs}
        values={formValues}
        onChange={handleInputChange}
        onEditRange={(input) => console.log('Edit range for:', input.name)}
      />

      {/* 3. Section B: Muscle Health */}
      <AssessmentSectionCard
        title="B. Muscle Health"
        arabicTitle="صحة العضلات"
        inputs={muscleHealthInputs}
        values={formValues}
        onChange={handleInputChange}
      />

      {/* 4. Section C: Cardiovascular Health */}
      <AssessmentSectionCard
        title="C. Cardiovascular Health"
        arabicTitle="صحة القلب والأوعية"
        inputs={cardiovascularInputs}
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

export default GravityAssessment;