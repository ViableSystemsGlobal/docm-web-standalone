'use client'

import Link from 'next/link'
import { useAbout } from '@/hooks/useAbout'

export function JoinUs() {
  const { about, loading, error, source } = useAbout()
  const joinUsContent = about?.join_us

  const nextSteps = [
    {
      title: "Visit Us",
      description: "Join us for Sunday worship and experience our welcoming community firsthand.",
      action: "Plan Your Visit",
      href: "/contact",
      gradient: "from-blue-800 to-indigo-900"
    },
    {
      title: "Connect",
      description: "Get involved in small groups, ministries, and community activities.",
      action: "Find Your Group",
      href: "/ministries",
      gradient: "from-purple-800 to-pink-900"
    },
    {
      title: "Serve",
      description: "Use your gifts and talents to make a difference in our church and community.",
      action: "Explore Opportunities",
      href: "/ministries",
      gradient: "from-green-800 to-emerald-900"
    }
  ]

  if (loading) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-pulse">
            <div className="w-32 h-4 bg-white/20 rounded mx-auto mb-6"></div>
            <div className="h-20 bg-white/20 rounded mx-auto mb-8 max-w-lg"></div>
            <div className="space-y-4 mb-12">
              <div className="h-4 bg-white/20 rounded mx-auto max-w-3xl"></div>
              <div className="h-4 bg-white/20 rounded mx-auto max-w-2xl"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-400">Error loading join us section: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
          {/* Video overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
          
          {/* Simulated video background with moving pattern */}
          <div className="absolute inset-0 opacity-30">
            <div 
              className="h-full w-full animate-pulse"
              style={{
                backgroundImage: `
                  linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                  linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                `,
                backgroundSize: '80px 80px',
                animation: 'moveBackground 30s linear infinite'
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-300 mb-6">
            {joinUsContent?.subtitle || "Ready to Begin?"}
          </p>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1]">
            {joinUsContent?.title || "Join our church family."}
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-gray-200 mb-12 max-w-3xl mx-auto">
            {joinUsContent?.description || "Take the next step in your faith journey. Whether you're new to faith or looking for a church home, we'd love to welcome you into our community where you can grow, connect, and make a difference."}
          </p>
        </div>

        {/* Next Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {nextSteps.map((step, index) => (
            <div key={index} className="group">
              <div className="relative h-64 rounded-2xl overflow-hidden mb-6 cursor-pointer">
                {/* Video Background Placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient}`}>
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
                        animation: `moveBackground ${25 + index * 5}s linear infinite`
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
                
                {/* Step Number */}
                <div className="absolute top-6 left-6">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">{step.description}</p>
                <Link 
                  href={step.href}
                  className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-6 py-3 font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  {step.action}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Main CTA */}
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Take the Next Step?
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              We can't wait to meet you and help you discover your place in our church family. 
              Your journey of faith, community, and purpose starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href={joinUsContent?.cta_primary?.href || "/contact"}
                className="bg-white text-gray-900 px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 text-center"
              >
                {joinUsContent?.cta_primary?.text || "Visit This Sunday"}
              </Link>
              <Link 
                href="/contact"
                className="border border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 text-center flex items-center justify-center gap-3"
              >
                Get in Touch
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
            <div>
              <h4 className="font-semibold mb-2">Service Times</h4>
              <p className="text-gray-300 text-sm">Sunday 9:00 AM & 11:00 AM</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Location</h4>
              <p className="text-gray-300 text-sm">Aurora, Colorado</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Contact</h4>
              <p className="text-gray-300 text-sm">(555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation keyframes */}
      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(80px) translateY(80px); }
        }
      `}</style>
    </section>
  )
} 