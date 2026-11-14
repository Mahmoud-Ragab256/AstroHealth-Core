import { useState, useMemo } from 'react';
import VideoCard from '../../Components/VideoCard';

const EmergencyVideos = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [activeVideo, setActiveVideo] = useState(null);

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
      title: 'Recognising cardiac emergencies',
      description: 'Identify early warning signs of arrhythmia, ischemia, and acute cardiac distress in microgravity.',
      duration: '4:15',
      bgColor: 'bg-[#4A2020]',
      icon: '🫀',
      recentlyWatched: false,
      recommended: true,
    },
    {
      id: 2,
      category: 'Cardiac Emergencies',
      title: 'Using the on-board defibrillator',
      description: 'Step-by-step AED pad placement, restraint harness setup, and shock delivery in zero-G.',
      duration: '5:40',
      bgColor: 'bg-[#4A2020]',
      icon: '⚡',
      recentlyWatched: false,
      recommended: true,
    },
    {
      id: 3,
      category: 'Respiratory Emergencies',
      title: 'Respiratory distress in a closed cabin',
      description: 'Immediate airway management, CO2 toxicity check, and emergency O2 mask protocol.',
      duration: '3:50',
      bgColor: 'bg-[#1D3E47]',
      icon: '🫁',
      recentlyWatched: false,
      recommended: true,
    },
    {
      id: 4,
      category: 'Respiratory Emergencies',
      title: 'Oxygen supply and masks',
      description: 'Switching to portable emergency oxygen bottles and verifying seal integrity.',
      duration: '3:10',
      bgColor: 'bg-[#1D3E47]',
      icon: '🤿',
      recentlyWatched: false,
      recommended: false,
    },
    {
      id: 5,
      category: 'Injuries & Trauma',
      title: 'Managing cuts and bleeding',
      description: 'Hemostatic dressings, pressure bandages, and fluid containment in microgravity.',
      duration: '4:05',
      bgColor: 'bg-[#4D3422]',
      icon: '🩹',
      recentlyWatched: false,
      recommended: false,
    },
    {
      id: 6,
      category: 'Injuries & Trauma',
      title: 'Slips and fractures in space',
      description: 'Immobilizing limb injuries using inflatable splints and crew restraint straps.',
      duration: '4:55',
      bgColor: 'bg-[#4D3422]',
      icon: '🦴',
      recentlyWatched: false,
      recommended: false,
    },
    {
      id: 7,
      category: 'Medical Procedures',
      title: 'Allergic reaction response',
      description: 'Administering epinephrine auto-injectors and monitoring airway swelling.',
      duration: '3:30',
      bgColor: 'bg-[#36224A]',
      icon: '💉',
      recentlyWatched: false,
      recommended: false,
    },
    {
      id: 8,
      category: 'Medical Procedures',
      title: 'Contacting ground medical support',
      description: 'Establishing priority telemedicine link and transmitting live biometric telemetry.',
      duration: '2:45',
      bgColor: 'bg-[#262652]',
      icon: '📡',
      recentlyWatched: false,
      recommended: false,
    },
    {
      id: 9,
      category: 'First Aid',
      title: 'First aid kit orientation',
      description: 'Complete inventory layout of the primary spacecraft medical locker and trauma pack.',
      duration: '3:20',
      bgColor: 'bg-[#204532]',
      icon: '🧰',
      recentlyWatched: true,
      recommended: false,
    },
    {
      id: 10,
      category: 'First Aid',
      title: 'Immediate support to a crewmate',
      description: 'Initial triage, stabilising an unresponsive crewmember, and clearing the workspace.',
      duration: '4:10',
      bgColor: 'bg-[#204532]',
      icon: '🩺',
      recentlyWatched: true,
      recommended: false,
    },
    {
      id: 11,
      category: 'Preventive Procedures',
      title: 'Daily health check routine',
      description: 'Morning vital signs, pulse oximetry, and dosimeter logging workflow.',
      duration: '2:50',
      bgColor: 'bg-[#1E334A]',
      icon: '🛡️',
      recentlyWatched: false,
      recommended: false,
    },
    {
      id: 12,
      category: 'Preventive Procedures',
      title: 'Cabin air quality checks',
      description: 'Inspecting O2/CO2 scrubbers and trace contaminant monitors across modules.',
      duration: '3:15',
      bgColor: 'bg-[#1F423B]',
      icon: '🌬️',
      recentlyWatched: false,
      recommended: false,
    },
  ];

  const recentlyWatchedVideos = useMemo(
    () => allVideos.filter((v) => v.recentlyWatched),
    []
  );

  const recommendedVideos = useMemo(
    () => allVideos.filter((v) => v.recommended),
    []
  );

  const filteredVideos = useMemo(() => {
    return allVideos.filter((video) => {
      const matchesCategory =
        selectedCategory === 'All categories' || video.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query) ||
        video.category.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const renderVideoGrid = (videosList) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch">
      {videosList.map((video) => (
        <div
          key={video.id}
          className="h-full [&_.card]:h-full [&_.card]:w-full [&_.card]:flex [&_.card]:flex-col [&_.card]:bg-white [&_.card>div:first-child]:h-36 [&_.card>div:first-child]:shrink-0 [&_.card>div:nth-child(2)]:flex-1 [&_.card>div:nth-child(2)]:flex [&_.card>div:nth-child(2)]:flex-col [&_.card>div:nth-child(2)]:p-4 [&_.card>div:nth-child(2)]:space-y-2 [&_.card_h3]:text-base [&_.card_h3]:line-clamp-2 [&_.card_p]:text-xs [&_.card_p]:line-clamp-2 [&_.card_button]:mt-auto [&_.card_button]:py-2 [&_.card_button]:text-sm"
        >
          <VideoCard
            badge="DEMONSTRATION"
            duration={video.duration}
            category={video.category}
            title={video.title}
            description={video.description}
            thumbnail={
              <div
                className={`w-full h-full ${video.bgColor} flex items-center justify-center text-white/90 text-3xl`}
              >
                <span className="h-12 w-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                  {video.icon}
                </span>
              </div>
            }
            onWatch={() => setActiveVideo(video)}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col space-y-8">
      {/* 1. Search & Category Filter Box */}
      <div className="rounded-3xl border border-gray-300 bg-white p-5 md:p-6 shadow-sm space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#0A1B33]">
            Search videos
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-gray-400 text-base pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description, or category..."
              className="w-full rounded-2xl border border-gray-300 bg-white pl-11 pr-4 py-2.5 text-sm text-gray-900 focus:border-[#1D4F9C] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {categories.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${isActive
                  ? 'bg-[#1D4F9C] text-white'
                  : 'bg-[#EDF2F9] text-[#203040] hover:bg-[#D8E0E7]'
                  }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Recently Watched Section (Hidden when searching/filtering) */}
      {!searchQuery && selectedCategory === 'All categories' && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0A1B33]">
            Recently Watched
          </h2>
          {renderVideoGrid(recentlyWatchedVideos)}
        </section>
      )}

      {/* 3. Recommended Section (Hidden when searching/filtering) */}
      {!searchQuery && selectedCategory === 'All categories' && (
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0A1B33]">
            Recommended
          </h2>
          {renderVideoGrid(recommendedVideos)}
        </section>
      )}

      {/* 4. All Videos Section */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-[#0A1B33]">
          All Videos ({filteredVideos.length})
        </h2>

        {filteredVideos.length > 0 ? (
          renderVideoGrid(filteredVideos)
        ) : (
          <div className="rounded-3xl border border-gray-300 bg-white p-8 text-center text-gray-500 text-sm">
            No training videos match your current search or category filter.
          </div>
        )}
      </section>

      {/* Video Player Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white border border-gray-300 overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={`h-64 ${activeVideo.bgColor} flex flex-col items-center justify-center text-white p-6 text-center space-y-3`}
            >
              <span className="text-5xl">{activeVideo.icon}</span>
              <span className="rounded-full bg-black/40 px-3 py-1 text-xs font-mono">
                DEMONSTRATION PLAYER · {activeVideo.duration}
              </span>
            </div>

            <div className="p-6 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1D4F9C]">
                  {activeVideo.category}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="text-sm font-bold text-gray-500 hover:text-gray-900 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                {activeVideo.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyVideos;