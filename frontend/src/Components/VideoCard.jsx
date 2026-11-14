const VideoCard = ({ thumbnail, badgeText, icon, category, title, description, duration, onWatch }) => {

  return (
    <div className="card w-80 shadow-sm flex flex-col p-0 rounded-2xl border border-gray-300 overflow-hidden space-y-0">
      <div className="relative h-44 w-full bg-[#0A1B33] flex items-center justify-center">
        {thumbnail ? (
          <img src={thumbnail} alt={title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-white/90 text-5xl">{icon}</span>
        )}

        {badgeText && (
          <span className="absolute top-3 left-3 bg-white/90 text-gray-800 text-xs font-bold px-2.5 py-1 rounded uppercase tracking-wide">
            {badgeText}
          </span>
        )}

        {duration && (
          <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-0.5 rounded">
            {duration}
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col space-y-2.5">
        <div className="card-title mb-0 text-xs font-bold uppercase tracking-wider pt-0 text-[#1D4F9C]">
          {category}
        </div>

        <h3 className="font-bold text-gray-900 text-xl leading-snug">
          {title}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed">
          {description}
        </p>

        <div className="text-gray-500 text-sm flex items-center gap-1.5 pt-1">
          <span>🕒</span>
          <span>{duration}</span>
        </div>

        <button
          onClick={onWatch}
          className="w-full bg-[#1D4F9C] hover:bg-[#173F7D] text-white font-semibold text-base py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer mt-2"
        >
          <span>▷</span>
          <span>Watch Video</span>
        </button>
      </div>
    </div>
  )
}

export default VideoCard;