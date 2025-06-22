import { useState, useEffect } from 'react'

export interface TenantSettings {
  id: string
  name: string
  address?: string
  contact_email?: string
  contact_phone?: string
  time_zone: string
  logo_url?: string
  logo_white_url?: string
  logo_black_url?: string
  logo_mobile_url?: string
  logo_web_url?: string
  logo_admin_url?: string
  primary_color: string
  secondary_color: string
  website?: string
  description?: string
  created_at: string
  updated_at: string
}

export interface UseTenantSettingsResult {
  settings: TenantSettings | null
  loading: boolean
  error: string | null
  churchName: string
  logoUrl: string | null
  webLogoUrl: string | null
  primaryColor: string
  secondaryColor: string
  refresh: () => void
}

export function useTenantSettings(): UseTenantSettingsResult {
  const [settings, setSettings] = useState<TenantSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch('/api/tenant-settings')
      const result = await response.json()
      
      if (result.success && result.data) {
        setSettings(result.data)
      } else {
        // Set default settings if none found
        setSettings({
          id: '',
          name: 'DOCM Church',
          time_zone: 'America/New_York',
          primary_color: '#1A202C',
          secondary_color: '#F6E05E',
          created_at: '',
          updated_at: ''
        })
      }
    } catch (err) {
      console.error('Failed to load tenant settings:', err)
      setError('Failed to load tenant settings')
      // Set default settings on error
      setSettings({
        id: '',
        name: 'DOCM Church',
        time_zone: 'America/New_York',
        primary_color: '#1A202C',
        secondary_color: '#F6E05E',
        created_at: '',
        updated_at: ''
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  const refresh = () => {
    loadSettings()
  }

  // Helper function to get the best logo for website use
  const getWebLogoUrl = (): string | null => {
    if (!settings) return null
    
    // Priority: web logo > white logo (for dark navbar) > primary logo
    return settings.logo_web_url || settings.logo_white_url || settings.logo_url || null
  }

  return {
    settings,
    loading,
    error,
    refresh,
    churchName: settings?.name || 'DOCM Church',
    logoUrl: settings?.logo_url || null,
    webLogoUrl: getWebLogoUrl(),
    primaryColor: settings?.primary_color || '#1A202C',
    secondaryColor: settings?.secondary_color || '#F6E05E'
  }
} 