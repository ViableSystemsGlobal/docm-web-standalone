'use client'

import { useState } from 'react'

export function GivingOptions() {
  const [selectedAmount, setSelectedAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [frequency, setFrequency] = useState('one-time')
  const [fund, setFund] = useState('general')

  const quickAmounts = ['25', '50', '100', '250', '500']
  
  const funds = [
    { id: 'general', name: 'General Fund', description: 'Church operations and ministries' },
    { id: 'missions', name: 'Missions', description: 'Global outreach and missions' },
    { id: 'building', name: 'Building Fund', description: 'Facility improvements and expansion' },
    { id: 'youth', name: 'Youth Ministry', description: 'Programs for children and teenagers' },
    { id: 'community', name: 'Community Outreach', description: 'Local community service projects' },
    { id: 'special', name: 'Special Offerings', description: 'Holiday and special event offerings' }
  ]

  const givingMethods = [
    {
      id: 1,
      title: "Online Giving",
      description: "Secure, convenient giving through our online platform",
      icon: "online",
      features: ["Instant processing", "Recurring options", "Tax receipts", "Mobile friendly"],
      gradient: "from-blue-600 to-indigo-700"
    },
    {
      id: 2,
      title: "Mobile App",
      description: "Give on-the-go with our church mobile application",
      icon: "mobile",
      features: ["Touch ID/Face ID", "Quick giving", "Giving history", "Push notifications"],
      gradient: "from-green-600 to-emerald-700"
    },
    {
      id: 3,
      title: "Text Giving",
      description: "Simple giving via text message to our giving number",
      icon: "text",
      features: ["Text to give", "No signup required", "Instant confirmation", "Easy for guests"],
      gradient: "from-purple-600 to-pink-700"
    },
    {
      id: 4,
      title: "In-Person",
      description: "Traditional offering during worship services",
      icon: "offering",
      features: ["Cash or check", "Offering envelopes", "Anonymous giving", "Part of worship"],
      gradient: "from-orange-600 to-red-700"
    }
  ]

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'online':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      case 'mobile':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      case 'text':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )
      case 'offering':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <section id="giving-options" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Ways to Give
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Giving Options
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose the giving method that works best for you. Every gift makes a difference in advancing God's kingdom
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Online Giving Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-3xl p-8 md:p-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Give Online</h3>
              
              <div className="space-y-8">
                {/* Amount Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                    {quickAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => {
                          setSelectedAmount(amount)
                          setCustomAmount('')
                        }}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                          selectedAmount === amount
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-gray-500 sm:text-sm">$</span>
                    </div>
                    <input
                      type="number"
                      placeholder="Custom amount"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value)
                        setSelectedAmount('')
                      }}
                      className="block w-full pl-7 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Frequency
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'one-time', label: 'One Time' },
                      { id: 'weekly', label: 'Weekly' },
                      { id: 'monthly', label: 'Monthly' },
                      { id: 'yearly', label: 'Yearly' }
                    ].map((freq) => (
                      <button
                        key={freq.id}
                        onClick={() => setFrequency(freq.id)}
                        className={`py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                          frequency === freq.id
                            ? 'bg-blue-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {freq.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fund Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Designate Your Gift
                  </label>
                  <select
                    value={fund}
                    onChange={(e) => setFund(e.target.value)}
                    className="block w-full py-3 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {funds.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} - {f.description}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button className="w-full bg-blue-600 text-white py-4 px-8 font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 inline-flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Proceed to Payment
                </button>

                {/* Security Notice */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z"/>
                    </svg>
                    <div>
                      <h4 className="text-sm font-medium text-green-800">Secure Giving</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Your payment information is encrypted and processed securely. 
                        You'll receive an immediate email receipt for tax purposes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Other Giving Methods */}
          <div className="space-y-6">
            {givingMethods.map((method, index) => (
              <div key={method.id} className="group cursor-pointer">
                <div className="relative h-48 rounded-2xl overflow-hidden mb-4">
                  <div className={`absolute inset-0 bg-gradient-to-br ${method.gradient}`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    
                    <div className="absolute inset-0 opacity-20">
                      <div 
                        className="h-full w-full"
                        style={{
                          backgroundImage: `
                            linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                          `,
                          backgroundSize: '25px 25px',
                          animation: `moveBackground ${20 + index * 2}s linear infinite`
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 text-white">
                      {getIcon(method.icon)}
                    </div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-lg font-bold text-white">{method.title}</h3>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl p-6 group-hover:shadow-lg transition-all duration-300 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{method.description}</p>
                  
                  <ul className="space-y-2">
                    {method.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text Giving Instructions */}
        <div className="mt-16 bg-blue-50 rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-blue-900 mb-4">Text to Give</h3>
              <p className="text-blue-800 mb-6">
                The quickest way to give! Simply text your gift amount to our giving number.
              </p>
              <div className="bg-white rounded-xl p-6 mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Text this number:</p>
                  <p className="text-3xl font-bold text-blue-600">(555) 123-GIVE</p>
                  <p className="text-sm text-gray-600 mt-2">Example: Text "50" to give $50</p>
                </div>
              </div>
              <p className="text-sm text-blue-700">
                First-time users will be guided through a simple setup process. 
                Subsequent gifts are processed instantly.
              </p>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl p-6 shadow-lg max-w-sm mx-auto">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Church Giving</p>
                    <p className="text-sm text-gray-500">(555) 123-GIVE</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-blue-100 rounded-lg p-3 ml-auto max-w-fit">
                    <p className="text-sm text-blue-900">100</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-fit">
                    <p className="text-sm text-gray-700">Thank you! Your $100 gift has been processed. Receipt sent to your email.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes moveBackground {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(25px) translateY(25px); }
        }
      `}</style>
    </section>
  )
} 