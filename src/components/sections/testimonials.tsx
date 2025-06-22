'use client'

import { useHomepage } from '@/hooks/useHomepage'
import { useState, useEffect, useRef } from 'react'

export function Testimonials() {
  const { homepage, loading, error, source } = useHomepage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Get testimonials content from CMS
  const testimonialsContent = homepage.testimonials
  const testimonials = testimonialsContent?.featured_testimonials || []

  // Auto-slide every 10 seconds
  useEffect(() => {
    if (testimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      )
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  // Manual navigation functions
  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Function to handle video play/pause
  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      } else {
        videoRef.current.pause()
      }
    }
  }

  if (loading) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-pulse">
            <div className="lg:col-span-1">
              <div className="h-[600px] bg-gray-300 rounded-3xl"></div>
            </div>
            <div className="lg:col-span-2 flex flex-col">
              <div className="w-16 h-16 bg-gray-300 rounded mb-8"></div>
              <div className="mb-12">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-full mb-4"></div>
                <div className="h-8 bg-gray-300 rounded w-2/3 mb-8"></div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !testimonials.length) {
    return (
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-600">
              {error ? `Error loading testimonials: ${error}` : 'No testimonials available'}
            </p>
          </div>
        </div>
      </section>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-16">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-4">
              {testimonialsContent?.subtitle || "Testimonials"}
            </p>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              {testimonialsContent?.title || "Members about our community."}
            </h2>
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex gap-4 mt-8">
            <button 
              onClick={goToPrevious}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={goToNext}
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-gray-900 transition-all duration-300 hover:shadow-xl"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Testimonials Grid - Kept first video, removed second */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Video/Image Testimonial - Cycles through testimonials */}
          <div className="lg:col-span-1">
            <div 
              className="relative h-[600px] rounded-3xl overflow-hidden group cursor-pointer transition-all duration-500"
              onClick={() => currentTestimonial?.video_url && handleVideoClick()}
            >
              {/* Video/Image Background */}
              {currentTestimonial?.video_url ? (
                <video 
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  muted
                  loop
                  preload="metadata"
                  poster={currentTestimonial?.image_url}
                  ref={videoRef}
                  key={currentIndex} // Force re-render when testimonial changes
                >
                  <source src={currentTestimonial.video_url} type="video/mp4" />
                </video>
              ) : currentTestimonial?.image_url ? (
                <img 
                  src={currentTestimonial.image_url} 
                  alt={currentTestimonial?.name}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  key={currentIndex}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
              )}
              
              {/* Play Button - only show if has video */}
              {currentTestimonial?.has_video && currentTestimonial?.video_url && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
              )}
              
              {/* Member Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                <h3 className="text-2xl font-bold text-white mb-2">{currentTestimonial?.name}</h3>
                <p className="text-gray-200 font-medium">{currentTestimonial?.role}</p>
              </div>
            </div>
          </div>

          {/* Quote Section - Shows current testimonial quote */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            {/* Large Quote Mark */}
            <div className="mb-8">
              <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
              </svg>
            </div>

            {/* Featured Quote */}
            <div className="mb-12">
              <p className="text-2xl md:text-3xl font-medium text-gray-900 leading-relaxed mb-8 transition-all duration-500">
                "{currentTestimonial?.quote}"
              </p>
              
              {/* Author Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                  {currentTestimonial?.image_url ? (
                    <img 
                      src={currentTestimonial.image_url} 
                      alt={currentTestimonial?.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {currentTestimonial?.name?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{currentTestimonial?.name}</h4>
                  <p className="text-gray-600">{currentTestimonial?.role}</p>
                </div>
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-gray-900 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Slide Counter */}
            <div className="mt-4">
              <span className="text-sm text-gray-500">
                {currentIndex + 1} of {testimonials.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 