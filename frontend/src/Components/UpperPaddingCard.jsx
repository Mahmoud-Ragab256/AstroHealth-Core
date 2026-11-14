const UpperPaddingCard = ({ icon, status, name, value, unit, change, updateTime }) => {

  const statusClass = status === 'normal' ? 'border-green-500' : status === 'critical' ? 'border-red-500' : status === 'warning' ? 'border-orange-500' : 'border-gray-300';
  const badgeClass = status === 'normal' ? 'bg-green-200 border-green-500 text-green-800' : status === 'critical' ? 'bg-red-200 border-red-500 text-red-800' : status === 'warning' ? 'bg-orange-200 border-orange-500 text-orange-800' : 'bg-gray-300 border-gray-300 text-gray-800';
  const dotClass = status === 'normal' ? 'bg-green-500' : status === 'critical' ? 'bg-red-500' : status === 'warning' ? 'bg-orange-500' : 'bg-gray-500';
  const statusIcon = status === 'normal' ? '✓' : status === 'critical' ? '✕' : status === 'warning' ? '!' : 'i';

  return (
    <div className={`card w-60 rounded-lg shadow-sm p-4 flex flex-col space-y-1 border-2 border-t-[5px] ${statusClass}`}>
      <div className="flex justify-between items-center">
        <span className="bg-[#1D4F9C]/10 text-[#1D4F9C] rounded-lg p-2.5 inline-flex items-center justify-center text-2xl">{icon}</span>
        <div className={`status mt-0 inline-flex items-center rounded-full gap-2 border py-0.5 pl-1 pr-2.5 text-lg font-medium capitalize ${badgeClass}`}>
          <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold text-white ${dotClass}`}>{statusIcon}</span>
          {status}
        </div>
      </div>
      <div className="card-title mb-0 pt-1 text-lg font-medium text-[#1D4F9C]">{name}</div>
      <div className="big-number text-5xl font-medium text-gray-700">{value} <span className="text-3xl font-medium text-gray-500">{unit}</span></div>

      <div>
        <div className="text-base text-gray-700">{change}</div>
        <div className="text-base text-gray-500">Updated {updateTime}</div>
      </div>
    </div>
  )
}

export default UpperPaddingCard;