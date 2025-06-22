'use client'

import { useState } from 'react'

interface FormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Visit Details
  eventType: string
  preferredDate: string
  preferredTime: string
  groupSize: number
  
  // Additional Information
  firstTimeVisitor: boolean
  specialNeeds: string
  howHeardAboutUs: string
  additionalNotes: string
}

export function PlannedVisitForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventType: '',
    preferredDate: '',
    preferredTime: '',
    groupSize: 1,
    firstTimeVisitor: true,
    specialNeeds: '',
    howHeardAboutUs: '',
    additionalNotes: ''
  })

  const totalSteps = 3

  const eventTypes = [
    { value: 'sunday-service', label: 'Sunday Worship Service', time: '10:00 AM' },
    { value: 'youth-night', label: 'Youth Night', time: 'Fridays 7:00 PM' },
    { value: 'bible-study', label: 'Bible Study', time: 'Wednesdays 7:00 PM' },
    { value: 'community-outreach', label: 'Community Outreach', time: 'Various Times' },
    { value: 'special-event', label: 'Special Event', time: 'Check Calendar' }
  ]

  const howHeardOptions = [
    'Friend or Family Member',
    'Social Media',
    'Google Search',
    'Community Event',
    'Driving By',
    'Other'
  ]

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/planned-visits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      console.log('✅ Planned visit submitted successfully:', result)
      
      // Show personalized success message
      const selectedEvent = eventTypes.find(e => e.value === formData.eventType)
      const eventDate = new Date(formData.preferredDate).toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      
      const successMessage = `Thank you, ${formData.firstName}! 🎉\n\nWe've received your visit request for ${selectedEvent?.label} on ${eventDate}${formData.preferredTime ? ` at ${formData.preferredTime}` : ''}.\n\nOur team will be in touch soon to confirm the details and help make your visit special. We can't wait to welcome you${formData.groupSize > 1 ? ` and your group of ${formData.groupSize}` : ''} to our church family!`
      
      alert(successMessage)
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        eventType: '',
        preferredDate: '',
        preferredTime: '',
        groupSize: 1,
        firstTimeVisitor: true,
        specialNeeds: '',
        howHeardAboutUs: '',
        additionalNotes: ''
      })
      setCurrentStep(1)
    } catch (error) {
      console.error('❌ Error submitting planned visit:', error)
      alert(`Sorry, there was an error submitting your request: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStep1Valid = () => {
    return formData.firstName && formData.lastName && formData.email
  }

  const isStep2Valid = () => {
    return formData.eventType && formData.preferredDate
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Join Us
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-8">
            Plan Your Visit
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            We'd love to welcome you to our church family. Let us know when you're planning to visit so we can make sure you feel at home.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-6">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div key={i} className="flex items-center">
                <div className={`relative w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold transition-all duration-500 ${
                  i + 1 <= currentStep 
                    ? 'bg-gray-900 text-white shadow-lg scale-110' 
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                }`}>
                  {i + 1 < currentStep ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                {i < totalSteps - 1 && (
                  <div className={`w-20 h-2 mx-4 rounded-full transition-all duration-500 ${
                    i + 1 < currentStep ? 'bg-gray-900' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12">
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Tell us about yourself</h3>
                  <p className="text-gray-600 text-lg">We'd love to know a bit about you before your visit</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => updateFormData('firstName', e.target.value)}
                      placeholder="Enter your first name"
                      className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => updateFormData('lastName', e.target.value)}
                      placeholder="Enter your last name"
                      className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Visit Details */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">Plan your visit</h3>
                  <p className="text-gray-600 text-lg">When would you like to join us?</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    What would you like to attend? *
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {eventTypes.map((event) => (
                      <button
                        key={event.value}
                        type="button"
                        onClick={() => updateFormData('eventType', event.value)}
                        className={`w-full p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                          formData.eventType === event.value
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-900 border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-bold text-lg">{event.label}</h4>
                            <p className={`text-sm ${
                              formData.eventType === event.value ? 'text-gray-300' : 'text-gray-500'
                            }`}>
                              {event.time}
                            </p>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData.eventType === event.value
                              ? 'border-white bg-white'
                              : 'border-gray-400'
                          }`}>
                            {formData.eventType === event.value && (
                              <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => updateFormData('preferredDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      value={formData.preferredTime}
                      onChange={(e) => updateFormData('preferredTime', e.target.value)}
                      className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    How many people will be joining you?
                  </label>
                  <select
                    value={formData.groupSize}
                    onChange={(e) => updateFormData('groupSize', parseInt(e.target.value))}
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>
                        {num === 1 ? 'Just me' : `${num} people (including me)`}
                      </option>
                    ))}
                    <option value={11}>More than 10 people</option>
                  </select>
                </div>

                <div>
                  <label className="flex items-center space-x-3 cursor-pointer p-4 bg-gray-50 rounded-2xl">
                    <input
                      type="checkbox"
                      checked={formData.firstTimeVisitor}
                      onChange={(e) => updateFormData('firstTimeVisitor', e.target.checked)}
                      className="w-5 h-5 text-gray-900 border-2 border-gray-300 rounded focus:ring-2 focus:ring-gray-900 bg-white"
                    />
                    <span className="text-lg font-medium text-gray-900">This will be my first time visiting</span>
                  </label>
                </div>
              </div>
            )}

            {/* Step 3: Additional Information */}
            {currentStep === 3 && (
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-6">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">A few more details</h3>
                  <p className="text-gray-600 text-lg">Help us make your visit as welcoming as possible</p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    How did you hear about us?
                  </label>
                  <select
                    value={formData.howHeardAboutUs}
                    onChange={(e) => updateFormData('howHeardAboutUs', e.target.value)}
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300"
                  >
                    <option value="">Please select...</option>
                    {howHeardOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Special needs or accessibility requirements
                  </label>
                  <textarea
                    value={formData.specialNeeds}
                    onChange={(e) => updateFormData('specialNeeds', e.target.value)}
                    placeholder="Let us know if you need wheelchair access, hearing assistance, childcare, or have any other special needs..."
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 resize-none"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Anything else you'd like us to know?
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                    placeholder="Questions, prayer requests, or anything else you'd like to share..."
                    className="w-full px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all duration-300 resize-none"
                    rows={4}
                  />
                </div>

                {/* Visit Summary */}
                <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
                  <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <svg className="w-6 h-6 text-gray-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Visit Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><span className="font-semibold text-gray-700">Name:</span> <span className="text-gray-900">{formData.firstName} {formData.lastName}</span></div>
                    <div><span className="font-semibold text-gray-700">Email:</span> <span className="text-gray-900">{formData.email}</span></div>
                    <div><span className="font-semibold text-gray-700">Event:</span> <span className="text-gray-900">{eventTypes.find(e => e.value === formData.eventType)?.label || 'Not selected'}</span></div>
                    <div><span className="font-semibold text-gray-700">Date:</span> <span className="text-gray-900">{formData.preferredDate || 'Not selected'}</span></div>
                    <div><span className="font-semibold text-gray-700">Group Size:</span> <span className="text-gray-900">{formData.groupSize === 1 ? 'Just me' : `${formData.groupSize} people`}</span></div>
                    <div><span className="font-semibold text-gray-700">First Visit:</span> <span className="text-gray-900">{formData.firstTimeVisitor ? 'Yes' : 'No'}</span></div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center px-6 py-3 font-semibold rounded-2xl transition-all duration-300 ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              {currentStep === totalSteps ? (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gray-900 text-white px-10 py-4 font-bold rounded-2xl hover:bg-gray-800 transition-all duration-300 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Planning Visit...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Plan My Visit
                    </>
                  )}
                </button>
              ) : (
                <button
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !isStep1Valid()) || 
                    (currentStep === 2 && !isStep2Valid())
                  }
                  className={`flex items-center px-10 py-4 font-bold rounded-2xl transition-all duration-300 ${
                    ((currentStep === 1 && !isStep1Valid()) || (currentStep === 2 && !isStep2Valid()))
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  Continue
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 