const LeftPaddingCard = ({ icon, status, name, value, unit, refRange, lastRecorded }) => {

  const statusClass = status === 'normal' ? 'border-green-500' : status === 'critical' ? 'border-red-500' : status === 'warning' ? 'border-orange-500' : 'border-gray-300';
  const badgeClass = status === 'normal' ? 'bg-green-200 border-green-500 text-green-800' : status === 'critical' ? 'bg-red-200 border-red-500 text-red-800' : status === 'warning' ? 'bg-orange-200 border-orange-500 text-orange-800' : 'bg-gray-300 border-gray-300 text-gray-800';
  const dotClass = status === 'normal' ? 'bg-green-500' : status === 'critical' ? 'bg-red-500' : status === 'warning' ? 'bg-orange-500' : 'bg-gray-500';
  const statusIcon = status === 'normal' ? '✓' : status === 'critical' ? '✕' : status === 'warning' ? '!' : 'i';

  return (
    <div className={`card w-60 shadow-sm border border-l-[10px] rounded-2xl p-5 pb-12 space-y-3 ${statusClass}`}>
      <div className="flex items-center gap-2.5">
        <span className="bg-[#1D4F9C]/10 text-[#1D4F9C] rounded-lg p-2.5 inline-flex items-center justify-center text-2xl">{icon}</span>
        <div className="card-title mb-0 pt-0 text-lg font-medium text-gray-600">{name}</div>
      </div>

      <div className="big-number text-5xl font-medium text-gray-700">
        {value} <span className="text-3xl font-medium text-gray-500">{unit}</span>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className={`status mt-0 inline-flex items-center rounded-full gap-2 border py-0.5 pl-1 pr-2.5 text-lg font-medium capitalize ${badgeClass}`}>
          <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white ${dotClass}`}>{statusIcon}</span>
          {status}
        </span>
        {refRange && <span className="text-base text-gray-500">Ref {refRange}</span>}
      </div>

      <div className="text-base text-gray-500 leading-snug">
        Last recorded {lastRecorded}
      </div>
    </div>
  )
}

export default LeftPaddingCard;