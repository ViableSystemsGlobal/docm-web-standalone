import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Fallback navigation data in case database is not available
const defaultNavigation = [
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

export async function GET(request: NextRequest) {
  try {
    // Check if environment variables are configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('🔄 NAVIGATION SOURCE: DEFAULT (Supabase not configured)')
      return NextResponse.json({ 
        navigation: defaultNavigation,
        source: 'default',
        message: 'Using default navigation - Supabase not configured'
      })
    }

    let supabase
    try {
      supabase = createServerSupabaseClient()
    } catch (error) {
      console.log('🔄 NAVIGATION SOURCE: DEFAULT (Supabase client creation failed)')
      return NextResponse.json({ 
        navigation: defaultNavigation,
        source: 'default',
        message: 'Using default navigation - Supabase client failed'
      })
    }

    // Fetch navigation items from the database
    console.log('🔍 Attempting to fetch navigation from database...')
    const { data: navItems, error } = await supabase
      .from('navigation')
      .select('*')
      .eq('is_active', true)
      .order('order', { ascending: true })

    console.log('📊 Database query result:', {
      data: navItems,
      error: error,
      dataLength: navItems ? navItems.length : 0
    })

    if (error) {
      console.error('🔄 NAVIGATION SOURCE: DEFAULT (Database error):', error.message)
      console.error('🔍 Full error details:', error)
      // If table doesn't exist or other DB error, fall back to default
      if (error.code === 'PGRST116' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        console.log('🔄 NAVIGATION SOURCE: DEFAULT (Navigation table does not exist)')
        return NextResponse.json({ 
          navigation: defaultNavigation,
          source: 'default',
          message: 'Using default navigation - Database table does not exist'
        })
      }
      return NextResponse.json({ 
        navigation: defaultNavigation,
        source: 'default',
        message: `Using default navigation - Database error: ${error.message}`
      })
    }

    // If no navigation items found, use default
    if (!navItems || navItems.length === 0) {
      console.log('🔄 NAVIGATION SOURCE: DEFAULT (No items in database)')
      return NextResponse.json({ 
        navigation: defaultNavigation,
        source: 'default',
        message: 'Using default navigation - No items found in database'
      })
    }

    // Build navigation tree (parent-child relationships)
    const navTree = buildNavigationTree(navItems)

    console.log('🗄️ NAVIGATION SOURCE: DATABASE (Successfully loaded from Supabase)')
    return NextResponse.json({ 
      navigation: navTree,
      source: 'database',
      message: 'Navigation loaded from database'
    })
  } catch (error) {
    console.error('🔄 NAVIGATION SOURCE: DEFAULT (Unexpected error):', error)
    // Always fall back to default navigation on any error
    return NextResponse.json({ 
      navigation: defaultNavigation,
      source: 'default',
      message: 'Using default navigation - Unexpected error'
    })
  }
}

function buildNavigationTree(items: any[]) {
  const itemMap = new Map()
  const rootItems: any[] = []

  // Initialize all items with children array
  items.forEach(item => {
    itemMap.set(item.id, { ...item, children: [] })
  })

  // Build tree structure
  items.forEach(item => {
    const itemWithChildren = itemMap.get(item.id)!
    if (item.parent_id && itemMap.has(item.parent_id)) {
      itemMap.get(item.parent_id)!.children.push(itemWithChildren)
    } else {
      rootItems.push(itemWithChildren)
    }
  })

  // Sort by order
  rootItems.sort((a, b) => a.order - b.order)
  rootItems.forEach(item => {
    item.children.sort((a: any, b: any) => a.order - b.order)
  })

  return rootItems
} 