import { useState, useEffect } from 'react'

export type FooterSection = {
  id: string
  title: string
  type: 'links' | 'contact' | 'social' | 'newsletter' | 'custom'
  content: any
  order: number
  enabled: boolean
}

export type FooterSettings = {
  enabled: boolean
  layout: string
  backgroundColor: string
  textColor: string
  showChurchLogo: boolean
  logoUrl?: string
  showCopyright: boolean
  copyrightText: string
  sections: FooterSection[]
}

export function useFooter() {
  const [footer, setFooter] = useState<FooterSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'default' | 'database'>('default')

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/footer', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log('📦 Footer data received:', {
          source: data.source,
          enabled: data.footer.enabled,
          sectionsCount: data.footer.sections?.length || 0,
          message: data.message
        })

        setFooter(data.footer)
        setSource(data.source)
        setError(null)
      } catch (err) {
        console.error('❌ Footer fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch footer')
        // Don't set footer to null on error, let it stay as the default
      } finally {
        setLoading(false)
      }
    }

    fetchFooter()
  }, [])

  return { 
    footer, 
    loading, 
    error, 
    source,
    refresh: () => {
      setLoading(true)
      setError(null)
      // Re-trigger the effect by changing a dependency or call fetchFooter directly
    }
  }
} 