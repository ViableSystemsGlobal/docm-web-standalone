import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    // Test contacts table
    console.log('Testing contacts table...')
    const { data: contactsTest, error: contactsError } = await supabase
      .from('contacts')
      .select('id, first_name, last_name, email')
      .limit(1)

    console.log('Contacts test result:', { data: contactsTest, error: contactsError })

    // Test planned_visits table
    console.log('Testing planned_visits table...')
    const { data: visitsTest, error: visitsError } = await supabase
      .from('planned_visits')
      .select('id, contact_id, event_name')
      .limit(1)

    console.log('Planned visits test result:', { data: visitsTest, error: visitsError })

    return NextResponse.json({
      contacts: {
        success: !contactsError,
        error: contactsError?.message,
        data: contactsTest
      },
      plannedVisits: {
        success: !visitsError,
        error: visitsError?.message,
        data: visitsTest
      }
    })

  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 