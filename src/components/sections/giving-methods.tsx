'use client'

export function GivingMethods() {
  const givingMethods = [
    {
      id: 1,
      title: "Online Giving",
      description: "The most convenient way to give securely through our website",
      features: [
        "Instant processing and confirmation",
        "Recurring gifts (weekly, monthly, yearly)",
        "Multiple payment methods accepted",
        "Immediate email receipts",
        "Mobile-friendly interface",
        "Giving history tracking"
      ],
      howTo: [
        "Visit our giving page",
        "Select your amount and fund",
        "Choose frequency",
        "Enter payment information",
        "Receive instant confirmation"
      ],
      icon: "online",
      gradient: "from-blue-600 to-indigo-700",
      popular: true
    },
    {
      id: 2,
      title: "Text Giving",
      description: "Quick and easy giving through text messages",
      features: [
        "Text your gift amount to our number",
        "No app download required",
        "Works on any mobile phone",
        "Simple setup process",
        "Instant confirmation text",
        "Perfect for first-time visitors"
      ],
      howTo: [
        "Text your amount to (555) 123-GIVE",
        "Follow the setup prompts (first time only)",
        "Confirm your gift",
        "Receive confirmation text",
        "Future gifts are instant"
      ],
      icon: "text",
      gradient: "from-green-600 to-emerald-700",
      popular: false
    },
    {
      id: 3,
      title: "Church App",
      description: "Give through our dedicated mobile application",
      features: [
        "Touch ID / Face ID security",
        "Quick giving with saved preferences",
        "Push notifications for events",
        "Giving history and tracking",
        "Sermon notes and resources",
        "Event registration"
      ],
      howTo: [
        "Download our church app",
        "Create your account",
        "Add payment method",
        "Use quick give feature",
        "Track your giving history"
      ],
      icon: "mobile",
      gradient: "from-purple-600 to-pink-700",
      popular: false
    },
    {
      id: 4,
      title: "In-Person Giving",
      description: "Traditional offerings during worship services",
      features: [
        "Cash or check accepted",
        "Special offering envelopes provided",
        "Anonymous giving option",
        "Part of worship experience",
        "Quarterly giving statements",
        "No fees or processing charges"
      ],
      howTo: [
        "Pick up offering envelope",
        "Place cash or check inside",
        "Fill out envelope information",
        "Place in offering plate",
        "Receive quarterly statement"
      ],
      icon: "offering",
      gradient: "from-orange-600 to-red-700",
      popular: false
    },
    {
      id: 5,
      title: "Bank Transfer",
      description: "Set up automatic transfers from your bank account",
      features: [
        "Automatic recurring transfers",
        "No credit card fees",
        "Direct from checking/savings",
        "Easy to modify or cancel",
        "Lower processing costs",
        "Traditional and reliable"
      ],
      howTo: [
        "Contact our finance office",
        "Complete authorization form",
        "Provide bank account details",
        "Choose transfer frequency",
        "Automatic monthly transfers begin"
      ],
      icon: "bank",
      gradient: "from-teal-600 to-cyan-700",
      popular: false
    },
    {
      id: 6,
      title: "Planned Giving",
      description: "Legacy gifts through wills, trusts, and estate planning",
      features: [
        "Estate and will bequests",
        "Charitable remainder trusts",
        "Life insurance beneficiary",
        "Stock and property donations",
        "Tax advantages available",
        "Professional guidance provided"
      ],
      howTo: [
        "Consult with our planned giving advisor",
        "Review your estate plans",
        "Determine best giving vehicle",
        "Work with your attorney/advisor",
        "Execute planned giving documents"
      ],
      icon: "planned",
      gradient: "from-indigo-600 to-purple-700",
      popular: false
    }
  ]

  const specialGiving = [
    {
      title: "Stock Donations",
      description: "Give appreciated stocks and avoid capital gains taxes",
      benefits: ["Tax deduction at fair market value", "Avoid capital gains tax", "Simple transfer process"],
      contact: "finance@churchname.org"
    },
    {
      title: "Cryptocurrency",
      description: "Donate Bitcoin, Ethereum, and other digital currencies",
      benefits: ["Avoid capital gains on appreciation", "Full tax deduction", "Secure blockchain transfer"],
      contact: "crypto@churchname.org"
    },
    {
      title: "Employer Matching",
      description: "Double your impact through workplace giving programs",
      benefits: ["Matching funds from employer", "Payroll deduction convenience", "Doubled ministry impact"],
      contact: "matching@churchname.org"
    }
  ]

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'online':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        )
      case 'text':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )
      case 'mobile':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      case 'offering':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
      case 'bank':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        )
      case 'planned':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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
            Choose Your Method
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            How to Give
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We offer multiple convenient and secure ways to give, making it easy for you to support God's work according to your preferences
          </p>
        </div>

        {/* Giving Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {givingMethods.map((method, index) => (
            <div key={method.id} className="group relative">
              {/* Popular Badge */}
              {method.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                {/* Header */}
                <div className="relative h-32 rounded-2xl overflow-hidden mb-6">
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient}`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    <div className="absolute inset-0 opacity-20">
                      <div 
                        className="h-full w-full"
                        style={{
                          backgroundImage: `
                            linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                          `,
                          backgroundSize: '20px 20px',
                          animation: `moveBackground ${15 + index}s linear infinite`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                      {getIcon(method.icon)}
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{method.description}</p>
                  
                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Features:</h4>
                    <ul className="space-y-2">
                      {method.features.slice(0, 4).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          {feature}
                        </li>
                      ))}
                      {method.features.length > 4 && (
                        <li className="text-sm text-gray-500">
                          +{method.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* How To */}
                  <div className="mt-auto">
                    <button className="w-full bg-gray-100 text-gray-700 px-4 py-3 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-300 text-sm">
                      Learn How →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special Giving Options */}
        <div className="bg-white rounded-3xl p-8 md:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Special Giving Options</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore additional ways to give that may provide unique tax advantages and benefits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialGiving.map((option, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                <h4 className="text-lg font-bold text-gray-900 mb-3">{option.title}</h4>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{option.description}</p>
                
                <div className="space-y-2 mb-4">
                  {option.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {benefit}
                    </div>
                  ))}
                </div>
                
                <a 
                  href={`mailto:${option.contact}`}
                  className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors duration-300"
                >
                  Contact: {option.contact}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Help & Support */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            <div className="absolute inset-0 bg-black/20"></div>
            
            <div className="absolute inset-0 opacity-10">
              <div 
                className="h-full w-full"
                style={{
                  backgroundImage: `
                    linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                  `,
                  backgroundSize: '40px 40px',
                  animation: 'moveBackground 25s linear infinite'
                }}
              ></div>
            </div>
          </div>
          
          <div className="relative z-10 px-8 py-16 md:px-16 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Need Help with Giving?
              </h3>
              <p className="text-lg text-gray-200 mb-12 max-w-2xl mx-auto">
                Our team is here to help you choose the best giving method for your situation. 
                We're committed to making giving as easy and secure as possible.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Call Us</h4>
                  <p className="text-gray-300 text-sm mb-2">Speak with our finance team</p>
                  <a href="tel:+15551234567" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    (555) 123-4567
                  </a>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Email Us</h4>
                  <p className="text-gray-300 text-sm mb-2">Send us your questions</p>
                  <a href="mailto:giving@churchname.org" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    giving@churchname.org
                  </a>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Schedule Meeting</h4>
                  <p className="text-gray-300 text-sm mb-2">Meet with our team</p>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                    Book Appointment
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <button className="bg-white text-gray-900 px-8 py-4 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 inline-flex items-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  View Giving FAQ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(20px) translateY(20px); }
        }
      `}</style>
    </section>
  )
} 