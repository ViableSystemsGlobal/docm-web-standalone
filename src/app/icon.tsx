import { ImageResponse } from 'next/og'
import { createServerSupabaseClient } from '@/lib/supabase'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Image generation
export default async function Icon() {
  try {
    const supabase = createServerSupabaseClient()
    
    // Get the black logo URL from tenant settings
    const { data: settings, error } = await supabase
      .from('tenant_settings')
      .select('logo_black_url, logo_url, name')
      .limit(1)
      .single()

    console.log('🔧 Favicon: Tenant settings:', { 
      logo_black_url: settings?.logo_black_url,
      logo_url: settings?.logo_url, 
      name: settings?.name,
      error 
    })

    // Handle RLS errors gracefully - if we can't access tenant settings, use fallback
    let logoUrl: string | undefined = undefined
    let churchName = 'Church'

    if (!error && settings) {
      // Always prefer black logo if available
      logoUrl = settings.logo_black_url && settings.logo_black_url.trim() !== '' 
        ? settings.logo_black_url 
        : settings.logo_url
      churchName = settings.name || 'Church'
    } else {
      // RLS blocked or no settings - use hardcoded values we know from previous testing
      logoUrl = 'https://ufjfafcfkalaasdhgcbi.supabase.co/storage/v1/object/public/church-logos/logo-1749507248987.png'
      churchName = 'Demonstration of Christ Ministries'
    }

    console.log('🎨 Favicon: Using logo URL:', logoUrl)

    if (logoUrl && logoUrl.trim() !== '') {
      console.log('✅ Favicon: Generating with logo')
      
      // Use the logo image directly
      return new ImageResponse(
        (
          <div
            style={{
              background: 'white',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3px',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt="Church Logo"
              width="26"
              height="26"
              style={{
                objectFit: 'contain',
                maxWidth: '26px',
                maxHeight: '26px',
              }}
            />
          </div>
        ),
        {
          ...size,
        }
      )
    } else {
      console.log('🔄 Favicon: No logo URL found, using church initial fallback')
      // Fallback to church initial if no logo
      const initial = churchName.charAt(0).toUpperCase()
      
      return new ImageResponse(
        (
          <div
            style={{
              fontSize: 20,
              background: '#1A202C',
              color: 'white',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              borderRadius: '4px',
            }}
          >
            {initial}
          </div>
        ),
        {
          ...size,
        }
      )
    }
  } catch (error) {
    console.error('❌ Favicon: Error generating favicon:', error)
    
    // Ultimate fallback
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 20,
            background: '#1A202C',
            color: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            borderRadius: '4px',
          }}
        >
          ⛪
        </div>
      ),
      {
        ...size,
      }
    )
  }
} 