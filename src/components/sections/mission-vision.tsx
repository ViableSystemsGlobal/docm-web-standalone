'use client'

import { useAbout } from '@/hooks/useAbout'

export function MissionVision() {
  const { about, loading, error, source } = useAbout()
  const missionVisionContent = about?.mission_vision

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="w-24 h-4 bg-gray-300 rounded mx-auto mb-6"></div>
            <div className="h-16 bg-gray-300 rounded mx-auto mb-8 max-w-md"></div>
            <div className="h-4 bg-gray-300 rounded mx-auto max-w-3xl"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="h-[400px] bg-gray-300 rounded-3xl"></div>
              <div className="bg-gray-300 rounded-2xl h-[300px]"></div>
            </div>
            <div className="space-y-8">
              <div className="h-[400px] bg-gray-300 rounded-3xl"></div>
              <div className="bg-gray-300 rounded-2xl h-[300px]"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading mission & vision: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            {missionVisionContent?.section_title || "Our Purpose"}
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            {missionVisionContent?.section_heading || "Mission & Vision"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {missionVisionContent?.section_description || "Our mission guides everything we do, and our vision inspires where we're going"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Mission */}
          <div className="space-y-8">
            <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer">
              {/* Background Image or Gradient */}
              {missionVisionContent?.mission?.media_url ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${missionVisionContent.mission.media_url})`
                  }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
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
                        animation: 'moveBackground 35s linear infinite'
                      }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Play Button - Only show for gradient backgrounds, not actual images */}
              {!missionVisionContent?.mission?.media_url && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {missionVisionContent?.mission?.title || "Our Mission"}
                </h3>
                <p className="text-gray-200">Making disciples of Jesus Christ</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {missionVisionContent?.mission?.title || "Our Mission"}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {missionVisionContent?.mission?.content || "To make disciples of Jesus Christ by loving God, loving others, and serving our community with excellence, integrity, and unwavering compassion."}
              </p>
              
              <div className="space-y-4">
                {missionVisionContent?.mission?.items && missionVisionContent.mission.items.length > 0 ? (
                  missionVisionContent.mission.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600">{item}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600"><strong>Loving God:</strong> Through worship, prayer, and biblical study</p>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600"><strong>Loving Others:</strong> Building authentic relationships and community</p>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600"><strong>Serving Community:</strong> Meeting needs with compassion and excellence</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Vision */}
          <div className="space-y-8">
            <div className="relative h-[400px] rounded-3xl overflow-hidden group cursor-pointer">
              {/* Background Image or Gradient */}
              {missionVisionContent?.vision?.media_url ? (
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${missionVisionContent.vision.media_url})`
                  }}
                >
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-red-900">
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
                        animation: 'moveBackground 40s linear infinite reverse'
                      }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* Play Button - Only show for gradient backgrounds, not actual images */}
              {!missionVisionContent?.vision?.media_url && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Content Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {missionVisionContent?.vision?.title || "Our Vision"}
                </h3>
                <p className="text-gray-200">Transforming communities through Christ</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                {missionVisionContent?.vision?.title || "Our Vision"}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {missionVisionContent?.vision?.content || "To be a thriving, Christ-centered community that transforms lives, strengthens families, and impacts our local and global neighborhoods for the Kingdom of God."}
              </p>
              
              <div className="space-y-4">
                {missionVisionContent?.vision?.items && missionVisionContent.vision.items.length > 0 ? (
                  missionVisionContent.vision.items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600">{item}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600"><strong>Thriving Community:</strong> A place where everyone belongs and grows</p>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600"><strong>Transformed Lives:</strong> Experiencing the life-changing power of Jesus</p>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-gray-600"><strong>Global Impact:</strong> Reaching beyond our walls to serve the world</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
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
  )
} 