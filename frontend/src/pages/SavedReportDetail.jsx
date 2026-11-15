import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { requestApi } from '../api/assessments.js';
import SavedReport from '../Components/SavedReport';

export default function SavedReportDetail() {
  const { id } = useParams();
  const [state, setState] = useState({ id: null });
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    requestApi(`/reports/${encodeURIComponent(id)}`, { signal: controller.signal })
      .then(data => { if (!controller.signal.aborted) setState({ id, report: data.report }); })
      .catch(error => { if (!controller.signal.aborted) setState({ id, error: error.message }); });
    return () => controller.abort();
  }, [id, attempt]);
  if (state.id !== id) return <p role="status">Loading report…</p>;
  if (state.error) return <div className="space-y-4"><p role="alert">{state.error}</p><button className="text-primary underline" onClick={() => { setState({ id: null }); setAttempt(value => value + 1); }}>Retry</button><Link to="/reports" className="block text-primary underline">All reports</Link></div>;
  return <SavedReport report={state.report} />;
}
