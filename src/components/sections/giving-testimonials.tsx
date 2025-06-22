'use client'

export function GivingTestimonials() {
  const testimonials = [
    {
      id: 1,
      quote: "When I lost my job, I didn't know how I was going to feed my family. The church's food pantry didn't just provide groceries – they provided hope and showed us God's love in action.",
      author: "Maria Rodriguez",
      role: "Single Mother of Three",
      image: "family",
      category: "Community Support",
      gradient: "from-blue-600 to-cyan-700"
    },
    {
      id: 2,
      quote: "Thanks to the building fund contributions, we now have a space where our youth can grow in faith. Seeing teenagers encounter God for the first time is worth every penny.",
      author: "Pastor David Kim",
      role: "Youth Ministry Leader",
      image: "youth",
      category: "Building Fund",
      gradient: "from-green-600 to-emerald-700"
    },
    {
      id: 3,
      quote: "The scholarship program allowed me to attend seminary when I couldn't afford it. Now I'm serving as a missionary in Guatemala, sharing the Gospel with indigenous communities.",
      author: "Rev. Sarah Johnson",
      role: "Missionary to Guatemala",
      image: "missions",
      category: "Scholarship Fund",
      gradient: "from-purple-600 to-pink-700"
    },
    {
      id: 4,
      quote: "After my husband passed away, the church's benevolence fund helped with funeral expenses and rent. The support gave me time to grieve and heal while staying in my home.",
      author: "Eleanor Thompson",
      role: "Widow and Mother",
      image: "benevolence",
      category: "Benevolence Fund",
      gradient: "from-orange-600 to-red-700"
    },
    {
      id: 5,
      quote: "The addiction recovery program saved my life. The counseling, support groups, and financial assistance for treatment gave me a second chance at life with my family.",
      author: "Michael Stevens",
      role: "Recovery Program Graduate",
      image: "recovery",
      category: "Recovery Ministry",
      gradient: "from-teal-600 to-cyan-700"
    },
    {
      id: 6,
      quote: "When our village well broke down, we had to walk miles for clean water. Your missions support helped drill a new well. Now our children can go to school instead of carrying water.",
      author: "Grace Mwangi",
      role: "Village Leader, Kenya",
      image: "water",
      category: "Global Missions",
      gradient: "from-indigo-600 to-blue-700"
    }
  ]

  const impactAreas = [
    {
      title: "Community Outreach",
      description: "Local food pantry, homeless shelter support, disaster relief",
      recipients: "1,200+ families served annually",
      icon: "community",
      color: "blue"
    },
    {
      title: "Global Missions",
      description: "Church planting, clean water projects, educational support",
      recipients: "15 countries reached",
      icon: "globe",
      color: "green"
    },
    {
      title: "Youth Ministry",
      description: "Summer camps, mentorship programs, college scholarships",
      recipients: "250+ youth impacted",
      icon: "youth",
      color: "purple"
    },
    {
      title: "Benevolence Fund",
      description: "Emergency assistance for families in crisis",
      recipients: "180+ families helped",
      icon: "heart",
      color: "orange"
    }
  ]

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'community':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      case 'globe':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'youth':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      case 'heart':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  const getImageIcon = (imageType: string) => {
    switch (imageType) {
      case 'family':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      case 'youth':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      case 'missions':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'benevolence':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
      case 'recovery':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      case 'water':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        )
      default:
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
    }
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Real Stories, Real Impact
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Lives Transformed
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from real people whose lives have been touched and transformed through the generosity of our church family
          </p>
        </div>

        {/* Featured Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="group">
              {/* Video/Image Card */}
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient}`}>
                  <div className="absolute inset-0 bg-black/30"></div>
                  
                  <div className="absolute inset-0 opacity-20">
                    <div 
                      className="h-full w-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                        `,
                        backgroundSize: '30px 30px',
                        animation: `moveBackground ${20 + index * 2}s linear infinite`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 text-white">
                    {getImageIcon(testimonial.image)}
                  </div>
                </div>
                
                <div className="absolute top-4 left-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    {testimonial.category}
                  </span>
                </div>
                
                <div className="absolute bottom-4 right-4">
                  <button className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Testimonial Content */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700 italic leading-relaxed">"{testimonial.quote}"</p>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Areas Summary */}
        <div className="bg-gray-50 rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Where Your Gifts Go</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Every dollar given is carefully stewarded to make the maximum impact for God's kingdom
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactAreas.map((area, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-${area.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <div className={`text-${area.color}-600`}>
                    {getIcon(area.icon)}
                  </div>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{area.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{area.description}</p>
                <div className="text-sm font-medium text-blue-600">{area.recipients}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900">
            <div className="absolute inset-0 bg-black/40"></div>
            
            <div className="absolute inset-0 opacity-20">
              <div 
                className="h-full w-full"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                    linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                  `,
                  backgroundSize: '50px 50px',
                  animation: 'moveBackground 30s linear infinite'
                }}
              ></div>
            </div>
          </div>
          
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Be Part of Their Story
              </h3>
              <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto">
                Your gift today could be the answer to someone's prayer tomorrow. 
                Join us in making a lasting impact that extends far beyond what we can imagine.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button className="bg-white text-gray-900 px-8 py-4 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Give Now
                </button>
                <button className="border border-white text-white px-8 py-4 font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 inline-flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Watch More Stories
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-gray-300 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>100% goes to ministry</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Tax deductible</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>Secure giving</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(30px) translateY(30px); }
        }
      `}</style>
    </section>
  )
} 