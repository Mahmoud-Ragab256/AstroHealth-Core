import { useState, useMemo } from 'react';

const HistoryReports = () => {
  const [selectedPill, setSelectedPill] = useState('All');
  const [assessmentType, setAssessmentType] = useState('All types');
  const [medicalStatus, setMedicalStatus] = useState('Any status');
  const [riskLevel, setRiskLevel] = useState('Any');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);

  const itemsPerPage = 8;

  const categoryPills = [
    { label: 'All', typeMatch: 'All' },
    { label: 'Radiation Reports', typeMatch: 'Radiation' },
    { label: 'Emergency Reports', typeMatch: 'Emergency' },
    { label: 'Psychological Reports', typeMatch: 'Psychological' },
    { label: 'Gravity & Bone Health Reports', typeMatch: 'Gravity & Bone Health' },
    { label: 'Nutrition Reports', typeMatch: 'Nutrition' },
    { label: 'Respiratory Reports', typeMatch: 'Respiratory' },
  ];

  const allReports = [
    {
      id: 'RPT-2026-0112',
      name: 'Radiation Assessment',
      type: 'Radiation',
      dateDisplay: 'Nov 12, 2026, 10:00 AM',
      isoDate: '2026-11-12',
      status: 'WARNING',
      risk: 'Moderate',
      summary: 'Cumulative solar particle exposure slightly elevated; lymphocyte count within borderline range.',
    },
    {
      id: 'RPT-2026-0111',
      name: 'Emergency Vitals Check',
      type: 'Emergency',
      dateDisplay: 'Nov 10, 2026, 02:00 PM',
      isoDate: '2026-11-10',
      status: 'NORMAL',
      risk: 'Low',
      summary: 'All primary vital signs (HR 72 BPM, BP 118/76 mmHg, SpO₂ 98%) nominal.',
    },
    {
      id: 'RPT-2026-0110',
      name: 'PHQ-9 Screening',
      type: 'Psychological',
      dateDisplay: 'Nov 08, 2026, 04:00 PM',
      isoDate: '2026-11-08',
      status: 'NORMAL',
      risk: 'Low',
      summary: 'PHQ-9 screening score 2/27 (Minimal). Sleep hygiene and crew cohesion nominal.',
    },
    {
      id: 'RPT-2026-0109',
      name: 'Microgravity Assessment',
      type: 'Gravity & Bone Health',
      dateDisplay: 'Nov 05, 2026, 11:00 AM',
      isoDate: '2026-11-05',
      status: 'WARNING',
      risk: 'Moderate',
      summary: 'Minor lower-limb BMD reduction (-1.4%) detected; increased ARED resistive loading recommended.',
    },
    {
      id: 'RPT-2026-0108',
      name: 'Nutrition & Immune Assessment',
      type: 'Nutrition',
      dateDisplay: 'Nov 02, 2026, 09:00 AM',
      isoDate: '2026-11-02',
      status: 'NORMAL',
      risk: 'Low',
      summary: 'Serum albumin, Vitamin D, and hydration specific gravity within mission reference targets.',
    },
    {
      id: 'RPT-2026-0107',
      name: 'Respiratory Assessment',
      type: 'Respiratory',
      dateDisplay: 'Oct 30, 2026, 08:00 AM',
      isoDate: '2026-10-30',
      status: 'NORMAL',
      risk: 'Low',
      summary: 'SpO₂ (98%) and respiratory rate (15 breaths/min) within normal parameters.',
    },
    {
      id: 'RPT-2026-0106',
      name: 'Radiation Assessment',
      type: 'Radiation',
      dateDisplay: 'Oct 22, 2026, 10:00 AM',
      isoDate: '2026-10-22',
      status: 'NORMAL',
      risk: 'Low',
      summary: 'Routine dosimetry and CBC panel nominal with no acute DNA biomarker elevation.',
    },
    {
      id: 'RPT-2026-0105',
      name: 'Microgravity Assessment',
      type: 'Gravity & Bone Health',
      dateDisplay: 'Oct 14, 2026, 11:00 AM',
      isoDate: '2026-10-14',
      status: 'NORMAL',
      risk: 'Low',
      summary: 'Muscle strength and VO₂ max stable relative to pre-flight baseline.',
    },
    {
      id: 'RPT-2026-0104',
      name: 'Emergency Vitals Check',
      type: 'Emergency',
      dateDisplay: 'Oct 06, 2026, 01:30 PM',
      isoDate: '2026-10-06',
      status: 'NORMAL',
      risk: 'Low',
      summary: 'Post-EVA baseline telemetry check completed; all cardiovascular parameters normal.',
    },
  ];

  const handlePillClick = (pill) => {
    setSelectedPill(pill.label);
    setAssessmentType(pill.typeMatch === 'All' ? 'All types' : pill.typeMatch);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSelectedPill('All');
    setAssessmentType('All types');
    setMedicalStatus('Any status');
    setRiskLevel('Any');
    setFromDate('');
    setToDate('');
    setCurrentPage(1);
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const filteredAndSortedReports = useMemo(() => {
    const filtered = allReports.filter((rep) => {
      const matchType =
        assessmentType === 'All types' || rep.type === assessmentType;
      const matchStatus =
        medicalStatus === 'Any status' || rep.status === medicalStatus.toUpperCase();
      const matchRisk = riskLevel === 'Any' || rep.risk === riskLevel;
      const matchFrom = !fromDate || rep.isoDate >= fromDate;
      const matchTo = !toDate || rep.isoDate <= toDate;

      return matchType && matchStatus && matchRisk && matchFrom && matchTo;
    });

    return [...filtered].sort((a, b) => {
      const valA = a[sortConfig.key];
      const valB = b[sortConfig.key];
      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [assessmentType, medicalStatus, riskLevel, fromDate, toDate, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedReports.length / itemsPerPage));
  const paginatedReports = filteredAndSortedReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col space-y-6 pb-10">
      {/* 1. Compact Header Card (No Banner Image) */}
      <div
        className="rounded-3xl border border-gray-300 bg-white p-6 md:p-8 shadow-sm space-y-3"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f3f4f6 1px, transparent 1px), linear-gradient(to bottom, #f3f4f6 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
            <span className="h-2 w-2 rounded-full bg-orange-400"></span>
            <span>HISTORY & REPORTS</span>
          </div>

          <div className="font-mono text-sm font-bold text-gray-500 tracking-wider">
            07 / 07
          </div>
        </div>

        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="font-bold text-gray-900 text-3xl md:text-4xl leading-snug">
            History & Reports
          </h1>

          <span className="text-2xl md:text-3xl font-medium text-gray-600" dir="rtl">
            التاريخ والتقارير
          </span>
        </div>

        <p className="text-gray-600 text-base leading-relaxed max-w-3xl">
          Every generated medical report. Finalised reports are read-only; corrections are stored as new versions.
        </p>
      </div>

      {/* 2. Category Quick Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categoryPills.map((pill) => {
          const isActive = selectedPill === pill.label;
          return (
            <button
              key={pill.label}
              type="button"
              onClick={() => handlePillClick(pill)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${isActive
                  ? 'bg-[#346E9E] text-white shadow-sm'
                  : 'bg-white text-[#203040] border border-gray-300 hover:bg-gray-50'
                }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* 3. Multi-Criteria Filter Box */}
      <div className="rounded-3xl border border-gray-300 bg-white p-5 md:p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Assessment Type */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-[#203040]">Assessment Type</label>
            <select
              value={assessmentType}
              onChange={(e) => {
                setAssessmentType(e.target.value);
                setSelectedPill('All');
                setCurrentPage(1);
              }}
              className="rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-900 focus:border-[#1D4F9C] focus:outline-none cursor-pointer"
            >
              <option value="All types">All types</option>
              <option value="Radiation">Radiation</option>
              <option value="Emergency">Emergency</option>
              <option value="Psychological">Psychological</option>
              <option value="Gravity & Bone Health">Gravity & Bone Health</option>
              <option value="Nutrition">Nutrition</option>
              <option value="Respiratory">Respiratory</option>
            </select>
          </div>

          {/* Medical Status */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-[#203040]">Medical Status</label>
            <select
              value={medicalStatus}
              onChange={(e) => {
                setMedicalStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-900 focus:border-[#1D4F9C] focus:outline-none cursor-pointer"
            >
              <option value="Any status">Any status</option>
              <option value="Normal">Normal</option>
              <option value="Warning">Warning</option>
            </select>
          </div>

          {/* Risk Level */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-[#203040]">Risk Level (score)</label>
            <select
              value={riskLevel}
              onChange={(e) => {
                setRiskLevel(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-gray-300 bg-white px-3.5 py-2.5 text-xs font-medium text-gray-900 focus:border-[#1D4F9C] focus:outline-none cursor-pointer"
            >
              <option value="Any">Any</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* From Date */}
          <div className="flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-[#203040]">From date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setCurrentPage(1);
              }}
              className="rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-medium text-gray-900 focus:border-[#1D4F9C] focus:outline-none"
            />
          </div>
        </div>

        {/* Second Row: To Date + Reset Button */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
          <div className="lg:col-span-10 flex flex-col space-y-1.5">
            <label className="text-xs font-bold text-[#203040]">To date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white px-3.5 py-2 text-xs font-medium text-gray-900 focus:border-[#1D4F9C] focus:outline-none"
            />
          </div>

          <div className="lg:col-span-2 flex lg:justify-end">
            <button
              type="button"
              onClick={handleReset}
              className="w-full lg:w-auto inline-flex items-center justify-center gap-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-50 px-5 py-2 text-xs font-bold text-[#203040] transition-colors cursor-pointer"
            >
              <span>↺</span>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Reports Table Card */}
      <div className="rounded-3xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F8FAFC] text-xs font-bold text-[#203040]">
                <th
                  onClick={() => handleSort('id')}
                  className="py-3.5 px-5 cursor-pointer hover:text-[#1D4F9C] select-none"
                >
                  Report ID <span className="text-gray-400">⇅</span>
                </th>
                <th
                  onClick={() => handleSort('name')}
                  className="py-3.5 px-4 cursor-pointer hover:text-[#1D4F9C] select-none"
                >
                  Report Name <span className="text-gray-400">⇅</span>
                </th>
                <th
                  onClick={() => handleSort('type')}
                  className="py-3.5 px-4 cursor-pointer hover:text-[#1D4F9C] select-none"
                >
                  Assessment Type <span className="text-gray-400">⇅</span>
                </th>
                <th
                  onClick={() => handleSort('isoDate')}
                  className="py-3.5 px-4 cursor-pointer hover:text-[#1D4F9C] select-none"
                >
                  Date & Time <span className="text-gray-400">⇅</span>
                </th>
                <th className="py-3.5 px-5">Overall Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-xs">
              {paginatedReports.length > 0 ? (
                paginatedReports.map((report) => (
                  <tr
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className="hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                  >
                    <td className="py-4 px-5 font-mono font-bold text-[#0A1B33]">
                      {report.id}
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#0A1B33]">
                      {report.name}
                    </td>
                    <td className="py-4 px-4 text-[#566678]">{report.type}</td>
                    <td className="py-4 px-4 text-[#566678]">{report.dateDisplay}</td>
                    <td className="py-4 px-5">
                      {report.status === 'WARNING' ? (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-3 py-1 text-[11px] font-bold text-amber-800">
                          <span>⚠</span>
                          <span>WARNING</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-[11px] font-bold text-[#12805D]">
                          <span>✓</span>
                          <span>NORMAL</span>
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-[#566678]">
                    No medical reports match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer Pagination */}
        <div className="border-t border-gray-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#566678]">
          <div>
            Page {currentPage} of {totalPages} · {filteredAndSortedReports.length} records
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={`rounded-full border px-4 py-1.5 font-semibold transition-colors ${currentPage === 1
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-[#0A1B33] hover:bg-gray-50 cursor-pointer'
                }`}
            >
              Previous
            </button>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className={`rounded-full border px-4 py-1.5 font-semibold transition-colors ${currentPage === totalPages
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-[#0A1B33] hover:bg-gray-50 cursor-pointer'
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Read-Only Report Details Modal */}
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
                <div className="font-mono text-xs font-bold text-[#1D4F9C]">
                  {selectedReport.id} · READ-ONLY ARCHIVE
                </div>
                <h3 className="text-lg font-bold text-[#0A1B33] mt-0.5">
                  {selectedReport.name}
                </h3>
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
                <span className="text-[#566678]">Assessment Type</span>
                <div className="font-bold text-[#0A1B33] mt-0.5">{selectedReport.type}</div>
              </div>
              <div className="rounded-xl bg-[#F8FAFC] border border-gray-200 p-3">
                <span className="text-[#566678]">Generated On</span>
                <div className="font-bold text-[#0A1B33] mt-0.5">{selectedReport.dateDisplay}</div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#EDF2F9] p-4 text-xs text-[#203040] leading-relaxed">
              <span className="font-bold text-[#0A1B33]">Clinical Summary: </span>
              {selectedReport.summary}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryReports;