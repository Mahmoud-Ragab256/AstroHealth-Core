import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Printer, FileDown, FilePen, CheckCircle2, AlertTriangle, ShieldAlert } from 'lucide-react';
import { initialReports } from '../data/reportsData';

export default function ReportDetail({ reports = initialReports, onAmendReport }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const report = reports.find((r) => r.id === id);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amendmentNote, setAmendmentNote] = useState('');
  const [formError, setFormError] = useState('');

  const handleExportPdf = () => {
    const originalTitle = document.title;
    document.title = `AstroHealth-${id}`;
    window.print();
    document.title = originalTitle;
  };

  const handleCreateAmendment = () => {
    if (!amendmentNote.trim()) {
      setFormError('An amendment note is required.');
      return;
    }

    const newId = `${id}-REV${Math.floor(Math.random() * 90 + 10)}`;
    const newVersion = {
      ...report,
      id: newId,
      dateDisplay: 'Nov 15, 2026, 11:40 AM',
      isoDate: '2026-11-15',
      amendmentOf: report.id,
      amendmentNote: amendmentNote.trim(),
      superseded: false,
    };

    if (onAmendReport) {
      onAmendReport(report.id, newVersion);
    }

    setIsDialogOpen(false);
    setAmendmentNote('');
    setFormError('');
    navigate(`/reports/${newId}`);
  };

  if (!report) {
    return (
      <div className="rounded-3xl border border-gray-300 bg-white p-10 text-center shadow-sm space-y-4">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
          <ShieldAlert size={24} />
        </div>
        <h2 className="text-xl font-bold text-[#0A1B33]">Report Not Found</h2>
        <p className="text-sm text-[#566678] max-w-md mx-auto">
          The requested medical record (<span className="font-mono font-bold">{id}</span>) could not be located in the mission archive.
        </p>
        <Link
          to="/reports"
          className="inline-flex items-center gap-2 rounded-full bg-[#1D4F9C] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#163d7a] transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Return to Reports</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 pb-10">
      <div className="print:hidden flex flex-wrap items-center gap-3">
        <Link
          to="/reports"
          className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-[#203040] hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Return to Reports</span>
        </Link>

        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-full bg-[#1D4F9C] px-4 py-2 text-xs font-bold text-white hover:bg-[#163d7a] transition-colors cursor-pointer"
        >
          <Printer size={16} />
          <span>Print Report</span>
        </button>

        <button
          type="button"
          onClick={handleExportPdf}
          title='Opens the print dialog — choose "Save as PDF"'
          className="inline-flex items-center gap-2 rounded-full bg-[#346E9E] px-4 py-2 text-xs font-bold text-white hover:bg-[#28577e] transition-colors cursor-pointer"
        >
          <FileDown size={16} />
          <span>Export PDF</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setFormError('');
            setIsDialogOpen(true);
          }}
          disabled={report.superseded}
          className={`ml-auto inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-colors ${
            report.superseded
              ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'border-gray-300 bg-white text-[#0A1B33] hover:bg-gray-50 cursor-pointer'
          }`}
        >
          <FilePen size={16} />
          <span>Create Amendment</span>
        </button>
      </div>

      {report.superseded && (
        <div className="rounded-2xl border border-amber-300 bg-amber-50 px-5 py-3.5 text-xs text-amber-900 flex items-center gap-2.5">
          <AlertTriangle size={18} className="shrink-0 text-amber-600" />
          <span>
            <strong>Superseded Record:</strong> A newer amended version of this report has been filed. This original record remains locked for audit integrity.
          </span>
        </div>
      )}

      {report.amendmentOf && (
        <div className="rounded-2xl border border-blue-200 bg-[#EDF2F9] px-5 py-3.5 text-xs text-[#0A1B33] space-y-1">
          <div className="font-bold text-[#1D4F9C]">
            Amended Version · References Original Report{' '}
            <Link to={`/reports/${report.amendmentOf}`} className="underline font-mono">
              {report.amendmentOf}
            </Link>
          </div>
          <p className="text-[#203040]">
            <span className="font-semibold">Amendment Reason:</span> {report.amendmentNote}
          </p>
        </div>
      )}

      <div className="rounded-3xl border border-gray-300 bg-white shadow-sm overflow-hidden">
        <div
          className="border-b border-gray-200 p-6 md:p-8 space-y-4"
          style={{
            backgroundImage:
              'linear-gradient(to right, #f3f4f6 1px, transparent 1px), linear-gradient(to bottom, #f3f4f6 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1D4F9C]">
              <span className="h-2 w-2 rounded-full bg-orange-400"></span>
              <span>ASTROHEALTH CORE · FINALISED MEDICAL RECORD</span>
            </div>
            <span className="font-mono text-xs font-bold text-gray-500 bg-white/80 px-3 py-1 rounded-full border border-gray-200">
              {report.id}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[#0A1B33]">{report.name}</h1>
              <p className="text-xs text-[#566678] mt-1">
                Category: <span className="font-semibold text-[#203040]">{report.type}</span> · Generated on{' '}
                <span className="font-semibold text-[#203040]">{report.dateDisplay}</span>
              </p>
            </div>

            {report.status === 'WARNING' ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-800">
                <AlertTriangle size={15} />
                <span>OVERALL STATUS: WARNING</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-1.5 text-xs font-bold text-[#12805D]">
                <CheckCircle2 size={15} />
                <span>OVERALL STATUS: NORMAL</span>
              </span>
            )}
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="rounded-2xl bg-[#F8FAFC] border border-gray-200 p-4">
              <div className="text-[#566678]">Crew Member</div>
              <div className="font-bold text-[#0A1B33] mt-1">{report.astronautId}</div>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] border border-gray-200 p-4">
              <div className="text-[#566678]">Mission Timeline</div>
              <div className="font-bold text-[#0A1B33] mt-1">Mission Day {report.missionDay}</div>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] border border-gray-200 p-4">
              <div className="text-[#566678]">Risk Score</div>
              <div className="font-bold text-[#0A1B33] mt-1">{report.risk} Risk</div>
            </div>
            <div className="rounded-2xl bg-[#F8FAFC] border border-gray-200 p-4">
              <div className="text-[#566678]">Record State</div>
              <div className="font-bold text-[#0A1B33] mt-1">
                {report.superseded ? 'Superseded (Locked)' : 'Active & Read-Only'}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-[#EDF2F9] border border-blue-100 p-5 space-y-1.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1D4F9C]">Clinical Summary & Findings</h2>
            <p className="text-sm text-[#203040] leading-relaxed">{report.summary}</p>
          </div>

          {report.metrics && report.metrics.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-bold text-[#0A1B33]">Recorded Telemetry & Biomarkers</h2>
              <div className="rounded-2xl border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-gray-200 font-bold text-[#203040]">
                      <th className="py-3 px-4">Parameter</th>
                      <th className="py-3 px-4">Measured Value</th>
                      <th className="py-3 px-4">Mission Reference</th>
                      <th className="py-3 px-4">Evaluation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {report.metrics.map((m, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-4 font-semibold text-[#0A1B33]">{m.label}</td>
                        <td className="py-3 px-4 font-mono font-bold text-[#1D4F9C]">{m.value}</td>
                        <td className="py-3 px-4 text-[#566678]">{m.reference}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              m.flag === 'NORMAL'
                                ? 'bg-emerald-50 text-[#12805D] border border-emerald-200'
                                : 'bg-amber-50 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {m.flag}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {report.recommendations && report.recommendations.length > 0 && (
            <div className="space-y-2.5">
              <h2 className="text-sm font-bold text-[#0A1B33]">Flight Surgeon & AI Decision Recommendations</h2>
              <ul className="space-y-2 text-xs text-[#203040]">
                {report.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-2.5 rounded-xl bg-[#F8FAFC] border border-gray-200 px-4 py-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#1D4F9C] mt-1.5 shrink-0"></span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {isDialogOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setIsDialogOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-white border border-gray-300 p-6 shadow-xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 pb-3">
              <h3 className="text-lg font-bold text-[#0A1B33]">Create Report Amendment</h3>
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="text-sm font-bold text-gray-500 hover:text-gray-900 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#566678] leading-relaxed">
              Finalised reports cannot be edited. This records a <strong className="text-[#0A1B33]">new version</strong> that references{' '}
              <span className="font-mono font-bold text-[#1D4F9C]">{id}</span>; the original stays unchanged.
            </p>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#203040]" htmlFor="amend-note">
                Reason for amendment *
              </label>
              <textarea
                id="amend-note"
                rows={4}
                placeholder="Enter clinical justification or telemetry correction details..."
                value={amendmentNote}
                onChange={(e) => setAmendmentNote(e.target.value)}
                className="resize-none w-full rounded-2xl border border-gray-300 p-3.5 text-xs text-gray-900 focus:border-[#1D4F9C] focus:outline-none"
              />
              {formError && <p role="alert" className="text-xs font-bold text-red-600">{formError}</p>}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsDialogOpen(false)}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-bold text-[#203040] hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateAmendment}
                className="rounded-full bg-[#1D4F9C] px-5 py-2 text-xs font-bold text-white hover:bg-[#163d7a] cursor-pointer"
              >
                Create new version
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}