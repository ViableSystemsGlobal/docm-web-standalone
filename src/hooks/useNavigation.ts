import { useState, useEffect } from 'react'

interface NavigationItem {
  id: string
  label: string
  href: string
  order: number
  is_active: boolean
  parent_id?: string
  children?: NavigationItem[]
}

interface NavigationResponse {
  navigation: NavigationItem[]
  source?: 'default' | 'database'
  message?: string
}

// Fallback navigation (your current menu structure)
const defaultNavigation: NavigationItem[] = [
  { id: '1', label: 'Home', href: '/', order: 0, is_active: true },
  { id: '2', label: 'About', href: '/about', order: 1, is_active: true },
  { id: '3', label: 'Events', href: '/events', order: 2, is_active: true },
  { 
    id: '4', 
    label: 'Media', 
    href: '#', 
    order: 3, 
    is_active: true,
    children: [
      { id: '4a', label: 'Sermons', href: '/media/sermons', order: 0, is_active: true, parent_id: '4' },
      { id: '4b', label: 'Gallery', href: '/media/gallery', order: 1, is_active: true, parent_id: '4' },
      { id: '4c', label: 'Blog', href: '/media/blog', order: 2, is_active: true, parent_id: '4' }
    ]
  },
  { id: '5', label: 'Contact', href: '/contact', order: 4, is_active: true }
]

export function useNavigation() {
  const [navigation, setNavigation] = useState<NavigationItem[]>(defaultNavigation)
  const [loading, setLoading] = useState(false) // Start with false since we have default data
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<'default' | 'database'>('default')
  const [message, setMessage] = useState<string>('Using default navigation')

  useEffect(() => {
    async function fetchNavigation() {
      setLoading(true)
      
      try {
        const response = await fetch('/api/navigation', {
          cache: 'no-store' // Always fetch fresh navigation data
        })
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data: NavigationResponse = await response.json()
        
        if (data.navigation && data.navigation.length > 0) {
          setNavigation(data.navigation)
          setSource(data.source || 'default')
          setMessage(data.message || 'Navigation loaded')
          setError(null) // Clear any previous errors
          
          // Log to console for easy debugging
          console.log(`🎯 Navigation Source: ${data.source?.toUpperCase()} - ${data.message}`)
        } else {
          // If no navigation in database, use default
          console.log('No navigation items found, using default navigation')
          setNavigation(defaultNavigation)
          setSource('default')
          setMessage('Using default navigation - No items found')
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load navigation'
        setError(errorMessage)
        console.log('Navigation fetch failed, using default navigation:', errorMessage)
        
        // Keep default navigation on error
        setNavigation(defaultNavigation)
        setSource('default')
        setMessage('Using default navigation - Fetch failed')
      } finally {
        setLoading(false)
      }
    }

    fetchNavigation()
  }, [])

  return { navigation, loading, error, source, message }
} 