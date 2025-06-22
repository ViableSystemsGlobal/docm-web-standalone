'use client'

import { useState } from 'react'
import { Toast } from '@/components/ui/toast'

export function NewsletterSignup() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [toast, setToast] = useState<{
    message: string
    type: 'success' | 'error'
    isVisible: boolean
  }>({
    message: '',
    type: 'success',
    isVisible: false
  })

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true })
  }

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return
    
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim()
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSubmitted(true)
        setFirstName('')
        setLastName('')
        setEmail('')
        showToast(data.message || `Thank you for subscribing, ${firstName}! Welcome to our community of believers.`, 'success')
      } else {
        showToast(data.error || 'Something went wrong. Please try again.', 'error')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      showToast('Network error. Please check your connection and try again.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
      
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div className="text-white">
              <p className="text-sm font-medium text-gray-400 mb-6">
                Stay Connected
              </p>
              <h2 className="text-5xl md:text-6xl font-bold leading-[1.1] mb-8">
                Never miss a{' '}
                <br />
                moment of impact.
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-12 max-w-xl">
                Subscribe to our newsletter for the latest updates, events, sermons, and inspiration 
                delivered directly to your inbox. Join our community of faith.
              </p>
              
              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Weekly sermon highlights and notes</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Upcoming events and ministry opportunities</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Inspirational content and prayer requests</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-300">Community stories and testimonials</p>
                </div>
              </div>
              
              {isSubmitted ? (
                <div className="bg-green-600 text-white p-6 rounded-2xl max-w-lg">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-green-100 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="font-semibold">Welcome to our community!</h3>
                      <p className="text-green-100">You'll receive our next newsletter soon.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        required
                        disabled={isSubmitting}
                        className="w-full px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-500 bg-white border-2 border-transparent focus:border-gray-300 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name (Optional)"
                        disabled={isSubmitting}
                        className="w-full px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-500 bg-white border-2 border-transparent focus:border-gray-300 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                  
                  {/* Email Field */}
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 rounded-2xl text-gray-900 placeholder-gray-500 bg-white border-2 border-transparent focus:border-gray-300 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-white text-gray-900 px-6 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe to Newsletter
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                  <p className="text-sm text-gray-400 text-center">
                    No spam, unsubscribe at any time. We respect your privacy.
                  </p>
                </form>
              )}
            </div>
            
            {/* Visual Element - Enhanced */}
            <div className="relative">
              {/* Main Visual */}
              <div className="relative h-[600px] rounded-3xl overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-800 via-purple-800 to-indigo-900">
                  <div className="absolute inset-0 bg-black/20"></div>
                  
                  {/* Animated pattern */}
                  <div className="absolute inset-0 opacity-30">
                    <div 
                      className="h-full w-full"
                      style={{
                        backgroundImage: `
                          radial-gradient(circle at 25% 25%, rgba(255,255,255,0.2) 1px, transparent 1px),
                          radial-gradient(circle at 75% 75%, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px, 30px 30px',
                        animation: 'float 20s ease-in-out infinite'
                      }}
                    ></div>
                  </div>
                </div>
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-bold mb-6">Join our community of Believers</h3>
                    <p className="text-gray-200 text-lg leading-relaxed">
                      Stay connected with our growing community of faith and be the first to know about everything happening at DOCM Church.
                    </p>
                    
                    {/* Newsletter Preview Cards */}
                    <div className="mt-8 space-y-3">
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm text-gray-200">Weekly Impact Stories</span>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-sm text-gray-200">Upcoming Events</span>
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-sm text-gray-200">Prayer Updates</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -right-6 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-blue-500/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Custom animation keyframes */}
        <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-10px) translateX(5px); }
            50% { transform: translateY(0px) translateX(10px); }
            75% { transform: translateY(10px) translateX(5px); }
          }
        `}</style>
      </section>
    </>
  )
} 