'use client'

import { useAbout } from '@/hooks/useAbout'

export function Leadership() {
  const { about, loading, error, source } = useAbout()
  const leadershipContent = about?.leadership

  // Default leaders for fallback
  const defaultLeaders = [
    {
      name: "Pastor Michael Johnson",
      position: "Lead Pastor",
      bio: "With over 15 years of ministry experience, Pastor Michael brings passion for teaching and community building to DOCM Church.",
      image_url: "",
      social_links: [],
      specialties: ["Teaching", "Community Building", "Pastoral Care"],
      gradient: "from-blue-800 to-indigo-900"
    },
    {
      name: "Sarah Williams",
      position: "Worship Director", 
      bio: "Sarah leads our worship ministry with a heart for creating meaningful encounters with God through music and praise.",
      image_url: "",
      social_links: [],
      specialties: ["Worship Leading", "Music Ministry", "Creative Arts"],
      gradient: "from-purple-800 to-pink-900"
    },
    {
      name: "David Chen",
      position: "Youth Pastor",
      bio: "David is passionate about helping young people discover their identity in Christ and grow in their faith journey.",
      image_url: "",
      social_links: [],
      specialties: ["Youth Ministry", "Discipleship", "Mentoring"],
      gradient: "from-green-800 to-emerald-900"
    },
    {
      name: "Maria Rodriguez",
      position: "Children's Director",
      bio: "Maria creates engaging and safe environments where children can learn about God's love and develop their faith.",
      image_url: "",
      social_links: [],
      specialties: ["Children's Ministry", "Family Programs", "Education"],
      gradient: "from-orange-800 to-red-900"
    },
    {
      name: "James Thompson",
      position: "Outreach Coordinator",
      bio: "James coordinates our community outreach efforts, connecting our church with local needs and global missions.",
      image_url: "",
      social_links: [],
      specialties: ["Community Outreach", "Missions", "Social Justice"],
      gradient: "from-teal-800 to-cyan-900"
    },
    {
      name: "Lisa Anderson",
      position: "Administrative Pastor",
      bio: "Lisa oversees our church operations, ensuring excellence in all administrative and organizational aspects.",
      image_url: "",
      social_links: [],
      specialties: ["Administration", "Operations", "Strategic Planning"],
      gradient: "from-pink-800 to-rose-900"
    }
  ]

  // Use CMS team members or fallback to default
  const teamMembers = (leadershipContent?.team_members && leadershipContent.team_members.length > 0)
    ? leadershipContent.team_members.map((member, index) => ({
        ...member,
        // Use areas_of_ministry from CMS if available, otherwise fallback to splitting bio or default
        specialties: member.areas_of_ministry && member.areas_of_ministry.length > 0 
          ? member.areas_of_ministry 
          : (member.bio ? member.bio.split(',').slice(0, 3) : defaultLeaders[index % defaultLeaders.length]?.specialties || []),
        gradient: defaultLeaders[index % defaultLeaders.length]?.gradient || "from-gray-800 to-gray-900"
      }))
    : defaultLeaders

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="w-20 h-4 bg-gray-300 rounded mx-auto mb-6"></div>
            <div className="h-16 bg-gray-300 rounded mx-auto mb-8 max-w-md"></div>
            <div className="h-4 bg-gray-300 rounded mx-auto max-w-3xl"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="h-[600px] bg-gray-300 rounded-3xl"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gray-300 rounded"></div>
              <div className="h-6 bg-gray-300 rounded w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">Error loading leadership: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  const featuredLeader = teamMembers[0]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            {leadershipContent?.subtitle || "Our Team"}
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            {leadershipContent?.title || "Leadership Team"}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {leadershipContent?.description || "Meet the passionate leaders who guide our church with wisdom, compassion, and dedication to serving God and our community"}
          </p>
        </div>

        {/* Featured Leader */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            <div className="relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer">
              {featuredLeader.image_url ? (
                <img
                  src={featuredLeader.image_url}
                  alt={featuredLeader.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  {/* Video Background Placeholder */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${featuredLeader.gradient}`}>
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
                          backgroundSize: '40px 40px',
                          animation: 'moveBackground 25s linear infinite'
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                      <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </>
              )}
              
              {/* Leader Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-2xl font-bold text-white mb-2">{featuredLeader.name}</h3>
                <p className="text-gray-200 font-medium">{featuredLeader.position}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">{featuredLeader.name}</h3>
            <p className="text-xl text-blue-600 font-semibold mb-6">{featuredLeader.position}</p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {featuredLeader.bio}
            </p>
            
            {featuredLeader.specialties && featuredLeader.specialties.length > 0 && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Areas of Ministry:</h4>
                <div className="flex flex-wrap gap-3">
                  {featuredLeader.specialties.slice(0, 3).map((specialty: string, index: number) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <a 
              href="/media/sermons"
              className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-3"
            >
              Watch Message
              <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Leadership Grid */}
        {teamMembers.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.slice(1).map((leader, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                  {leader.image_url ? (
                    <img
                      src={leader.image_url}
                      alt={leader.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <>
                      {/* Video Background Placeholder */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${leader.gradient}`}>
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
                              backgroundSize: '25px 25px',
                              animation: `moveBackground ${20 + index * 4}s linear infinite`
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                          <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Leader Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-bold text-white mb-1">{leader.name}</h3>
                    <p className="text-gray-200 text-sm">{leader.position}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                      {leader.name}
                    </h3>
                    <p className="text-blue-600 font-semibold">{leader.position}</p>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {leader.bio}
                  </p>
                  {leader.specialties && leader.specialties.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {leader.specialties.slice(0, 2).map((specialty: string, i: number) => (
                        <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Join Leadership CTA */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Called to Serve?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for passionate individuals to join our leadership team. 
              If you feel called to serve and make a difference, we'd love to hear from you.
            </p>
            <a 
              href="/contact"
              className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(40px) translateY(40px); }
        }
      `}</style>
    </section>
  )
} 