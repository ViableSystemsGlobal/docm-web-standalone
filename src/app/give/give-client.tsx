'use client'

import { useGivingPage } from '@/hooks/useGivingPage'
import { GivingHero } from '@/components/sections/giving-hero'
import { GivingForm } from '@/components/sections/giving-form'

export default function GivingPageClient() {
  const { data: givingData, loading, error } = useGivingPage()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-8"></div>
            <div className="h-64 bg-gray-300 rounded mb-8"></div>
            <div className="h-32 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Unable to load giving page
            </h1>
            <p className="text-gray-600 mb-8">
              We're having trouble loading the page content. Please try again later.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!givingData) {
    return null
  }

  return (
    <>
      {/* Hero Section */}
      <GivingHero />
      
      {/* Giving Form */}
      <GivingForm />

      {/* Impact Section */}
      <section id="giving-impact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Impact
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how your faithful giving enables us to transform lives and serve our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Families Served", value: "500+", description: "Through our food pantry and assistance programs" },
              { label: "Youth Impacted", value: "150+", description: "Participating in youth programs and activities" },
              { label: "Missionaries Supported", value: "12", description: "Local and international mission work" },
              { label: "Community Events", value: "25+", description: "Annual outreach and service events" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {stat.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
} 