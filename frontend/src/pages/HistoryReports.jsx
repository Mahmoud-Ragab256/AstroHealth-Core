import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialReports } from '../data/reportsData';

const HistoryReports = ({ reports = initialReports }) => {
  const navigate = useNavigate();

  const [selectedPill, setSelectedPill] = useState('All');
  const [assessmentType, setAssessmentType] = useState('All types');
  const [medicalStatus, setMedicalStatus] = useState('Any status');
  const [riskLevel, setRiskLevel] = useState('Any');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
  const [currentPage, setCurrentPage] = useState(1);

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
    const filtered = reports.filter((rep) => {
      const matchType = assessmentType === 'All types' || rep.type === assessmentType;
      const matchStatus = medicalStatus === 'Any status' || rep.status === medicalStatus.toUpperCase();
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
  }, [reports, assessmentType, medicalStatus, riskLevel, fromDate, toDate, sortConfig]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSortedReports.length / itemsPerPage));
  const paginatedReports = filteredAndSortedReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col space-y-6 pb-10">
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
          <div className="font-mono text-sm font-bold text-gray-500 tracking-wider">07 / 07</div>
        </div>

        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="font-bold text-gray-900 text-3xl md:text-4xl leading-snug">History & Reports</h1>
          <span className="text-2xl md:text-3xl font-medium text-gray-600" dir="rtl">التاريخ والتقارير</span>
        </div>

        <p className="text-gray-600 text-base leading-relaxed max-w-3xl">
          Every generated medical report. Finalised reports are read-only; corrections are stored as new versions.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {categoryPills.map((pill) => {
          const isActive = selectedPill === pill.label;
          return (
            <button
              key={pill.label}
              type="button"
              onClick={() => handlePillClick(pill)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#346E9E] text-white shadow-sm'
                  : 'bg-white text-[#203040] border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-gray-300 bg-white p-5 md:p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="rounded-3xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-[#F8FAFC] text-xs font-bold text-[#203040]">
                <th onClick={() => handleSort('id')} className="py-3.5 px-5 cursor-pointer hover:text-[#1D4F9C] select-none">
                  Report ID <span className="text-gray-400">⇅</span>
                </th>
                <th onClick={() => handleSort('name')} className="py-3.5 px-4 cursor-pointer hover:text-[#1D4F9C] select-none">
                  Report Name <span className="text-gray-400">⇅</span>
                </th>
                <th onClick={() => handleSort('type')} className="py-3.5 px-4 cursor-pointer hover:text-[#1D4F9C] select-none">
                  Assessment Type <span className="text-gray-400">⇅</span>
                </th>
                <th onClick={() => handleSort('isoDate')} className="py-3.5 px-4 cursor-pointer hover:text-[#1D4F9C] select-none">
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
                    onClick={() => navigate(`/reports/${report.id}`)}
                    className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-5 font-mono font-bold text-[#0A1B33] group-hover:text-[#1D4F9C]">
                      {report.id}
                      {report.superseded && (
                        <span className="ml-2 rounded-md bg-gray-200 px-1.5 py-0.5 text-[10px] font-sans text-gray-600">
                          Superseded
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4 font-semibold text-[#0A1B33]">{report.name}</td>
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

        <div className="border-t border-gray-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-[#566678]">
          <div>Page {currentPage} of {totalPages} · {filteredAndSortedReports.length} records</div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className={`rounded-full border px-4 py-1.5 font-semibold transition-colors ${
                currentPage === 1
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
              className={`rounded-full border px-4 py-1.5 font-semibold transition-colors ${
                currentPage === totalPages
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                  : 'border-gray-300 text-[#0A1B33] hover:bg-gray-50 cursor-pointer'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryReports;