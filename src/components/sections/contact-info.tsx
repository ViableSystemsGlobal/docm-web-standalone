'use client'

export function ContactInfo() {
  const contactMethods = [
    {
      id: 1,
      title: "Phone",
      value: "(555) 123-4567",
      description: "Call us during office hours for immediate assistance",
      icon: "phone",
      gradient: "from-blue-600 to-indigo-700",
      link: "tel:+15551234567"
    },
    {
      id: 2,
      title: "Email",
      value: "hello@churchname.org",
      description: "Send us an email and we'll respond within 24 hours",
      icon: "email",
      gradient: "from-green-600 to-emerald-700",
      link: "mailto:hello@churchname.org"
    },
    {
      id: 3,
      title: "Address",
      value: "123 Faith Street, Hope City, HC 12345",
      description: "Visit us in person for worship, events, and community",
      icon: "location",
      gradient: "from-purple-600 to-pink-700",
      link: "https://maps.google.com/?q=123+Faith+Street+Hope+City+HC+12345"
    }
  ]

  const supportTeam = [
    {
      name: "Pastor Michael Johnson",
      role: "Lead Pastor",
      email: "pastor@churchname.org",
      phone: "(555) 123-4567 ext. 101",
      specialties: ["Spiritual Guidance", "Marriage Counseling", "Life Coaching"],
      image: "pastor"
    },
    {
      name: "Sarah Williams",
      role: "Ministry Coordinator",
      email: "sarah@churchname.org", 
      phone: "(555) 123-4567 ext. 102",
      specialties: ["New Members", "Small Groups", "Community Events"],
      image: "coordinator"
    },
    {
      name: "David Chen",
      role: "Youth Pastor",
      email: "youth@churchname.org",
      phone: "(555) 123-4567 ext. 103", 
      specialties: ["Youth Ministry", "Teen Counseling", "Family Support"],
      image: "youth"
    }
  ]

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'phone':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        )
      case 'email':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      case 'location':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  const getTeamIcon = (imageType: string) => {
    switch (imageType) {
      case 'pastor':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case 'coordinator':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case 'youth':
        return (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Get In Touch
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Contact Information
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Reach out to us through any of these convenient methods. We're here to help and support you on your journey.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {contactMethods.map((method, index) => (
            <a
              key={method.id}
              href={method.link}
              className="group block"
              target={method.icon === 'location' ? '_blank' : undefined}
              rel={method.icon === 'location' ? 'noopener noreferrer' : undefined}
            >
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient}`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  <div className="absolute inset-0 opacity-20">
                    <div 
                      className="h-full w-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                        `,
                        backgroundSize: '30px 30px',
                        animation: `moveBackground ${18 + index * 2}s linear infinite`
                      }}
                    ></div>
                  </div>
                </div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 text-white">
                    {getIcon(method.icon)}
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-lg font-medium text-blue-600 mb-3">{method.value}</p>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            </a>
          ))}
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