import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Default footer content when database is not available
const getDefaultFooter = async (supabase?: any) => {
  let logoUrl: string | undefined

  // Try to get logo from tenant settings as fallback
  if (supabase) {
    try {
      const { data: tenantSettings } = await supabase
        .from('tenant_settings')
        .select('logo_url, logo_web_url, logo_white_url')
        .single()
      
      if (tenantSettings) {
        logoUrl = tenantSettings.logo_web_url || tenantSettings.logo_white_url || tenantSettings.logo_url
      }
    } catch (error) {
      console.log('Could not fetch tenant logo for footer fallback:', error)
    }
  }

  return {
    enabled: true,
    layout: 'columns',
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    showChurchLogo: true,
    logoUrl,
    showCopyright: true,
    copyrightText: '© 2024 DOCM Church. All rights reserved.',
    sections: [
      {
        id: 'church-info',
        title: 'DOCM Church',
        type: 'custom',
        content: {
          description: 'Building a community of faith that transforms lives through God\'s love, worship, and service to others.',
          showSocial: true,
          socialLinks: [
            { platform: 'facebook', url: '#', enabled: true },
            { platform: 'instagram', url: '#', enabled: true },
            { platform: 'youtube', url: '#', enabled: true }
          ]
        },
        order: 1,
        enabled: true
      },
      {
        id: 'quick-links',
        title: 'Quick Links',
        type: 'links',
        content: {
          links: [
            { id: '1', label: 'About Us', url: '/about', external: false, enabled: true },
            { id: '2', label: 'Ministries', url: '/ministries', external: false, enabled: true },
            { id: '3', label: 'Events', url: '/events', external: false, enabled: true },
            { id: '4', label: 'Sermons', url: '/sermons', external: false, enabled: true },
            { id: '5', label: 'Contact', url: '/contact', external: false, enabled: true },
            { id: '6', label: 'Give', url: '/give', external: false, enabled: true }
          ]
        },
        order: 2,
        enabled: true
      },
      {
        id: 'ministries',
        title: 'Ministries',
        type: 'links',
        content: {
          links: [
            { id: '1', label: 'Children\'s Ministry', url: '/ministries/children', external: false, enabled: true },
            { id: '2', label: 'Youth Ministry', url: '/ministries/youth', external: false, enabled: true },
            { id: '3', label: 'Worship Team', url: '/ministries/worship', external: false, enabled: true },
            { id: '4', label: 'Community Outreach', url: '/ministries/outreach', external: false, enabled: true }
          ]
        },
        order: 3,
        enabled: true
      },
      {
        id: 'contact',
        title: 'Contact & Service Times',
        type: 'contact',
        content: {
          address: '123 Church Street\nCity, State 12345',
          phone: '(555) 123-4567',
          email: 'info@docmchurch.com',
          serviceTimes: [
            'Sunday: 9:00 AM & 11:00 AM',
            'Wednesday: 7:00 PM',
            'Friday Youth: 7:00 PM'
          ]
        },
        order: 4,
        enabled: true
      },
      {
        id: 'app-download',
        title: 'Download Our App',
        type: 'app_download',
        content: {
          iosUrl: '#',
          androidUrl: '#',
          description: 'Stay connected with our church community. Get sermon notes, event updates, and more.'
        },
        order: 5,
        enabled: true
      }
    ]
  }
}

export async function GET(request: NextRequest) {
  try {
    // Environment check - same pattern as homepage API
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('🔄 FOOTER SOURCE: DEFAULT (Supabase not configured)')
      const defaultFooter = await getDefaultFooter()
      return NextResponse.json({ 
        footer: defaultFooter,
        source: 'default',
        message: 'Using default footer - Supabase not configured'
      })
    }

    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (error) {
      console.log('🔄 FOOTER SOURCE: DEFAULT (Supabase client creation failed)')
      const defaultFooter = await getDefaultFooter()
      return NextResponse.json({ 
        footer: defaultFooter,
        source: 'default',
        message: 'Using default footer - Supabase client failed'
      })
    }

    // Fetch footer settings from database
    console.log('🔍 Attempting to fetch footer settings from database...')
    
    const { data: footerSettings, error: footerError } = await supabase
      .from('footer_settings')
      .select('*')
      .single()

    if (footerError || !footerSettings) {
      console.log('🔄 FOOTER SOURCE: DEFAULT (No footer settings found)')
      console.log('Footer error:', footerError?.message)
      const defaultFooter = await getDefaultFooter(supabase)
      return NextResponse.json({ 
        footer: defaultFooter,
        source: 'default',
        message: 'Using default footer - No footer settings found in database'
      })
    }

    console.log('✅ FOOTER SOURCE: DATABASE')
    console.log('Footer settings found:', footerSettings)

    // Convert database format to component format (snake_case to camelCase)
    const footer = {
      enabled: footerSettings.enabled,
      layout: footerSettings.layout,
      backgroundColor: footerSettings.background_color,
      textColor: footerSettings.text_color,
      showChurchLogo: footerSettings.show_church_logo,
      logoUrl: footerSettings.logo_url,
      showCopyright: footerSettings.show_copyright,
      copyrightText: footerSettings.copyright_text,
      sections: footerSettings.sections || []
    }

    return NextResponse.json({
      footer,
      source: 'database',
      message: 'Footer loaded from database'
    })

  } catch (error) {
    console.error('Footer API error:', error)
    const defaultFooter = await getDefaultFooter()
    return NextResponse.json({ 
      footer: defaultFooter,
      source: 'default',
      message: `Using default footer - API error: ${error instanceof Error ? error.message : 'Unknown error'}`
    })
  }
} 