import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestApi } from '../api/assessments.js';
import useAstronautProfile from '../hooks/useAstronautProfile';
import AstronautProfileCard from '../Components/AstronautProfileCard';

export default function SavedReportHistory() {
  const profile = useAstronautProfile();
  const [state, setState] = useState({ id: null, reports: null });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    if (!profile.id) return;
    const controller = new AbortController();
    requestApi(`/reports?astronaut_id=${encodeURIComponent(profile.id)}`, { signal: controller.signal })
      .then(data => { if (!controller.signal.aborted) setState({ id: profile.id, reports: data.reports }); })
      .catch(error => { if (!controller.signal.aborted) setState({ id: profile.id, error: error.message, reports: null }); });
    return () => controller.abort();
  }, [profile.id, attempt]);
  const loading = Boolean(profile.id && state.id !== profile.id);
  const reports = state.id === profile.id ? state.reports : null;
  return <section className="space-y-6">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><h1 className="text-3xl font-bold text-navy">History & reports</h1><p className="mt-2 text-muted">The latest saved assessments for your astronaut profile.</p></div><button disabled={!profile.id || loading} onClick={() => { setState({ id: null, reports: null }); setAttempt(value => value + 1); }} className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-semibold text-primary disabled:opacity-40">Refresh reports</button></div>
    <AstronautProfileCard />
    {state.id === profile.id && state.error && <p role="alert" className="text-red-800">{state.error}</p>}
    {loading && <p role="status">Loading saved reports…</p>}
    {reports?.length === 0 && <p role="status" className="rounded-2xl border border-line bg-white p-8 text-center text-muted">No saved reports yet. Complete an assessment to start your history.</p>}
    <ul className="space-y-3">{reports?.map(report => <li key={report._id} className="rounded-2xl border border-line bg-white p-5">
      <Link className="font-bold text-primary underline" to={`/reports/${report._id}`}>{report.assessment.name}</Link>
      <p className="text-sm text-muted mt-2">{new Date(report.createdAt || report.assessment.date).toLocaleString()} · {report.astronaut.mission} · Day {report.astronaut.day}</p>
    </li>)}</ul>
  </section>;
}
