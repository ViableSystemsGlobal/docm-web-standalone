'use client'

import { Play } from 'lucide-react'

interface MissionVisionItem {
  title: string
  description: string
  media_url?: string
  media_type: 'image' | 'video'
  items: string[]
}

interface MissionVisionSectionProps {
  first_line?: string
  main_header?: string
  subheader?: string
  mission?: MissionVisionItem
  vision?: MissionVisionItem
}

export function MissionVisionSection({
  first_line = "Our Purpose",
  main_header = "Mission & Vision", 
  subheader = "Our mission guides everything we do, and our vision inspires where we're going",
  mission = {
    title: "Our Mission",
    description: "To make disciples of Jesus Christ by loving God, loving others, and serving our community with excellence, integrity, and unwavering compassion.",
    media_url: "",
    media_type: "video",
    items: [
      "Loving God: Through worship, prayer, and biblical study",
      "Loving Others: Building authentic relationships and community", 
      "Serving Community: Meeting needs with compassion and excellence"
    ]
  },
  vision = {
    title: "Our Vision", 
    description: "To be a thriving, Christ-centered community that transforms lives, strengthens families, and impacts our local and global neighborhoods for the Kingdom of God.",
    media_url: "",
    media_type: "video",
    items: [
      "Thriving Community: A place where everyone belongs and grows",
      "Transformed Lives: Experiencing the life-changing power of Jesus",
      "Global Impact: Reaching beyond our walls to serve the world"
    ]
  }
}: MissionVisionSectionProps) {

  const renderMediaCard = (item: MissionVisionItem, colorScheme: 'blue' | 'purple') => {
    const gradients = {
      blue: "from-blue-900 via-indigo-900 to-purple-900",
      purple: "from-purple-900 via-pink-900 to-red-900"
    };

    const accentColors = {
      blue: "bg-blue-600",
      purple: "bg-purple-600"
    };

    return (
      <div className="space-y-8">
        <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer">
          {item.media_url ? (
            item.media_type === 'video' ? (
              <video 
                className="absolute inset-0 w-full h-full object-cover"
                poster={item.media_url}
                muted
                loop
                playsInline
              >
                <source src={item.media_url} type="video/mp4" />
              </video>
            ) : (
              <img 
                src={item.media_url} 
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )
          ) : (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradients[colorScheme]}`}>
              <div className="absolute inset-0 bg-black/40"></div>
              
              {/* Simulated video pattern */}
              <div className="absolute inset-0 opacity-20">
                <div 
                  className="h-full w-full"
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                      linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                    `,
                    backgroundSize: '30px 30px',
                    animation: `moveBackground ${colorScheme === 'blue' ? '35s' : '40s'} linear infinite ${colorScheme === 'purple' ? 'reverse' : ''}`
                  }}
                ></div>
              </div>
            </div>
          )}
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/40"></div>
          
          {/* Play Button (only show for video content) */}
          {item.media_type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
            </div>
          )}
          
          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-gray-200">{item.description.substring(0, 50)}...</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">{item.title}</h3>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            {item.description}
          </p>
          
          <div className="space-y-4">
            {item.items.map((listItem, index) => {
              const [title, description] = listItem.split(': ');
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-6 h-6 ${accentColors[colorScheme]} rounded-full flex items-center justify-center flex-shrink-0 mt-1`}>
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    {title && description ? (
                      <>
                        <strong>{title}:</strong> {description}
                      </>
                    ) : (
                      listItem
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            {first_line}
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            {main_header}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {subheader}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Mission */}
          {renderMediaCard(mission, 'blue')}

          {/* Vision */}
          {renderMediaCard(vision, 'purple')}
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(30px) translateY(30px); }
        }
      `}</style>
    </section>
  );
} 