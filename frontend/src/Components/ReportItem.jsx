const ReportItem = ({ icon, status, name, type, dateTime, reportId, summary, onView }) => {

  const badgeClass = status === 'normal' ? 'bg-green-200 border-green-500 text-green-800' : status === 'critical' ? 'bg-red-200 border-red-500 text-red-800' : status === 'warning' ? 'bg-orange-200 border-orange-500 text-orange-800' : 'bg-gray-300 border-gray-300 text-gray-800';
  const dotClass = status === 'normal' ? 'bg-green-500' : status === 'critical' ? 'bg-red-500' : status === 'warning' ? 'bg-orange-500' : 'bg-gray-500';
  const statusIcon = status === 'normal' ? '✓' : status === 'critical' ? '✕' : status === 'warning' ? '!' : 'i';

  return (
    <div onClick={onView} className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer hover:bg-white transition-colors">
      <span className="bg-[#0A1B33] text-white rounded-xl p-4 inline-flex shrink-0 items-center justify-center text-3xl">{icon}</span>

      <div className="flex-1 space-y-1">
        <h3 className="font-bold text-gray-900 text-2xl leading-snug">
          {name}
        </h3>

        <div className="text-gray-500 text-base">
          {type} · {dateTime} · <span className="font-mono font-bold text-gray-600">{reportId}</span>
        </div>

        <p className="text-gray-700 text-base leading-relaxed">
          {summary}
        </p>
      </div>

      <div className={`status mt-0 inline-flex shrink-0 items-center rounded-full gap-2 border py-0.5 pl-1 pr-2.5 text-base font-bold uppercase ${badgeClass}`}>
        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white ${dotClass}`}>{statusIcon}</span>
        {status}
      </div>

      <span className="text-gray-500 text-3xl">›</span>
    </div>
  )
}

export default ReportItem;