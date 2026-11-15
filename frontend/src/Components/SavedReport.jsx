import { Link } from 'react-router-dom';

function ResultValue({ value }) {
  if (value == null) return <span>Not provided</span>;
  if (typeof value !== 'object') return <span className="whitespace-pre-wrap break-words">{String(value)}</span>;
  if (Array.isArray(value)) return <ul className="space-y-2 list-disc pl-5">{value.map((item, index) => <li key={index}><ResultValue value={item} /></li>)}</ul>;
  return <dl className="space-y-3">{Object.entries(value).map(([key, item]) => <div key={key} className="border-l-2 border-line pl-3">
    <dt className="font-semibold capitalize">{key.replaceAll('_', ' ')}</dt><dd className="mt-1"><ResultValue value={item} /></dd>
  </div>)}</dl>;
}

export default function SavedReport({ report }) {
  const measurements = report.inputMeasurements?.length ? report.inputMeasurements : report.measurements || [];
  const result = report.modelResponse || { diagnosis: report.diagnosis, prediction: report.prediction, recommendation: report.recommendation };
  return <article className="space-y-6 pb-10 min-w-0">
    <div className="flex flex-wrap gap-4 print:hidden">
      <Link to="/reports" className="text-primary underline">All reports</Link>
      <button onClick={() => window.print()} className="text-primary underline">Print report</button>
    </div>
    <header className="rounded-3xl border border-line bg-white p-6 space-y-2">
      <p role="status" className="text-health font-semibold">Saved report</p>
      <h1 className="text-2xl font-bold text-navy">{report.assessment?.name}</h1>
      <p className="break-all text-sm text-muted">{report._id}</p>
      <p>{report.astronaut?.id} · {report.astronaut?.mission} · Day {report.astronaut?.day}</p>
      <p className="text-sm text-muted">{new Date(report.createdAt || report.assessment?.date).toLocaleString()}</p>
    </header>
    <section className="rounded-3xl border border-line bg-white p-6 space-y-4">
      <h2 className="text-xl font-bold">Submitted measurements</h2>
      <div className="overflow-x-auto"><table className="w-full text-left text-sm">
        <thead><tr><th scope="col" className="p-3">Measurement</th><th scope="col" className="p-3">Value</th><th scope="col" className="p-3">Unit</th></tr></thead>
        <tbody>{measurements.map((row, index) => <tr key={row.key || index} className="border-t border-line"><th scope="row" className="p-3 font-medium">{row.measurement}</th><td className="p-3"><ResultValue value={row.value} /></td><td className="p-3">{row.unit || 'Not provided'}</td></tr>)}</tbody>
      </table></div>
    </section>
    <section className="rounded-3xl border border-line bg-white p-6 space-y-4 break-words">
      <h2 className="text-xl font-bold">Analysis result</h2>
      <ResultValue value={result} />
    </section>
  </article>;
}
