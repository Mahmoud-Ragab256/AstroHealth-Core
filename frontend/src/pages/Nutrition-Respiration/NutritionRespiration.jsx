import { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import LeftPaddingCard from '../../Components/LeftPaddingCard';
import AssessmentForm from '../../Components/AssessmentForm';

const NutritionRespiration = () => {
  const [selectedReport, setSelectedReport] = useState(null);


  const respiratoryVitals = [
    {
      icon: '🌬️',
      status: 'normal',
      name: 'Respiratory Rate',
      value: '15',
      unit: 'breaths/min',
      refRange: '12–20',
      lastRecorded: 'Nov 15, 2026, 12:35 AM',
    },
    {
      icon: '💧',
      status: 'normal',
      name: 'PaO₂ (arterial)',
      value: '92',
      unit: 'mmHg',
      refRange: '75–100',
      lastRecorded: 'Nov 15, 2026, 12:35 AM',
    },
    {
      icon: '🫧',
      status: 'normal',
      name: 'PaCO₂ (arterial)',
      value: '40',
      unit: 'mmHg',
      refRange: '35–45',
      lastRecorded: 'Nov 15, 2026, 12:35 AM',
    },
  ];

  const historicalData = [
    { date: 'Nov 2', spo2: 98, rr: 15 },
    { date: 'Nov 2 PM', spo2: 97, rr: 14 },
    { date: 'Nov 3', spo2: 99, rr: 16 },
    { date: 'Nov 3 PM', spo2: 97, rr: 16 },
    { date: 'Nov 4', spo2: 99, rr: 16 },
    { date: 'Nov 4 PM', spo2: 97, rr: 16 },
    { date: 'Nov 5', spo2: 99, rr: 17 },
    { date: 'Nov 6', spo2: null, rr: null },
    { date: 'Nov 8', spo2: null, rr: null },
    { date: 'Nov 10', spo2: null, rr: null },
    { date: 'Nov 12', spo2: null, rr: null },
    { date: 'Nov 14', spo2: null, rr: null },
  ];



  const previousReports = [
    {
      id: 'RPT-2026-0107',
      date: 'Oct 30, 2026, 08:00 AM',
      summary: 'SpO₂ and respiratory rate within range.',
      status: 'NORMAL',
      details: {
        spo2: '98%',
        rr: '15 breaths/min',
        pao2: '93 mmHg',
        paco2: '39 mmHg',
        notes: 'Cabin O₂ partial pressure nominal at 21.3 kPa. No signs of hypoxia or hypercapnia.',
      },
    },
  ];

  // SVG Donut Gauge calculation for 98%
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const spo2Percent = 98;
  const strokeDashoffset = circumference - (spo2Percent / 100) * circumference;

  return (
    <div className="flex flex-col space-y-6">
      {/* 1. Current Respiratory Status Section */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-lg md:text-xl font-bold text-[#0A1B33]">
            Current Respiratory Status
          </h2>

          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-0.5 text-xs font-bold text-[#12805D]">
            <span>✓</span>
            <span>NORMAL</span>
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[#2F80D1] bg-white px-3 py-0.5 text-xs font-medium text-[#1D4F9C]">
            <span>🧪</span>
            <span>Demonstration data</span>
          </span>
        </div>

        {/* Status Layout: Left SpO2 Donut Card + Right 3 Cards & Note */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* Left Donut Gauge Card */}
          <div className="lg:col-span-3 rounded-3xl border border-gray-300 bg-white p-5 shadow-sm flex flex-col items-center justify-between text-center space-y-4">
            <div className="text-xs font-medium text-[#566678] self-start text-left leading-snug">
              Oxygen Saturation (SpO₂) — pulse oximetry
            </div>

            <div className="relative flex items-center justify-center my-2">
              <svg className="w-28 h-28 -rotate-90" viewBox="0 0 104 104">
                <circle
                  cx="52"
                  cy="52"
                  r={radius}
                  fill="transparent"
                  stroke="#E2E8F0"
                  strokeWidth="9"
                />
                <circle
                  cx="52"
                  cy="52"
                  r={radius}
                  fill="transparent"
                  stroke="#12805D"
                  strokeWidth="9"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-bold text-[#0A1B33] font-mono">
                  {spo2Percent}%
                </span>
                <span className="text-[10px] font-bold tracking-wider text-[#566678] uppercase">
                  SPO₂ LEVEL
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-[#12805D]">
              <span>✓</span>
              <span>NORMAL</span>
            </span>
          </div>

          {/* Right 3 Vitals + Info Banner */}
          <div className="lg:col-span-9 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch flex-1">
              {respiratoryVitals.map((vital) => (
                <div
                  key={vital.name}
                  className="h-full [&_.card]:h-full [&_.card]:w-full [&_.card]:bg-white [&_.card]:p-4 [&_.card]:justify-between [&_.card-title]:text-sm [&_.big-number]:text-3xl [&_.big-number_span]:text-base"
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

            {/* Info Box */}
            <div className="rounded-2xl border border-[#D8E0E7] bg-[#EDF2F9] px-4 py-3 text-xs text-[#203040] leading-relaxed">
              SpO₂ is a non-invasive pulse-oximetry estimate; PaO₂ and PaCO₂ are measured from an arterial blood gas sample. They are different measurements and are never substituted for one another.
            </div>
          </div>
        </div>
      </section>

      {/* 2. Historical Measurements Chart */}
      <section className="rounded-3xl border border-gray-300 bg-white p-5 md:p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-lg font-bold text-[#0A1B33]">
            Historical Measurements
          </h2>
          <p className="text-xs text-[#566678]">
            SpO₂ (%) and respiratory rate (breaths/min)
          </p>
        </div>

        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: '#566678' }}
                axisLine={{ stroke: '#CBD5E1' }}
              />
              <YAxis
                yAxisId="left"
                domain={[85, 100]}
                tick={{ fontSize: 11, fill: '#566678' }}
                label={{
                  value: 'SpO₂ %',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fontSize: 11, fill: '#566678' },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[8, 24]}
                tick={{ fontSize: 11, fill: '#566678' }}
                label={{
                  value: 'breaths/min',
                  angle: 90,
                  position: 'insideRight',
                  style: { fontSize: 11, fill: '#566678' },
                }}
              />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="spo2"
                name="SpO₂ (%)"
                stroke="#12805D"
                strokeWidth={2}
                dot={{ r: 3, fill: '#12805D' }}
                connectNulls={false}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rr"
                name="Respiratory rate"
                stroke="#346E9E"
                strokeWidth={2}
                dot={{ r: 3, fill: '#346E9E' }}
                connectNulls={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 3. New Respiratory Assessment Section */}
      <AssessmentForm type="respiration" title="Respiratory measurements" />

      {/* 4. Previous Respiratory Reports */}
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-[#0A1B33]">
          Previous Respiratory Reports
        </h2>

        <div className="space-y-3">
          {previousReports.map((report) => (
            <div
              key={report.id}
              className="rounded-2xl border border-gray-300 bg-white p-4 md:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="text-sm font-bold text-[#0A1B33]">
                  {report.id} ·{' '}
                  <span className="font-normal text-[#566678]">{report.date}</span>
                </div>
                <p className="text-xs text-[#566678] mt-1">{report.summary}</p>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-center">
                <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-bold text-[#12805D]">
                  <span>✓</span>
                  <span>{report.status}</span>
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedReport(report)}
                  className="rounded-full border border-gray-300 bg-white hover:bg-gray-50 px-4 py-1.5 text-xs font-semibold text-[#0A1B33] transition-colors cursor-pointer"
                >
                  View Report
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* View Report Modal */}
      {selectedReport && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setSelectedReport(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white border border-gray-300 p-6 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#0A1B33]">
                  {selectedReport.id}
                </h3>
                <p className="text-xs text-[#566678]">{selectedReport.date}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReport(null)}
                className="text-sm font-bold text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-[#F8FAFC] border border-gray-200 p-3">
                <span className="text-[#566678]">SpO₂</span>
                <div className="font-bold text-base text-[#0A1B33] font-mono mt-0.5">
                  {selectedReport.details.spo2}
                </div>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] border border-gray-200 p-3">
                <span className="text-[#566678]">Respiratory Rate</span>
                <div className="font-bold text-base text-[#0A1B33] font-mono mt-0.5">
                  {selectedReport.details.rr}
                </div>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] border border-gray-200 p-3">
                <span className="text-[#566678]">PaO₂ (arterial)</span>
                <div className="font-bold text-base text-[#0A1B33] font-mono mt-0.5">
                  {selectedReport.details.pao2}
                </div>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] border border-gray-200 p-3">
                <span className="text-[#566678]">PaCO₂ (arterial)</span>
                <div className="font-bold text-base text-[#0A1B33] font-mono mt-0.5">
                  {selectedReport.details.paco2}
                </div>
              </div>
            </div>

            <p className="text-xs text-[#203040] bg-[#EDF2F9] p-3.5 rounded-2xl leading-relaxed">
              {selectedReport.details.notes}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionRespiration;