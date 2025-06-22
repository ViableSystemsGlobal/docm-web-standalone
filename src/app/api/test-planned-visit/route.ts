import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    // Use an existing contact ID from test
    const contactId = '5fe770f5-aab0-419d-8a0f-4ef55fecca79'
    const eventDateTime = new Date('2025-01-15T10:00:00')

    console.log('Testing planned visit creation...')

    const { data, error } = await supabase
      .from('planned_visits')
      .insert({
        contact_id: contactId,
        event_name: 'Sunday Worship Service',
        event_date: eventDateTime.toISOString(),
        event_time: '10:00',
        interest_level: 'interested',
        how_heard_about_us: 'Google Search',
        coming_with_others: true,
        companions_count: 1,
        companions_details: 'Group of 2 people',
        special_needs: 'Wheelchair accessible',
        contact_preference: 'email',
        notes: 'Looking forward to visiting!',
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select('id')
      .single()

    if (error) {
      console.error('Planned visit creation error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
    }

    console.log('Planned visit created successfully:', data)
    return NextResponse.json({ success: true, plannedVisit: data })

  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 