import { useState } from 'react';
import LeftPaddingCard from '../../Components/LeftPaddingCard';

const EmergencyMeasurements = () => {
  const [isAssessing, setIsAssessing] = useState(false);

  const vitals = [
    {
      icon: '💓',
      status: 'normal',
      name: 'Heart Rate (HR)',
      value: '72',
      unit: 'BPM',
      refRange: '60–100 BPM',
      lastRecorded: 'Nov 10, 2026, 02:00 PM',
    },
    {
      icon: '🩺',
      status: 'normal',
      name: 'Blood Pressure (BP)',
      value: '118/76',
      unit: 'mmHg',
      refRange: '90–130 / 60–85',
      lastRecorded: 'Nov 10, 2026, 02:00 PM',
    },
    {
      icon: '🫁',
      status: 'normal',
      name: 'Oxygen Saturation (SpO₂)',
      value: '98',
      unit: '%',
      refRange: '95–100 %',
      lastRecorded: 'Nov 10, 2026, 02:00 PM',
    },
    {
      icon: '🌬️',
      status: 'normal',
      name: 'Respiratory Rate (RR)',
      value: '15',
      unit: 'breaths/min',
      refRange: '12–20 breaths/min',
      lastRecorded: 'Nov 10, 2026, 02:00 PM',
    },
    {
      icon: '🌡️',
      status: 'normal',
      name: 'Body Temperature',
      value: '36.8',
      unit: '°C',
      refRange: '36.1–37.5 °C',
      lastRecorded: 'Nov 10, 2026, 02:00 PM',
    },
    {
      icon: '📈',
      status: 'normal',
      name: 'Electrocardiogram (ECG)',
      value: 'Normal sinus rhythm',
      unit: '',
      refRange: '',
      lastRecorded: 'Nov 10, 2026, 02:00 PM',
    },
    {
      icon: '🩸',
      status: 'normal',
      name: 'Blood Glucose',
      value: '96',
      unit: 'mg/dL',
      refRange: '70–140 mg/dL',
      lastRecorded: 'Nov 10, 2026, 02:00 PM',
    },
  ];

  return (
    <div className="flex flex-col space-y-6">
      {/* Header Row */}
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-xl font-bold text-[#0A1B33]">
          Last Recorded Vital Signs
        </h2>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#2F80D1] bg-white px-3.5 py-1 text-xs font-medium text-[#1D4F9C]">
          <span>🧪</span>
          <span>Demonstration data</span>
        </span>
      </div>

      {/* Vital Signs Grid (3 cards on lg, 4 cards on xl) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
        {vitals.map((vital) => (
          <div
            key={vital.name}
            className="h-full [&_.card]:h-full [&_.card]:w-full [&_.card]:bg-white [&_.card]:p-4 [&_.card]:justify-between [&_.card-title]:text-base [&_.big-number]:text-2xl md:[&_.big-number]:text-3xl [&_.big-number_span]:text-base"
          >
            <LeftPaddingCard
              icon={vital.icon}
              status={vital.status}
              name={vital.name}
              value={vital.value}
              unit={vital.unit}
              refRange={vital.refRange}
              lastRecorded={vital.lastRecorded}
            />
          </div>
        ))}
      </div>

      {/* Start Emergency Assessment Box */}
      <div className="rounded-3xl border border-gray-300 bg-white p-6 shadow-sm space-y-4">
        <p className="text-gray-600 text-base">
          Begin a new assessment. You will enter the required measurements, they are validated, and then analysed.
        </p>

        <button
          type="button"
          onClick={() => setIsAssessing(true)}
          className="bg-[#A63A3A] hover:bg-[#8E2F2F] text-white font-semibold text-base px-6 py-3 rounded-full inline-flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
        >
          <span>▷</span>
          <span>Start Emergency Assessment</span>
        </button>

        {isAssessing && (
          <p className="text-sm font-medium text-[#1D4F9C] pt-1">
            Emergency assessment mode initialized. Ready for vital signs input.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmergencyMeasurements;