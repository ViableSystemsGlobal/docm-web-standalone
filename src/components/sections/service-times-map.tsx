export function ServiceTimesMap() {
  const serviceTimes = [
    {
      id: 1,
      title: "Sunday Worship",
      subtitle: "Traditional & Contemporary Services",
      times: ["9:00 AM - Traditional Service", "11:00 AM - Contemporary Service"],
      day: "Every Sunday",
      icon: "🙏",
      color: "from-blue-600 to-indigo-600"
    },
    {
      id: 2,
      title: "Wednesday Bible Study",
      subtitle: "Deep dive into Scripture",
      times: ["7:00 PM - Fellowship Hall"],
      day: "Every Wednesday", 
      icon: "📖",
      color: "from-purple-600 to-pink-600"
    },
    {
      id: 3,
      title: "Youth Service",
      subtitle: "For ages 13-18",
      times: ["7:00 PM - Youth Center"],
      day: "Every Friday",
      icon: "🏀",
      color: "from-green-600 to-teal-600"
    }
  ]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unified Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Visit Us
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-8">
            Join us for worship{' '}
            <br />
            & fellowship.
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Whether you're seeking traditional worship or contemporary praise, 
            we have a service that will inspire and encourage your faith journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Service Times */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Service Times</h3>
            
            {serviceTimes.map((service) => (
              <div key={service.id} className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group cursor-pointer">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{service.title}</h4>
                    <p className="text-gray-600 text-sm mb-3">{service.subtitle}</p>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{service.day}</span>
                      </div>
                      {service.times.map((time, index) => (
                        <div key={index} className="flex items-center gap-2 text-gray-700 text-sm">
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all duration-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Special Events Note */}
            <div className="p-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl text-white">
              <h4 className="font-bold mb-2">Special Events & Holidays</h4>
              <p className="text-gray-300 text-sm">
                Service times may vary during holidays and special events. 
                Check our events calendar or contact us for the latest information.
              </p>
            </div>
          </div>
          
          {/* Location & Contact */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Find Us</h3>
            
            {/* Map Container */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              <div className="relative h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-12 h-12 bg-white/70 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="font-medium text-sm">Interactive Map</p>
                  <p className="text-xs">Coming Soon</p>
                </div>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
              <h4 className="text-lg font-bold text-gray-900 mb-6">Contact Information</h4>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1 text-sm">Address</h5>
                    <p className="text-gray-600 text-sm">
                      123 Church Street<br />
                      City, State 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1 text-sm">Phone</h5>
                    <p className="text-gray-600 text-sm">(555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1 text-sm">Email</h5>
                    <p className="text-gray-600 text-sm">info@docmchurch.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1 text-sm">Office Hours</h5>
                    <p className="text-gray-600 text-sm">
                      Mon-Fri: 9:00 AM - 5:00 PM<br />
                      Sunday: 8:00 AM - 1:00 PM
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-black text-white px-4 py-2 text-sm font-semibold hover:bg-gray-800 transition-all duration-300 rounded-xl">
                  Get Directions
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 text-sm font-semibold hover:bg-gray-50 transition-all duration-300 rounded-xl">
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 