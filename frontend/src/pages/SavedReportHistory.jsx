import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestApi } from '../api/assessments.js';

export default function SavedReportHistory() {
  const [astronautId, setAstronautId] = useState('');
  const [state, setState] = useState({ reports: null, loading: false });
  const pending = useRef(null);
  useEffect(() => () => pending.current?.abort(), []);
  async function search(event) {
    event.preventDefault();
    if (!astronautId.trim()) { setState({ reports: null, error: 'Enter an astronaut ID.' }); return; }
    pending.current?.abort();
    const controller = new AbortController();
    pending.current = controller;
    setState({ loading: true, reports: null });
    try {
      const data = await requestApi(`/reports?astronaut_id=${encodeURIComponent(astronautId.trim())}`, { signal: controller.signal });
      if (!controller.signal.aborted) setState({ reports: data.reports });
    } catch (error) {
      if (!controller.signal.aborted) setState({ error: error.message, reports: null });
    }
  }
  return <section className="space-y-6">
    <h1 className="text-3xl font-bold text-navy">History & Reports</h1>
    <p className="text-muted">Find the latest 100 saved reports for an astronaut.</p>
    <form noValidate onSubmit={search} className="rounded-3xl border border-line bg-white p-6 space-y-4">
      <label htmlFor="report-astronaut" className="block font-semibold">Astronaut ID</label>
      <input id="report-astronaut" value={astronautId} onChange={event => setAstronautId(event.target.value)} className="w-full rounded-xl border border-line p-3 focus:ring-2 focus:ring-primary" />
      <button disabled={state.loading} className="rounded-full bg-primary text-white px-6 py-3 disabled:opacity-60">{state.loading ? 'Loading…' : 'Find reports'}</button>
    </form>
    {state.error && <p role="alert" className="text-red-800">{state.error}</p>}
    {state.loading && <p role="status">Loading saved reports…</p>}
    {state.reports?.length === 0 && <p role="status">No saved reports for this astronaut.</p>}
    <ul className="space-y-3">{state.reports?.map(report => <li key={report._id} className="rounded-2xl border border-line bg-white p-5">
      <Link className="font-bold text-primary underline" to={`/reports/${report._id}`}>{report.assessment.name}</Link>
      <p className="text-sm text-muted">{new Date(report.createdAt || report.assessment.date).toLocaleString()} · {report.astronaut.mission} · Day {report.astronaut.day}</p>
    </li>)}</ul>
  </section>;
}
