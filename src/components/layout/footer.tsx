'use client'

import Link from 'next/link'
import { useFooter } from '@/hooks/useFooter'

// Helper function to get social media icons
function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case 'facebook':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    case 'instagram':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986 6.618 0 11.985-5.368 11.985-11.986C23.002 5.367 17.635.001 12.017.001zM8.948 16.015c-.128 0-.256-.049-.354-.146L5.657 13.02c-.195-.195-.195-.512 0-.707.195-.195.512-.195.707 0l2.584 2.584 5.39-5.39c.195-.195.512-.195.707 0 .195.195.195.512 0 .707l-5.744 5.744c-.098.097-.226.146-.354.146z"/>
        </svg>
      )
    case 'youtube':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    case 'twitter':
    case 'x':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    default:
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.49-2.068 4.663-1.173 1.173-2.805 1.9-4.663 2.068-.394.036-.79.054-1.186.054-.396 0-.792-.018-1.186-.054-1.858-.169-3.49-.896-4.663-2.068C2.63 11.65 1.903 10.018 1.734 8.16 1.698 7.766 1.68 7.37 1.68 6.974c0-.396.018-.792.054-1.186C1.903 3.93 2.63 2.298 3.802 1.125 4.975-.047 6.607-.775 8.465-.944 8.859-.98 9.255-.998 9.651-.998c.396 0 .792.018 1.186.054 1.858.169 3.49.896 4.663 2.068 1.173 1.173 1.9 2.805 2.068 4.663.036.394.054.79.054 1.186 0 .396-.018.792-.054 1.187z"/>
        </svg>
      )
  }
}

// Helper function to render footer sections
function renderFooterSection(section: any) {
  if (!section.enabled) return null

  switch (section.type) {
    case 'custom':
      return (
        <div key={section.id} className="lg:col-span-1">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-xl">D</span>
            </div>
            <h3 className="text-2xl font-bold text-white">{section.title}</h3>
          </div>
          
          {section.content.description && (
            <p className="text-gray-300 mb-8 leading-relaxed text-sm">
              {section.content.description}
            </p>
          )}
          
          {/* Social Links */}
          {section.content.showSocial && section.content.socialLinks && (
            <div className="flex space-x-3">
              {section.content.socialLinks
                .filter((social: any) => social.enabled)
                .map((social: any, index: number) => (
                <Link 
                  key={`${social.platform}-${index}`}
                  href={social.url}
                  className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-300 hover:scale-105"
                  aria-label={social.platform}
                >
                  {getSocialIcon(social.platform)}
                </Link>
              ))}
            </div>
          )}
        </div>
      )

    case 'links':
      return (
        <div key={section.id}>
          <h4 className="text-lg font-bold text-white mb-8">{section.title}</h4>
          <ul className="space-y-4">
            {section.content.links
              ?.filter((link: any) => link.enabled)
              ?.map((link: any) => (
              <li key={link.id}>
                <Link 
                  href={link.url} 
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group text-sm font-medium"
                  {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span>{link.label}</span>
                  <svg className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )

    case 'contact':
      return (
        <div key={section.id}>
          <h4 className="text-lg font-bold text-white mb-8">{section.title}</h4>
          
          {/* Contact Info */}
          <div className="space-y-6 mb-8">
            {section.content.address && (
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 flex items-center justify-center mt-0.5 flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="text-gray-300 text-sm">
                  {section.content.address.split('\n').map((line: string, index: number) => (
                    <p key={index} className="leading-relaxed">{line}</p>
                  ))}
                </div>
              </div>
            )}
            
            {section.content.phone && (
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href={`tel:${section.content.phone}`} className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">
                  {section.content.phone}
                </a>
              </div>
            )}
            
            {section.content.email && (
              <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href={`mailto:${section.content.email}`} className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium">
                  {section.content.email}
                </a>
              </div>
            )}
          </div>
          
          {/* Service Times */}
          {section.content.serviceTimes && section.content.serviceTimes.length > 0 && (
            <div className="text-gray-300 space-y-3">
              <h5 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">Service Times</h5>
              {section.content.serviceTimes.map((time: string, index: number) => (
                <p key={index} className="text-sm leading-relaxed">{time}</p>
              ))}
            </div>
          )}
        </div>
      )

    case 'app_download':
      return (
        <div key={section.id}>
          <h4 className="text-lg font-bold text-white mb-8">Download Our App</h4>
          <div className="space-y-4">
            {/* iOS App Store */}
            <a
              href={section.content.iosUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-[200px] hover:opacity-80 transition-opacity duration-300"
              aria-label="Download on the App Store"
            >
              <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors duration-300">
                {/* App Store Icon */}
                <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-600">Download on the</div>
                  <div className="text-sm font-bold text-black">App Store</div>
                </div>
              </div>
            </a>

            {/* Google Play Store */}
            <a
              href={section.content.androidUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-[200px] hover:opacity-80 transition-opacity duration-300"
              aria-label="Get it on Google Play"
            >
              <div className="bg-white rounded-lg px-4 py-3 flex items-center gap-3 hover:bg-gray-100 transition-colors duration-300">
                {/* Google Play Icon */}
                <svg className="w-8 h-8 text-black" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-600">Get it on</div>
                  <div className="text-sm font-bold text-black">Google Play</div>
                </div>
              </div>
            </a>

            {/* App Description */}
            {section.content.description && (
              <p className="text-gray-300 text-xs leading-relaxed mt-6">
                {section.content.description}
              </p>
            )}
          </div>
        </div>
      )

    case 'social':
      return (
        <div key={section.id}>
          <h4 className="text-lg font-bold text-white mb-8">{section.title}</h4>
          <div className="flex flex-col space-y-4">
            {section.content.links
              ?.filter((social: any) => social.enabled)
              ?.map((social: any, index: number) => (
              <Link 
                key={`${social.platform}-${index}`}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors duration-300 group"
                aria-label={`Follow us on ${social.platform}`}
              >
                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-gray-700 transition-all duration-300">
                  {getSocialIcon(social.platform)}
                </div>
                <span className="text-sm font-medium capitalize">{social.platform}</span>
              </Link>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}

export function Footer() {
  const { footer, loading, error } = useFooter()

  if (loading) {
    return (
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="space-y-4">
                  <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-full"></div>
                    <div className="h-4 bg-gray-800 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-800 rounded w-4/6"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    )
  }

  if (error || !footer) {
    console.error('Footer error:', error)
    // Return a minimal footer as fallback
    return (
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">DOCM Church</h3>
            <p className="text-gray-400">© 2024 DOCM Church. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }

  if (!footer.enabled) {
    return null
  }

  // Sort sections by order
  const enabledSections = footer.sections
    .filter(section => section.enabled)
    .sort((a, b) => a.order - b.order)

  // Determine grid layout based on number of sections
  const getGridCols = () => {
    const count = enabledSections.length
    if (count <= 1) return 'grid-cols-1'
    if (count === 2) return 'grid-cols-1 md:grid-cols-2'
    if (count === 3) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    if (count === 4) return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
  }

  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="pt-16 pb-12">
          {/* Logo Section */}
          {footer.logoUrl && footer.showChurchLogo && (
            <div className="flex justify-center mb-16">
              <img 
                src={footer.logoUrl} 
                alt="Church Logo" 
                className="h-20 w-auto opacity-95 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          )}
          
          {/* Footer Sections Grid */}
          <div className={`grid ${getGridCols()} gap-12 lg:gap-16`}>
            {enabledSections.map(section => renderFooterSection(section))}
          </div>
        </div>
        
        {/* Bottom Section */}
        {footer.showCopyright && (
          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm font-medium">
                {footer.copyrightText}
              </p>
              <div className="flex space-x-8 mt-4 md:mt-0">
                <Link href="/privacy" className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/accessibility" className="text-gray-400 hover:text-white text-sm font-medium transition-colors duration-300">
                  Accessibility
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
} 