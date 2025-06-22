'use client'

import { useEffect, useRef, useState } from 'react'
import { useTenantSettings } from '@/hooks/useTenantSettings'

export function LocationMap() {
  const { settings, loading: settingsLoading } = useTenantSettings()
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapError, setMapError] = useState<string | null>(null)

  // Church address from settings or default
  const churchAddress = settings?.address || "Aurora, Colorado"
  const churchName = settings?.name || "DOCM Church"
  const churchEmail = settings?.contact_email || "info@docmchurch.org"
  const churchPhone = settings?.contact_phone || "(555) 123-4567"

  useEffect(() => {
    const initializeMap = () => {
      const globalThis = window as any
      
      if (globalThis.google?.maps?.Map) {
        setMapLoaded(true)
        return
      }

      // Load Google Maps API
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      if (!apiKey) {
        setMapError('Google Maps API key not configured')
        return
      }

      // Check if script already exists
      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]')
      if (existingScript) {
        // Script exists, wait for it to load
        const checkLoaded = () => {
          if (globalThis.google?.maps?.Map) {
            setMapLoaded(true)
          } else {
            setTimeout(checkLoaded, 100)
          }
        }
        checkLoaded()
        return
      }

      // Create new script
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGoogleMapsLocationMap`
      script.async = true
      script.defer = true

      // Set up callback
      ;(globalThis as any).initGoogleMapsLocationMap = () => {
        if (globalThis.google?.maps?.Map) {
          setMapLoaded(true)
        } else {
          console.error('Google Maps callback fired but API not fully loaded')
          setMapError('Failed to initialize Google Maps')
        }
      }

      // Handle script load errors
      script.onerror = () => {
        setMapError('Failed to load Google Maps script')
      }

      document.head.appendChild(script)
    }

    initializeMap()
  }, [])

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !churchAddress) return

    const createMap = () => {
      const globalThis = window as any
      
      if (!globalThis.google?.maps?.Map) {
        console.warn('Google Maps not fully loaded yet')
        return
      }
      
      try {
        // Default center (Aurora, Colorado coordinates)
        const defaultCenter = { lat: 39.7294, lng: -104.8319 }

        const map = new globalThis.google.maps.Map(mapRef.current, {
          zoom: 14,
          center: defaultCenter,
          disableDefaultUI: true,
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        })

        // Geocode the church address
        const geocoder = new globalThis.google.maps.Geocoder()
        geocoder.geocode({ address: churchAddress }, (results: any[], status: any) => {
          if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location
            map.setCenter(location)
            map.setZoom(15)
            
            // Add marker for the church
            new globalThis.google.maps.Marker({
              position: location,
              map,
              title: churchName,
              icon: {
                path: globalThis.google.maps.SymbolPath.CIRCLE,
                scale: 12,
                fillColor: '#000000',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 3
              }
            })

            // Add info window
            const infoWindow = new globalThis.google.maps.InfoWindow({
              content: `
                <div style="padding: 10px; max-width: 250px;">
                  <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold; color: #000;">${churchName}</h3>
                  <p style="margin: 0 0 4px 0; font-size: 14px; color: #666;">${churchAddress}</p>
                  <div style="margin-top: 8px;">
                    <a href="https://maps.google.com/?q=${encodeURIComponent(churchAddress)}" target="_blank" style="color: #0066cc; text-decoration: none; font-size: 14px;">Get Directions</a>
                  </div>
                </div>
              `
            })

            // Show info window on marker click
            new globalThis.google.maps.Marker({
              position: location,
              map,
              title: churchName
            }).addListener('click', () => {
              infoWindow.open(map)
            })

          } else {
            console.warn('Geocoding failed:', status)
            // Still show the map with default location
          }
        })

        setMapError(null)
      } catch (err) {
        console.error('Error creating map:', err)
        setMapError('Failed to load map')
      }
    }

    // Add a small delay to ensure Google Maps is fully loaded
    const timer = setTimeout(createMap, 100)
    return () => clearTimeout(timer)
  }, [mapLoaded, churchAddress, churchName])

  if (settingsLoading) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-32 mx-auto mb-4"></div>
              <div className="h-12 bg-gray-300 rounded w-96 mx-auto mb-8"></div>
              <div className="h-96 bg-gray-300 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-gray-600 mb-6">
            Find Us
          </p>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1]">
            Visit Our Church
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're located at {churchAddress} and easy to find. Join us for worship and fellowship in our welcoming community.
          </p>
        </div>

        {/* Full Width Map */}
        <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl mb-12">
          {mapError ? (
            // Fallback when Google Maps fails
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-700">
              <div className="absolute inset-0 bg-black/20"></div>
              
              <div className="absolute inset-0 opacity-20">
                <div 
                  className="h-full w-full"
                  style={{
                    backgroundImage: `
                      linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.1) 75%)
                    `,
                    backgroundSize: '30px 30px',
                    animation: 'moveBackground 25s linear infinite'
                  }}
                ></div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{churchName}</h3>
                  <p className="text-green-100 text-lg mb-2">{churchAddress}</p>
                  <p className="text-green-100 text-sm">Click to view directions</p>
                </div>
              </div>
              
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(churchAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
              >
                <span className="sr-only">View on Google Maps</span>
              </a>
            </div>
          ) : (
            // Google Maps container
            <div
              ref={mapRef}
              className="w-full h-full"
            />
          )}
        </div>

        {/* Action Buttons - Below Map */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(churchAddress)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-8 py-4 font-semibold hover:bg-gray-800 transition-colors duration-300 text-center inline-flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            Get Directions
          </a>
          {churchEmail && (
            <a
              href={`mailto:${churchEmail}`}
              className="border-2 border-black text-black px-8 py-4 font-semibold hover:bg-black hover:text-white transition-colors duration-300 text-center inline-flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Us
            </a>
          )}
          {churchPhone && (
            <a
              href={`tel:${churchPhone}`}
              className="border-2 border-black text-black px-8 py-4 font-semibold hover:bg-black hover:text-white transition-colors duration-300 text-center inline-flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Us
            </a>
          )}
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