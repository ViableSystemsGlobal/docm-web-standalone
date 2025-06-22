import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('🔍 DEBUG: Testing gallery page database connection...')
    
    // Environment check
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json({ 
        error: 'Supabase not configured',
        env: {
          hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
          hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        }
      })
    }

    let supabase
    try {
      supabase = createServerSupabaseClient()
      console.log('✅ DEBUG: Supabase client created successfully')
    } catch (error) {
      console.error('❌ DEBUG: Supabase client creation failed:', error)
      return NextResponse.json({ 
        error: 'Supabase client creation failed',
        details: error
      })
    }

    // Test 1: Check if gallery page exists
    console.log('🔍 DEBUG: Checking if gallery page exists...')
    const { data: page, error: pageError } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', 'gallery')
      .single()

    console.log('📊 DEBUG: Gallery page query result:', { page, pageError })

    if (pageError) {
      return NextResponse.json({ 
        error: 'Gallery page not found',
        pageError: pageError.message,
        step: 'page_lookup'
      })
    }

    // Test 2: Check if sections exist
    console.log('🔍 DEBUG: Checking gallery page sections...')
    const { data: sections, error: sectionsError } = await supabase
      .from('page_sections')
      .select('*')
      .eq('page_id', page.id)
      .order('order', { ascending: true })

    console.log('📊 DEBUG: Gallery sections query result:', { sections, sectionsError })

    return NextResponse.json({ 
      success: true,
      page,
      sections,
      sectionsCount: sections?.length || 0,
      pageId: page.id,
      timestamp: new Date().toISOString(),
      message: (sections && sections.length > 0) ? 'Gallery page and sections found!' : 'Gallery page found but no sections'
    })

  } catch (error) {
    console.error('❌ DEBUG: Unexpected error:', error)
    return NextResponse.json({ 
      error: 'Unexpected error',
      details: error instanceof Error ? error.message : String(error)
    })
  }
} 