
import { useState, useMemo, useEffect } from 'react';

const EmergencyVideos = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [activeVideo, setActiveVideo] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const categories = [
    'All categories',
    'Cardiac Emergencies',
    'Respiratory Emergencies',
    'Injuries & Trauma',
    'Medical Procedures',
    'First Aid',
    'Preventive Procedures',
  ];

  const allVideos = [
    {
      id: 1,
      category: 'Cardiac Emergencies',
      title: 'Recognising Cardiac Emergencies',
      description: 'Learn how to recognize cardiac emergencies and understand the importance of immediate CPR and emergency support.',
      duration: '3:36',
      videoId: 'rCN5DU897r4',
      source: 'Canadian Red Cross',
      recommended: true,
      recentlyWatched: false,
    },
    {
      id: 2,
      category: 'Cardiac Emergencies',
      title: 'Using the On-board Defibrillator',
      description: 'A practical demonstration of AED operation, pad placement, and safe shock delivery.',
      duration: '4:13',
      videoId: 'UFvL7wTFzl0',
      source: 'St John Ambulance',
      recommended: true,
      recentlyWatched: false,
    },
    {
      id: 3,
      category: 'Respiratory Emergencies',
      title: 'Respiratory Distress and Airway Emergencies',
      description: 'Learn first-aid steps for airway emergencies and how to respond when someone is choking.',
      duration: '4:00',
      videoId: 'PA9hpOnvtCk',
      source: 'St John Ambulance',
      recommended: true,
      recentlyWatched: false,
    },
    {
      id: 4,
      category: 'Respiratory Emergencies',
      title: 'Oxygen Monitoring and Pulse Oximetry',
      description: 'Learn how to use a pulse oximeter and record oxygen saturation readings.',
      duration: '6:54',
      videoId: 'tWlv2V-MJU8',
      source: 'NHS',
      recommended: true,
      recentlyWatched: false,
    },
    {
      id: 5,
      category: 'Injuries & Trauma',
      title: 'Managing Cuts and Severe Bleeding',
      description: 'Practical first-aid demonstration of controlling severe bleeding and applying direct pressure.',
      duration: '4:28',
      videoId: 'NxO5LvgqZe0',
      source: 'St John Ambulance',
      recommended: false,
      recentlyWatched: false,
    },
    {
      id: 6,
      category: 'Injuries & Trauma',
      title: 'Supporting Injured Limbs',
      description: 'Learn how to make and apply a simple arm sling to support an injured limb.',
      duration: '5:00',
      videoId: 'PwfBGkBXkFA',
      source: 'St John Ambulance',
      recommended: false,
      recentlyWatched: false,
    },
    {
      id: 7,
      category: 'Medical Procedures',
      title: 'Allergic Reaction Response',
      description: 'A practical demonstration of using an epinephrine auto-injector during a severe allergic reaction.',
      duration: '4:10',
      videoId: 'T2YKnBmoq2E',
      source: 'Epinephrine Auto-injector Training',
      recommended: false,
      recentlyWatched: false,
    },
    {
      id: 8,
      category: 'Medical Procedures',
      title: 'Medical Care During Spaceflight',
      description: 'Explore how NASA plans and provides medical support for astronauts during space missions.',
      duration: 'NASA Resource',
      videoId: null,
      source: 'NASA',
      sourceUrl: 'https://www.nasa.gov/ochmo/health-and-medical-systems/in-flight-medical-care/',
      recommended: false,
      recentlyWatched: false,
    },
    {
      id: 9,
      category: 'First Aid',
      title: 'First Aid Emergency Assessment',
      description: 'Learn the primary survey and the first steps to take when responding to an emergency.',
      duration: '4:03',
      videoId: 'ea1RJUOiNfQ',
      source: 'St John Ambulance',
      recommended: false,
      recentlyWatched: true,
    },
    {
      id: 10,
      category: 'First Aid',
      title: 'Immediate Support to an Injured Person',
      description: 'Understand the initial assessment and how to provide basic support while waiting for emergency help.',
      duration: '4:03',
      videoId: 'ea1RJUOiNfQ',
      source: 'St John Ambulance',
      recommended: false,
      recentlyWatched: true,
    },
    {
      id: 11,
      category: 'Preventive Procedures',
      title: 'Daily Health Monitoring',
      description: 'Learn how to use a pulse oximeter and monitor basic oxygen saturation readings.',
      duration: '6:54',
      videoId: 'tWlv2V-MJU8',
      source: 'NHS',
      recommended: false,
      recentlyWatched: false,
    },
    {
      id: 12,
      category: 'Preventive Procedures',
      title: 'Medical Care and Health Safety in Space',
      description: 'Explore NASA medical operations and health support for astronauts during spaceflight.',
      duration: 'NASA Resource',
      videoId: null,
      source: 'NASA',
      sourceUrl: 'https://www.nasa.gov/ochmo/health-and-medical-systems/in-flight-medical-care/',
      recommended: false,
      recentlyWatched: false,
    },
  ];

  const recentlyWatchedVideos = useMemo(
    () => allVideos.filter((video) => video.recentlyWatched),
    []
  );

  const recommendedVideos = useMemo(
    () => allVideos.filter((video) => video.recommended),
    []
  );

  const filteredVideos = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return allVideos.filter((video) => {
      const matchesCategory =
        selectedCategory === 'All categories' ||
        video.category === selectedCategory;

      const matchesSearch =
        !query ||
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Modal keyboard and scroll handling
  useEffect(() => {
    if (!activeVideo) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') setActiveVideo(null);
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  const openVideo = (video) => {
    setActiveVideo(video);
  };

  const getThumbnail = (video) => {
    if (!video.videoId) return null;

    return imageErrors[video.id]
      ? `https://img.youtube.com/vi/${video.videoId}/0.jpg`
      : `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
  };

  const renderVideoGrid = (videos) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {videos.map((video) => (
        <article
          key={video.id}
          className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Thumbnail */}
          <button
            type="button"
            onClick={() => openVideo(video)}
            className="relative block w-full aspect-video bg-[#0A1B33] overflow-hidden cursor-pointer"
            aria-label={`Play ${video.title}`}
          >
            {video.videoId ? (
              <img
                src={getThumbnail(video)}
                alt={video.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={() =>
                  setImageErrors((prev) => ({
                    ...prev,
                    [video.id]: true,
                  }))
                }
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A1B33] to-[#274C80] flex items-center justify-center">
                <div className="text-center">
                  <div className="text-3xl mb-2">NASA</div>
                  <span className="text-white/80 text-xs tracking-widest">
                    MEDICAL RESOURCE
                  </span>
                </div>
              </div>
            )}

            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

            {/* Play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/95 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg
                  viewBox="0 0 24 24"
                  className="w-7 h-7 ml-1 text-[#1D4F9C]"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            {/* Duration */}
            <span className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded-md">
              {video.duration}
            </span>
          </button>

          {/* Card Content */}
          <div className="p-4 flex flex-col flex-1 gap-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#1D4F9C]">
                {video.category}
              </span>
              {video.recommended && (
                <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded-full">
                  Recommended
                </span>
              )}
            </div>

            <h3 className="font-bold text-[#0A1B33] text-base leading-snug line-clamp-2 min-h-12">
              {video.title}
            </h3>

            <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
              {video.description}
            </p>

            <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500 truncate">
                {video.source}
              </span>

              <button
                type="button"
                onClick={() => openVideo(video)}
                className="shrink-0 text-xs font-bold text-[#1D4F9C] hover:text-[#0A1B33] transition-colors"
              >
                Watch Now →
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-8">

      {/* Search */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 md:p-6 space-y-5">
        <div>
          <label className="block text-sm font-bold text-[#0A1B33] mb-2">
            Search videos
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔍
            </span>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description, or category..."
              className="w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 py-3 text-sm text-slate-800 outline-none focus:border-[#1D4F9C] focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-[#1D4F9C] text-white shadow-md'
                  : 'bg-[#EDF2F9] text-[#203040] hover:bg-[#D8E0E7]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Recently Watched */}
      {!searchQuery && selectedCategory === 'All categories' && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#0A1B33]">
            Recently Watched
          </h2>
          {renderVideoGrid(recentlyWatchedVideos)}
        </section>
      )}

      {/* Recommended */}
      {!searchQuery && selectedCategory === 'All categories' && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-[#0A1B33]">
            Recommended
          </h2>
          {renderVideoGrid(recommendedVideos)}
        </section>
      )}

      {/* All Videos */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#0A1B33]">
          All Videos ({filteredVideos.length})
        </h2>

        {filteredVideos.length ? (
          renderVideoGrid(filteredVideos)
        ) : (
          <div className="p-10 rounded-2xl bg-white border border-slate-200 text-center text-slate-500">
            No videos found.
          </div>
        )}
      </section>

      {/* Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020817]/90 backdrop-blur-sm p-3 sm:p-6"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setActiveVideo(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={activeVideo.title}
            className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 p-4 sm:p-5 bg-white border-b border-slate-200">
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#1D4F9C] uppercase">
                  {activeVideo.category}
                </span>
                <h3 className="font-bold text-[#0A1B33] text-base sm:text-lg truncate">
                  {activeVideo.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="w-10 h-10 shrink-0 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-xl transition-colors"
                aria-label="Close video"
              >
                ×
              </button>
            </div>

            {/* Player */}
            {activeVideo.videoId ? (
              <div className="w-full aspect-video bg-black">
                <iframe
                  key={activeVideo.id}
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.videoId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            ) : (
              <div className="min-h-[300px] bg-gradient-to-br from-[#0A1B33] to-[#274C80] text-white flex flex-col items-center justify-center text-center p-8 gap-5">
                <h3 className="text-2xl font-bold">
                  NASA Medical Resource
                </h3>
                <p className="max-w-lg text-sm text-white/80">
                  Discover official NASA resources about medical care and astronaut health during spaceflight.
                </p>
                <a
                  href={activeVideo.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-[#0A1B33] px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50"
                >
                  Open NASA Resource ↗
                </a>
              </div>
            )}

            {/* Description */}
            <div className="p-5 sm:p-6 space-y-3">
              <p className="text-sm text-slate-600 leading-relaxed">
                {activeVideo.description}
              </p>

              <div className="flex flex-wrap justify-between items-center gap-3 pt-3 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-500">
                  Source: {activeVideo.source}
                </span>

                {activeVideo.videoId && (
                  <a
                    href={`https://www.youtube.com/watch?v=${activeVideo.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#1D4F9C] hover:underline"
                  >
                    Watch on YouTube ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyVideos;
