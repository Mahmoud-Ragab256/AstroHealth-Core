const AssessmentCard = ({ status, name, description, required, lastAssessment, onStart }) => {

  const badgeClass = status === 'normal' ? 'bg-green-200 border-green-500 text-green-800' : status === 'critical' ? 'bg-red-200 border-red-500 text-red-800' : status === 'warning' ? 'bg-orange-200 border-orange-500 text-orange-800' : 'bg-gray-300 border-gray-300 text-gray-800';
  const dotClass = status === 'normal' ? 'bg-green-500' : status === 'critical' ? 'bg-red-500' : status === 'warning' ? 'bg-orange-500' : 'bg-gray-500';
  const statusIcon = status === 'normal' ? '✓' : status === 'critical' ? '✕' : status === 'warning' ? '!' : 'i';

  return (
    <div className="card w-96 shadow-sm flex flex-col p-6 rounded-3xl border border-gray-300 space-y-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-bold text-gray-900 text-2xl leading-snug">
          {name}
        </h3>

        <div className={`status mt-1 inline-flex shrink-0 items-center rounded-full gap-2 border py-0.5 pl-1 pr-2.5 text-base font-bold uppercase ${badgeClass}`}>
          <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white ${dotClass}`}>{statusIcon}</span>
          {status}
        </div>
      </div>

      <p className="text-gray-700 text-lg leading-relaxed">
        {description}
      </p>

      <p className="text-gray-500 text-base leading-relaxed">
        <span className="font-bold text-gray-800">Required:</span> {required}
      </p>

      <div className="text-gray-500 text-base">
        Last assessment: <span className="font-bold text-gray-900">{lastAssessment}</span>
      </div>

      <button
        onClick={onStart}
        className="w-full bg-[#1D4F9C] hover:bg-[#173F7D] text-white font-semibold text-lg py-3.5 px-4 rounded-full flex items-center justify-center gap-2.5 transition-colors cursor-pointer mt-2"
      >
        <span>📋</span>
        <span>Start Assessment</span>
        <span>↗</span>
      </button>
    </div>
  )
}

export default AssessmentCard;