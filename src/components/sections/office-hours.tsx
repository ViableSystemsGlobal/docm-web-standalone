'use client'

export function OfficeHours() {
  const schedule = [
    {
      day: "Monday",
      hours: "9:00 AM - 5:00 PM",
      staff: "Full Staff Available",
      services: ["General Inquiries", "Administrative Services", "Pastoral Care"]
    },
    {
      day: "Tuesday",
      hours: "9:00 AM - 5:00 PM",
      staff: "Full Staff Available",
      services: ["Counseling Appointments", "Ministry Meetings", "Event Planning"]
    },
    {
      day: "Wednesday",
      hours: "9:00 AM - 5:00 PM",
      staff: "Full Staff Available",
      services: ["Bible Study Prep", "Volunteer Coordination", "Community Outreach"]
    },
    {
      day: "Thursday",
      hours: "9:00 AM - 5:00 PM",
      staff: "Full Staff Available",
      services: ["Youth Ministry", "Worship Planning", "Facility Tours"]
    },
    {
      day: "Friday",
      hours: "9:00 AM - 3:00 PM",
      staff: "Limited Staff",
      services: ["Essential Services Only", "Emergency Pastoral Care"]
    },
    {
      day: "Saturday",
      hours: "10:00 AM - 2:00 PM",
      staff: "Weekend Team",
      services: ["Event Setup", "Wedding Prep", "Facility Maintenance"]
    },
    {
      day: "Sunday",
      hours: "After Services",
      staff: "Ministry Leaders",
      services: ["Post-Service Prayer", "New Member Welcome", "General Questions"]
    }
  ]

  const specialHours = [
    {
      title: "Holiday Schedule",
      description: "Office hours may vary during holidays. Check our website or call ahead.",
      icon: "calendar"
    },
    {
      title: "Emergency Contact",
      description: "For urgent pastoral care outside office hours, call our emergency line.",
      icon: "phone"
    },
    {
      title: "Appointments",
      description: "Schedule meetings with pastoral staff or ministry leaders in advance.",
      icon: "clock"
    }
  ]

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'calendar':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      case 'phone':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        )
      case 'clock':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            When We're Available
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Office Hours
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find the best times to visit, call, or schedule appointments with our church staff and ministry leaders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Weekly Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Weekly Schedule</h3>
              
              <div className="space-y-6">
                {schedule.map((day, index) => (
                  <div key={day.day} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <h4 className="text-lg font-bold text-gray-900">{day.day}</h4>
                          <span className="text-lg font-medium text-blue-600">{day.hours}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{day.staff}</p>
                        <div className="flex flex-wrap gap-2">
                          {day.services.map((service, serviceIndex) => (
                            <span
                              key={serviceIndex}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex-shrink-0">
                        <div className={`w-3 h-3 rounded-full ${
                          day.hours === "Closed" ? "bg-red-400" :
                          day.staff === "Limited Staff" ? "bg-yellow-400" :
                          day.staff === "Weekend Team" ? "bg-blue-400" :
                          "bg-green-400"
                        }`}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-2xl">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-blue-900 mb-1">Note</h4>
                    <p className="text-sm text-blue-800">
                      While these are our regular office hours, pastoral care and emergency support 
                      are available 24/7 through our prayer line at (555) 123-PRAY.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Info & Special Hours */}
          <div className="space-y-8">
            {/* Current Status */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Current Status</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-900">Open Now</span>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Monday 2:30 PM - Full staff available
              </p>
              <div className="text-xs text-gray-500">
                <p>Closes in 2 hours 30 minutes</p>
                <p>Next: Tuesday 9:00 AM</p>
              </div>
            </div>

            {/* Special Hours Info */}
            <div className="space-y-4">
              {specialHours.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      {getIcon(item.icon)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Contact */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Need Help Now?</h3>
              <div className="space-y-3">
                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 text-sm hover:text-blue-200 transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Main Office: (555) 123-4567
                </a>
                <a
                  href="tel:+15551237729"
                  className="flex items-center gap-3 text-sm hover:text-blue-200 transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Prayer Line: (555) 123-PRAY
                </a>
                <a
                  href="mailto:hello@churchname.org"
                  className="flex items-center gap-3 text-sm hover:text-blue-200 transition-colors duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  hello@churchname.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Booking CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-sm">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Schedule an Appointment
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Need dedicated time with our pastoral staff or ministry leaders? 
              Schedule a meeting that works for your schedule.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-black text-white px-8 py-4 font-semibold rounded-lg hover:bg-gray-800 transition-all duration-300 inline-flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Appointment
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 font-semibold rounded-lg hover:bg-gray-50 transition-all duration-300">
                View Staff Directory
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 