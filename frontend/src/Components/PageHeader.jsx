const PageHeader = ({ bannerImage, tag, step, title, arabicTitle, description, compact = false }) => {

  return (
    <div className="card w-full shadow-sm flex flex-col p-0 rounded-3xl border border-gray-300 overflow-hidden bg-white space-y-0">
      <div className={`relative ${compact ? 'h-36 md:h-44' : 'h-64 md:h-80'} w-full bg-[#0A1B33] flex items-center justify-center`}>
        {bannerImage && (
          <img src={bannerImage} alt={title} className="w-full h-full object-cover" />
        )}
      </div>

      <div
        className="p-6 md:p-8 flex flex-col space-y-3 bg-white"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f3f4f6 1px, transparent 1px), linear-gradient(to bottom, #f3f4f6 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div className="flex items-center justify-between gap-4">
          {tag && (
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500">
              <span className="h-2 w-2 rounded-full bg-orange-400"></span>
              <span>{tag}</span>
            </div>
          )}

          {step && (
            <div className="font-mono text-sm font-bold text-gray-500 tracking-wider">
              {step}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-baseline gap-3">
          <h1 className="font-bold text-gray-900 text-3xl md:text-4xl leading-snug">
            {title}
          </h1>

          {arabicTitle && (
            <span className="text-2xl md:text-3xl font-medium text-gray-600" dir="rtl">
              {arabicTitle}
            </span>
          )}
        </div>

        {description && (
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}

export default PageHeader;
