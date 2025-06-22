'use client'

import { Play } from 'lucide-react'

interface LeadershipMember {
  name: string
  role: string
  bio: string
  media_url?: string
  media_type: 'image' | 'video'
  areas_of_ministry: string[]
  button_text?: string
  button_link?: string
}

interface LeadershipTeamSectionProps {
  first_line?: string
  main_header?: string
  subheader?: string
  head_pastor?: LeadershipMember
  other_pastors?: LeadershipMember[]
}

export function LeadershipTeamSection({
  first_line = "Our Team",
  main_header = "Leadership Team",
  subheader = "Meet the passionate leaders who guide our church with wisdom, compassion, and dedication to serving God and our community",
  head_pastor = {
    name: "Pastor Michael Johnson",
    role: "Lead Pastor", 
    bio: "With over 15 years of ministry experience, Pastor Michael brings passion for teaching and community building to DOCM Church. His heart for community building and biblical teaching has helped shape our church into the welcoming, Christ-centered family we are today.",
    media_url: "",
    media_type: "video",
    areas_of_ministry: ["Teaching", "Community Building", "Pastoral Care"],
    button_text: "Watch Message",
    button_link: "#"
  },
  other_pastors = [
    {
      name: "Sarah Williams",
      role: "Worship Director",
      bio: "Sarah leads our worship ministry with a heart for creating meaningful encounters with God through music and praise.",
      media_url: "",
      media_type: "video", 
      areas_of_ministry: ["Worship Leading", "Music Ministry", "Creative Arts"]
    },
    {
      name: "David Chen", 
      role: "Youth Pastor",
      bio: "David is passionate about helping young people discover their identity in Christ and grow in their faith journey.",
      media_url: "",
      media_type: "video",
      areas_of_ministry: ["Youth Ministry", "Discipleship", "Mentoring"]
    },
    {
      name: "Maria Rodriguez",
      role: "Children's Director",
      bio: "Maria creates engaging and safe environments where children can learn about God's love and develop their faith.",
      media_url: "",
      media_type: "video",
      areas_of_ministry: ["Children's Ministry", "Family Programs", "Education"]
    }
  ]
}: LeadershipTeamSectionProps) {

  const getGradientForIndex = (index: number) => {
    const gradients = [
      "from-blue-800 to-indigo-900",
      "from-purple-800 to-pink-900", 
      "from-green-800 to-emerald-900",
      "from-orange-800 to-red-900",
      "from-teal-800 to-cyan-900",
      "from-pink-800 to-rose-900"
    ];
    return gradients[index % gradients.length];
  };

  const renderMediaContainer = (member: LeadershipMember, gradient: string, size: 'large' | 'medium') => {
    const heights = {
      large: "h-[600px]",
      medium: "h-80"
    };

    const playButtonSizes = {
      large: "w-24 h-24",
      medium: "w-16 h-16"
    };

    const playIconSizes = {
      large: "w-10 h-10",
      medium: "w-6 h-6"
    };

    return (
      <div className={`relative ${heights[size]} rounded-3xl overflow-hidden group cursor-pointer`}>
        {member.media_url ? (
          member.media_type === 'video' ? (
            <video 
              className="absolute inset-0 w-full h-full object-cover"
              poster={member.media_url}
              muted
              loop
              playsInline
            >
              <source src={member.media_url} type="video/mp4" />
            </video>
          ) : (
            <img 
              src={member.media_url} 
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`}>
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
                  backgroundSize: size === 'large' ? '40px 40px' : '25px 25px',
                  animation: `moveBackground ${size === 'large' ? '25s' : '20s'} linear infinite`
                }}
              ></div>
            </div>
          </div>
        )}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Play Button (only show for video content) */}
        {member.media_type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`${playButtonSizes[size]} bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300`}>
              <Play className={`${playIconSizes[size]} text-white ml-1`} />
            </div>
          </div>
        )}
        
        {/* Leader Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
          <h3 className={`${size === 'large' ? 'text-2xl' : 'text-xl'} font-bold text-white mb-2`}>
            {member.name}
          </h3>
          <p className={`text-gray-200 ${size === 'large' ? 'font-medium' : 'text-sm'}`}>
            {member.role}
          </p>
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-white">
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

        {/* Featured Head Pastor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="relative">
            {renderMediaContainer(head_pastor, getGradientForIndex(0), 'large')}
          </div>

          <div>
            <h3 className="text-4xl font-bold text-gray-900 mb-6">{head_pastor.name}</h3>
            <p className="text-xl text-blue-600 font-semibold mb-6">{head_pastor.role}</p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {head_pastor.bio}
            </p>
            
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Areas of Ministry:</h4>
              <div className="flex flex-wrap gap-3">
                {head_pastor.areas_of_ministry.map((area, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
                    {area}
                  </span>
                ))}
              </div>
            </div>
            
            {head_pastor.button_text && (
              <a 
                href={head_pastor.button_link || '#'}
                className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-3"
              >
                {head_pastor.button_text}
                <div className="w-6 h-6 border border-current rounded-full flex items-center justify-center">
                  <Play className="w-3 h-3 ml-0.5" />
                </div>
              </a>
            )}
          </div>
        </div>

        {/* Other Leadership Team Members */}
        {other_pastors && other_pastors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {other_pastors.map((pastor, index) => (
              <div key={index} className="group cursor-pointer">
                {renderMediaContainer(pastor, getGradientForIndex(index + 1), 'medium')}
                
                <div className="space-y-4 mt-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                      {pastor.name}
                    </h3>
                    <p className="text-blue-600 font-semibold">{pastor.role}</p>
                  </div>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {pastor.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {pastor.areas_of_ministry.slice(0, 2).map((area, i) => (
                      <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        {area}
                      </span>
                    ))}
                    {pastor.areas_of_ministry.length > 2 && (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        +{pastor.areas_of_ministry.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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