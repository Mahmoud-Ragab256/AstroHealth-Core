import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import UpperPaddingCard from '../Components/UpperPaddingCard';
import AssessmentCard from '../Components/AssessmentCard';
import ReportItem from '../Components/ReportItem';

const Dashboard = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30 Days');

  // بيانات الرسومات البيانية حسب المدة المختارة
  const telemetryByRange = {
    '7 Days': [
      { label: 'D1', hr: 70, sys: 118, dia: 76, spo2: 98, rad: 0.18, bmd: -1.35, muscle: 99.2, sleep: 7.5, mood: 8.2, stress: 5.5 },
      { label: 'D2', hr: 74, sys: 121, dia: 78, spo2: 98, rad: 0.22, bmd: -1.36, muscle: 99.0, sleep: 6.8, mood: 7.9, stress: 6.0 },
      { label: 'D3', hr: 69, sys: 116, dia: 75, spo2: 99, rad: 0.19, bmd: -1.36, muscle: 98.9, sleep: 7.8, mood: 8.5, stress: 5.1 },
      { label: 'D4', hr: 76, sys: 124, dia: 80, spo2: 97, rad: 0.28, bmd: -1.38, muscle: 98.7, sleep: 6.2, mood: 7.4, stress: 6.8 },
      { label: 'D5', hr: 72, sys: 119, dia: 77, spo2: 98, rad: 0.24, bmd: -1.39, muscle: 98.6, sleep: 7.2, mood: 8.0, stress: 6.1 },
      { label: 'D6', hr: 71, sys: 117, dia: 76, spo2: 98, rad: 0.20, bmd: -1.39, muscle: 98.5, sleep: 7.6, mood: 8.3, stress: 5.8 },
      { label: 'D7', hr: 72, sys: 120, dia: 78, spo2: 98, rad: 0.21, bmd: -1.40, muscle: 98.4, sleep: 7.4, mood: 8.1, stress: 6.2 },
    ],
    '30 Days': [
      { label: 'W1', hr: 68, sys: 115, dia: 74, spo2: 99, rad: 0.14, bmd: -1.20, muscle: 100.0, sleep: 7.8, mood: 8.6, stress: 4.8 },
      { label: 'W2', hr: 71, sys: 118, dia: 76, spo2: 98, rad: 0.17, bmd: -1.26, muscle: 99.5, sleep: 7.4, mood: 8.2, stress: 5.4 },
      { label: 'W3', hr: 75, sys: 123, dia: 81, spo2: 98, rad: 0.25, bmd: -1.33, muscle: 98.9, sleep: 6.7, mood: 7.6, stress: 6.5 },
      { label: 'W4', hr: 72, sys: 120, dia: 78, spo2: 98, rad: 0.21, bmd: -1.40, muscle: 98.4, sleep: 7.3, mood: 8.1, stress: 6.2 },
    ],
    '90 Days': [
      { label: 'M1', hr: 66, sys: 114, dia: 73, spo2: 99, rad: 0.11, bmd: -1.05, muscle: 100.0, sleep: 8.0, mood: 8.8, stress: 4.2 },
      { label: 'M2', hr: 70, sys: 117, dia: 75, spo2: 98, rad: 0.16, bmd: -1.22, muscle: 99.2, sleep: 7.5, mood: 8.3, stress: 5.3 },
      { label: 'M3', hr: 72, sys: 120, dia: 78, spo2: 98, rad: 0.21, bmd: -1.40, muscle: 98.4, sleep: 7.2, mood: 8.0, stress: 6.2 },
    ],
  };

  const pieByRange = {
    '7 Days': [
      { name: 'Normal', value: 78, color: '#12805D' },
      { name: 'Warning', value: 18, color: '#E59A24' },
      { name: 'Critical', value: 4, color: '#DC2626' },
    ],
    '30 Days': [
      { name: 'Normal', value: 72, color: '#12805D' },
      { name: 'Warning', value: 21, color: '#E59A24' },
      { name: 'Critical', value: 7, color: '#DC2626' },
    ],
    '90 Days': [
      { name: 'Normal', value: 68, color: '#12805D' },
      { name: 'Warning', value: 24, color: '#E59A24' },
      { name: 'Critical', value: 8, color: '#DC2626' },
    ],
  };

  const currentData = telemetryByRange[timeRange];
  const currentPie = pieByRange[timeRange];

  const overviewMetrics = [
    { icon: '🫀', status: 'warning', name: 'Overall Health', value: 'Stable', unit: '', change: '1 elevated metric', updateTime: 'Just now' },
    { icon: '☢️', status: 'warning', name: 'Radiation Exposure', value: '0.21', unit: 'mSv', change: 'Within mission cap', updateTime: '14m ago' },
    { icon: '💓', status: 'normal', name: 'Heart Rate', value: '72', unit: 'bpm', change: 'Resting average', updateTime: '2m ago' },
    { icon: '🦴', status: 'warning', name: 'Bone Density', value: '-1.4', unit: 'SD', change: '-0.2% vs baseline', updateTime: '2d ago' },
    { icon: '🧠', status: 'warning', name: 'Stress Index', value: '6.2', unit: '/ 10', change: 'Moderate load', updateTime: '1h ago' },
    { icon: '📅', status: 'normal', name: 'Exercises Completed', value: '4 / 21', unit: '', change: 'Weekly target on track', updateTime: 'Today' },
    { icon: '🫁', status: 'normal', name: 'Oxygen Saturation', value: '98', unit: '%', change: 'SpO2 nominal', updateTime: '5m ago' },
  ];

  const assessments = [
    {
      id: 'radiation-test',
      status: 'warning',
      name: 'Radiation Exposure Assessment',
      description: 'Evaluate cumulative ionizing radiation dose and blood cell count biomarkers.',
      required: 'Dosimeter log & CBC panel',
      lastAssessment: '2 days ago',
    },
    {
      id: 'emergency-check',
      status: 'normal',
      name: 'Emergency Vitals Check',
      description: 'Rapid baseline check of cardiovascular and respiratory readiness parameters.',
      required: 'Pulse oximeter & BP cuff',
      lastAssessment: '6 hours ago',
    },
    {
      id: 'mental-screening',
      status: 'normal',
      name: 'Mental Wellbeing Screening',
      description: 'Cognitive load, sleep architecture, and psychological resilience evaluation.',
      required: 'Self-report questionnaire',
      lastAssessment: '4 days ago',
    },
    {
      id: 'gravity-assessment',
      status: 'warning',
      name: 'Gravity & Bone Assessment',
      description: 'Microgravity musculoskeletal adaptation, bone density, and calcium balance.',
      required: 'DEXA scan & serum panel',
      lastAssessment: '1 week ago',
    },
    {
      id: 'nutrition-hydration',
      status: 'normal',
      name: 'Nutrition & Hydration Check',
      description: 'Caloric intake, electrolyte balance, and micronutrient absorption review.',
      required: 'Daily intake log',
      lastAssessment: 'Yesterday',
    },
    {
      id: 'respiratory-readiness',
      status: 'normal',
      name: 'Respiratory Readiness',
      description: 'Pulmonary function, arterial oxygen levels, and cabin air adaptation.',
      required: 'Spirometry test',
      lastAssessment: '3 days ago',
    },
  ];

  const reports = [
    {
      icon: '☢️',
      status: 'warning',
      name: 'Radiation Exposure & Dose Report',
      type: 'Lab & Dosimetry',
      dateTime: 'Nov 14, 2026 · 14:20',
      reportId: 'RPT-2049',
      summary: 'Cumulative dose slightly elevated following solar flare event; within safe operational limits.',
    },
    {
      icon: '🫀',
      status: 'normal',
      name: 'Cardiovascular & Vitals Check',
      type: 'Telemetry',
      dateTime: 'Nov 13, 2026 · 09:00',
      reportId: 'RPT-2048',
      summary: 'Resting heart rate and blood pressure remain optimal across all EVA cycles.',
    },
    {
      icon: '🧠',
      status: 'normal',
      name: 'Psychological & Cognitive Screening',
      type: 'Assessment',
      dateTime: 'Nov 10, 2026 · 18:45',
      reportId: 'RPT-2045',
      summary: 'Cognitive reaction time and sleep efficiency scored above mission baseline.',
    },
    {
      icon: '🦴',
      status: 'warning',
      name: 'Musculoskeletal & Bone Density',
      type: 'Biomarkers',
      dateTime: 'Nov 08, 2026 · 11:15',
      reportId: 'RPT-2041',
      summary: 'Minor lumbar BMD decrease detected; resistive exercise protocol adjusted.',
    },
    {
      icon: '🫁',
      status: 'normal',
      name: 'Nutrition & Respiratory Panel',
      type: 'Lab Panel',
      dateTime: 'Nov 05, 2026 · 08:30',
      reportId: 'RPT-2037',
      summary: 'Vitamin D supplementation effective; arterial blood gases completely normal.',
    },
  ];

  const alerts = [
    {
      type: 'warning',
      icon: '⚠️',
      title: 'Elevated Radiation Dose Rate',
      message: 'Solar particle activity increased ambient cabin radiation by 12% over the last 6 hours.',
      time: '14 mins ago',
    },
    {
      type: 'warning',
      icon: '🦴',
      title: 'Bone Density Threshold Notice',
      message: 'Calcium and Vitamin D intake recommended before next resistive workout session.',
      time: '2 hours ago',
    },
    {
      type: 'info',
      icon: 'ℹ️',
      title: 'Scheduled Telemetry Sync Complete',
      message: 'All biometric sensors synchronized with Mission Control medical database.',
      time: '5 hours ago',
    },
    {
      type: 'warning',
      icon: '🧠',
      title: 'Moderate Cognitive Load Detected',
      message: 'Consider 15-minute mindfulness break before evening EVA checklist review.',
      time: 'Yesterday',
    },
    {
      type: 'info',
      icon: '✅',
      title: 'Oxygen Scrubber Nominal',
      message: 'Cabin O2 and CO2 partial pressures stable across all crew quarters.',
      time: '2 days ago',
    },
  ];

  return (
    <div className="flex flex-col space-y-8 pb-8">
      {/* 1. Hero Banner Card */}
      <section className="rounded-3xl bg-[#0A1B33] text-white p-6 md:p-8 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="text-xs font-bold uppercase tracking-widest text-[#2F80D1]">
            MISSION TELEMETRY · DAY 142
          </div>
          <h1 className="text-2xl md:text-3xl font-bold leading-tight">
            Crew health, <br />
            <span className="text-white/85">at a glance.</span>
          </h1>
          <p className="text-gray-300 text-sm leading-relaxed">
            Real-time physiological monitoring, radiation dosimetry, and AI-assisted clinical assessments for deep space crew operations.
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/radiation-test')}
              className="bg-white hover:bg-gray-100 text-[#0A1B33] font-bold text-sm px-5 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              Start Radiation Test →
            </button>
            <button
              onClick={() => navigate('/reports')}
              className="border border-white/25 hover:bg-white/10 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors cursor-pointer"
            >
              View Reports
            </button>
          </div>
        </div>

        {/* Right Telemetry Summary Box */}
        <div className="w-full lg:w-72 rounded-2xl bg-white/5 border border-white/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-300 font-medium">Crew Status</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 px-2.5 py-0.5 text-[11px] font-bold uppercase">
              ⚠ Warning
            </span>
          </div>

          <div className="space-y-2 text-xs border-t border-white/10 pt-2.5">
            <div className="flex justify-between">
              <span className="text-gray-400">Astronaut ID</span>
              <span className="font-mono font-bold text-white">AST-0427</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Cabin Pressure</span>
              <span className="font-mono font-bold text-white">101.3 kPa</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Radiation Cap</span>
              <span className="font-mono font-bold text-amber-300">42% Used</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Next Scheduled Check</span>
              <span className="font-mono font-bold text-white">14:00 UTC</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Overall Health Overview (Equal height cards with items-stretch & h-full) */}
      <section className="space-y-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#566678]">
            BIOMETRICS
          </div>
          <h2 className="text-xl font-bold text-[#0A1B33]">
            Overall Health Overview
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
          {overviewMetrics.map((metric) => (
            <div
              key={metric.name}
              className="h-full [&_.card]:h-full [&_.card]:w-full [&_.card]:justify-between [&_.card]:bg-white [&_.card]:p-4 [&_.big-number]:text-3xl [&_.big-number_span]:text-lg [&_.card-title]:text-base [&_.status]:text-xs [&_.status_span]:h-4 [&_.status_span]:w-4 [&_.status_span]:text-[10px]"
            >
              <UpperPaddingCard
                icon={metric.icon}
                status={metric.status}
                name={metric.name}
                value={metric.value}
                unit={metric.unit}
                change={metric.change}
                updateTime={metric.updateTime}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 3. Health History (Interactive Recharts synced with timeRange) */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#566678]">
              TELEMETRY TRENDS
            </div>
            <h2 className="text-xl font-bold text-[#0A1B33]">
              Health History ({timeRange})
            </h2>
          </div>

          <div className="inline-flex rounded-full bg-white border border-gray-300 p-1">
            {['7 Days', '30 Days', '90 Days'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3.5 py-1 rounded-full text-xs font-semibold transition-colors cursor-pointer ${timeRange === range
                  ? 'bg-[#0A1B33] text-white'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
          {/* Chart 1: Heart Rate History */}
          <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-4 flex flex-col justify-between h-full">
            <div className="mb-2">
              <h3 className="font-bold text-gray-900 text-base">Heart Rate History</h3>
              <p className="text-xs text-gray-500">Resting BPM ({timeRange})</p>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} width={30} />
                  <Tooltip />
                  <Area type="monotone" dataKey="hr" stroke="#DC2626" fill="#DC2626" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Blood Pressure Trend */}
          <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-4 flex flex-col justify-between h-full">
            <div className="mb-2">
              <h3 className="font-bold text-gray-900 text-base">Blood Pressure Trend</h3>
              <p className="text-xs text-gray-500">Systolic & Diastolic (mmHg)</p>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} width={30} />
                  <Tooltip />
                  <Line type="monotone" dataKey="sys" stroke="#1D4F9C" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="dia" stroke="#9CA3AF" strokeDasharray="4 4" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 3: Oxygen Saturation */}
          <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-4 flex flex-col justify-between h-full">
            <div className="mb-2">
              <h3 className="font-bold text-gray-900 text-base">Oxygen Saturation</h3>
              <p className="text-xs text-gray-500">SpO2 percentage trend</p>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis domain={[94, 100]} tick={{ fontSize: 11 }} width={30} />
                  <Tooltip />
                  <Area type="monotone" dataKey="spo2" stroke="#12805D" fill="#12805D" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 4: Radiation Exposure & Dose */}
          <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-4 flex flex-col justify-between h-full">
            <div className="mb-2">
              <h3 className="font-bold text-gray-900 text-base">Radiation Exposure & Dose</h3>
              <p className="text-xs text-gray-500">Absorbed dose (mSv)</p>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} width={30} />
                  <Tooltip />
                  <Bar dataKey="rad" fill="#2F80D1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 5: Bone Density Change */}
          <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-4 flex flex-col justify-between h-full">
            <div className="mb-2">
              <h3 className="font-bold text-gray-900 text-base">Bone Density Change</h3>
              <p className="text-xs text-gray-500">DEXA T-score progression</p>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11 }} width={35} />
                  <Tooltip />
                  <Line type="monotone" dataKey="bmd" stroke="#E59A24" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 6: Muscle Mass Change */}
          <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-4 flex flex-col justify-between h-full">
            <div className="mb-2">
              <h3 className="font-bold text-gray-900 text-base">Muscle Mass Change</h3>
              <p className="text-xs text-gray-500">Lean mass index (%)</p>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis domain={[97, 101]} tick={{ fontSize: 11 }} width={35} />
                  <Tooltip />
                  <Area type="monotone" dataKey="muscle" stroke="#1D4F9C" fill="#1D4F9C" fillOpacity={0.12} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 7: Sleep Duration */}
          <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-4 flex flex-col justify-between h-full">
            <div className="mb-2">
              <h3 className="font-bold text-gray-900 text-base">Sleep Duration</h3>
              <p className="text-xs text-gray-500">Hours slept per cycle</p>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} width={30} />
                  <Tooltip />
                  <Bar dataKey="sleep" fill="#0A1B33" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 8: Psychological Health Index */}
          <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-4 flex flex-col justify-between h-full">
            <div className="mb-2">
              <h3 className="font-bold text-gray-900 text-base">Psychological Health Index</h3>
              <p className="text-xs text-gray-500">Mood vs Stress score (/10)</p>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 11 }} width={30} />
                  <Tooltip />
                  <Line type="monotone" dataKey="mood" stroke="#12805D" strokeWidth={2} />
                  <Line type="monotone" dataKey="stress" stroke="#DC2626" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 9: System Status Distribution */}
          <div className="bg-white rounded-2xl border border-gray-300 shadow-sm p-4 flex flex-col justify-between h-full">
            <div className="mb-2">
              <h3 className="font-bold text-gray-900 text-base">System Status Distribution</h3>
              <p className="text-xs text-gray-500">Overall biomarker breakdown ({timeRange})</p>
            </div>
            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentPie}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={62}
                    paddingAngle={3}
                  >
                    {currentPie.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Health Assessments (Equal height cards with mt-auto on button) */}
      <section className="space-y-3">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-[#566678]">
            DIAGNOSTICS
          </div>
          <h2 className="text-xl font-bold text-[#0A1B33]">
            Quick Health Assessments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 items-stretch">
          {assessments.map((item) => (
            <div
              key={item.id}
              className="h-full [&_.card]:h-full [&_.card]:w-full [&_.card]:bg-white [&_.card]:p-5 [&_.card]:space-y-3 [&_.card_h3]:text-lg [&_.card_p]:text-sm [&_.card_button]:mt-auto [&_.card_button]:py-2.5 [&_.card_button]:text-sm [&_.status]:text-xs [&_.status_span]:h-4 [&_.status_span]:w-4 [&_.status_span]:text-[10px]"
            >
              <AssessmentCard
                status={item.status}
                name={item.name}
                description={item.description}
                required={item.required}
                lastAssessment={item.lastAssessment}
                onStart={() => navigate(`/assessments/${item.id}`)}
              />
            </div>
          ))}
        </div>
      </section>

      {/* 5. Latest Medical Reports */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#566678]">
              RECORDS
            </div>
            <h2 className="text-xl font-bold text-[#0A1B33]">
              Latest Medical Reports
            </h2>
          </div>

          <button
            onClick={() => navigate('/reports')}
            className="text-xs font-bold text-[#1D4F9C] hover:text-[#173F7D] cursor-pointer"
          >
            View all reports →
          </button>
        </div>

        <div className="rounded-3xl border border-gray-300 bg-white shadow-sm divide-y divide-gray-200 p-1.5 [&>div]:p-3 [&>div_h3]:text-lg [&>div_p]:text-sm">
          {reports.map((report) => (
            <ReportItem
              key={report.reportId}
              icon={report.icon}
              status={report.status}
              name={report.name}
              type={report.type}
              dateTime={report.dateTime}
              reportId={report.reportId}
              summary={report.summary}
              onView={() => navigate(`/reports/${report.reportId}`)}
            />
          ))}
        </div>
      </section>


      <footer className="pt-5 border-t border-[#D8E0E7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#566678]">
        <div>
          <div className="font-bold text-base text-[#0A1B33]">astrohealth.</div>
          <p className="mt-0.5">
            Deep Space Crew Health & Telemetry Monitoring System · Demonstration Build
          </p>
        </div>
        <div className="font-mono">
          MISSION CONTROL SYNC: ACTIVE
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;