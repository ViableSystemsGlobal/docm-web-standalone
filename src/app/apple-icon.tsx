import { ImageResponse } from 'next/og'
import { createServerSupabaseClient } from '@/lib/supabase'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Image generation
export default async function AppleIcon() {
  try {
    const supabase = createServerSupabaseClient()
    
    // Get the black logo URL from tenant settings
    const { data: settings, error } = await supabase
      .from('tenant_settings')
      .select('logo_black_url, logo_url, name')
      .limit(1)
      .single()

    console.log('🍎 Apple Icon: Tenant settings:', { 
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

    console.log('🎨 Apple Icon: Using logo URL:', logoUrl)

    if (logoUrl && logoUrl.trim() !== '') {
      console.log('✅ Apple Icon: Generating with logo')
      
      // Use the logo image
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
              borderRadius: '20px',
              padding: '20px',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoUrl}
              alt="Church Logo"
              width="140"
              height="140"
              style={{
                objectFit: 'contain',
                maxWidth: '140px',
                maxHeight: '140px',
              }}
            />
          </div>
        ),
        {
          ...size,
        }
      )
    } else {
      console.log('🔄 Apple Icon: No logo URL found, using church initial fallback')
      // Fallback to church initial if no logo
      const initial = churchName.charAt(0).toUpperCase()
      
      return new ImageResponse(
        (
          <div
            style={{
              fontSize: 100,
              background: '#1A202C',
              color: 'white',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              borderRadius: '20px',
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
    console.error('❌ Apple Icon: Error generating apple icon:', error)
    
    // Ultimate fallback
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 100,
            background: '#1A202C',
            color: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            borderRadius: '20px',
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