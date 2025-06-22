'use client'

import { useContactPage } from '@/hooks/useContactPage'

export function ContactCTA() {
  const { contactPage, loading, error, source } = useContactPage()

  // Use CMS data or fallback to defaults
  const ctaContent = loading ? {
    sectionTitle: "Connect With Our Community",
    sectionHeading: "Ready to take the next step?",
    sectionDescription: "Whether you're new to faith, seeking community, or looking to grow deeper in your relationship with God, we're here to walk alongside you on this journey.",
    ctaButtons: [
      { text: "Plan Your Visit", link: "/events", style: "primary" as const },
      { text: "Start a Conversation", link: "#contact-form", style: "secondary" as const }
    ],
    features: [
      { text: "All are welcome", icon: "check" },
      { text: "No pressure", icon: "check" },
      { text: "Come as you are", icon: "check" }
    ]
  } : contactPage.contact_cta

  const contactInfo = loading ? {
    phone: "(555) 123-4567",
    email: "hello@churchname.org",
    address: "123 Church Street, City, State 12345"
  } : contactPage.contact_info

  if (error) {
    console.warn('Contact CTA: Using fallback content due to error:', error)
  }

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-3xl overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20"></div>
          </div>
          
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-6">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h1a4 4 0 010 8h-1m-10-8H6a4 4 0 000 8h1m5-8v8m-2-4h4" />
                </svg>
                <p className="text-sm font-medium text-gray-300">
                  {ctaContent.sectionTitle}
                </p>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-[1.1]">
                {ctaContent.sectionHeading}
              </h2>
              
              <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto">
                {ctaContent.sectionDescription}
              </p>
              
              {/* Action Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Visit Us</h3>
                  <p className="text-gray-200 text-sm">Join us for worship and fellowship this Sunday</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Connect</h3>
                  <p className="text-gray-200 text-sm">Build meaningful relationships in our community</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Volunteer</h3>
                  <p className="text-gray-200 text-sm">Make a difference in your community through service</p>
                </div>
              </div>
              
              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                {ctaContent.ctaButtons.map((button, index) => (
                  <button 
                    key={index}
                    className={`px-8 py-4 font-semibold rounded-lg transition-all duration-300 inline-flex items-center gap-3 ${
                      button.style === 'primary'
                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                        : 'border border-white text-white hover:bg-white hover:text-gray-900'
                    }`}
                  >
                    {button.style === 'primary' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    )}
                    {button.text}
                  </button>
                ))}
              </div>
              
              {/* Social Proof */}
              <div className="flex items-center justify-center gap-6 text-gray-300 text-sm">
                {ctaContent.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Speak directly with our team</p>
            <a href={`tel:${contactInfo.phone.replace(/[^\d+]/g, '')}`} className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300">
              {contactInfo.phone}
            </a>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">Send us a message anytime</p>
            <a href={`mailto:${contactInfo.email}`} className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300">
              {contactInfo.email}
            </a>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4">Come see us in person</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-300">
              {contactInfo.address}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
} 