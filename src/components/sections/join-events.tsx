'use client'

import Link from 'next/link'

export function JoinEvents() {
  const steps = [
    {
      id: 1,
      icon: "📅",
      title: "Browse Events",
      description: "Explore our calendar and find events that interest you"
    },
    {
      id: 2,
      icon: "📝",
      title: "Register",
      description: "Sign up for events that require registration in advance"
    },
    {
      id: 3,
      icon: "🎉",
      title: "Join Us",
      description: "Come and experience fellowship and community with us"
    }
  ]

  const quickActions = [
    {
      id: 1,
      title: "This Sunday",
      subtitle: "Worship Service",
      time: "9:00 AM & 11:00 AM",
      action: "Plan Your Visit",
      gradient: "from-blue-600 to-indigo-700",
      icon: "🙏"
    },
    {
      id: 2,
      title: "This Week",
      subtitle: "Youth Night",
      time: "Friday 7:00 PM",
      action: "Join Youth",
      gradient: "from-purple-600 to-pink-700",
      icon: "👥"
    },
    {
      id: 3,
      title: "Get Updates",
      subtitle: "Event Newsletter",
      time: "Weekly digest",
      action: "Subscribe",
      gradient: "from-green-600 to-emerald-700",
      icon: "📧"
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section with Video Background */}
        <div className="relative rounded-3xl overflow-hidden mb-20">
          {/* Video Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
            <div className="absolute inset-0 bg-black/40"></div>
            
            {/* Simulated video pattern */}
            <div className="absolute inset-0 opacity-30">
              <div 
                className="h-full w-full"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%),
                    linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.05) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.05) 75%)
                  `,
                  backgroundSize: '60px 60px',
                  animation: 'moveBackground 40s linear infinite'
                }}
              ></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="relative z-10 text-center py-20 px-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-sm font-medium text-gray-300 mb-6">
                Get Involved
              </p>
              
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-[1.1]">
                Your journey starts{' '}
                <br />
                with a single step.
              </h2>
              
              <p className="text-lg md:text-xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join our vibrant community and discover meaningful connections, spiritual growth, 
                and opportunities to make a difference. Every event is a chance to belong.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link 
                  href="/contact"
                  className="bg-white text-gray-900 px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300 inline-flex items-center justify-center gap-3"
                >
                  Get Started Today
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                <button className="border border-white text-white px-8 py-4 font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 inline-flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Watch Welcome Video
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How to Join Steps */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 mb-6">
              How to Join
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Getting involved is easy. Follow these simple steps to become part of our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={step.id} className="text-center group">
                <div className="relative mb-8">
                  {/* Step connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 left-full w-full h-0.5 bg-gray-200 z-0"></div>
                  )}
                  
                  {/* Step circle */}
                  <div className="relative w-20 h-20 bg-white border-4 border-gray-200 rounded-full flex items-center justify-center mx-auto group-hover:border-blue-300 transition-colors duration-300 z-10">
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  
                  {/* Step number */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </div>
                </div>
                
                <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {step.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-6">
            Have Questions?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We're here to help you take the next step. Reach out to our team and we'll guide you 
            to the perfect events and opportunities for your journey.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Call Us</h4>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Email Us</h4>
              <p className="text-gray-600">hello@docmchurch.org</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Visit Us</h4>
              <p className="text-gray-600">123 Faith Street, Hope City</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-all duration-300"
            >
              Contact Our Team
            </Link>
            <Link 
              href="/about"
              className="border border-gray-300 text-gray-700 px-8 py-4 font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              Learn More About Us
            </Link>
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