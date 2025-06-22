import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

interface PlannedVisitFormData {
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  
  // Visit Details
  eventType: string
  preferredDate: string
  preferredTime: string
  groupSize: number
  
  // Additional Information
  firstTimeVisitor: boolean
  specialNeeds: string
  howHeardAboutUs: string
  additionalNotes: string
}

export async function POST(request: NextRequest) {
  try {
    const formData: PlannedVisitFormData = await request.json()

    console.log('📋 Received planned visit form data:', formData)

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.eventType || !formData.preferredDate) {
      console.error('❌ Missing required fields:', {
        firstName: !!formData.firstName,
        lastName: !!formData.lastName,
        email: !!formData.email,
        eventType: !!formData.eventType,
        preferredDate: !!formData.preferredDate
      })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    // Step 1: Create or find contact
    let contactId: string | null = null
    
    console.log('🔍 Checking for existing contact with email:', formData.email)
    
    // First, check if contact already exists by email
    const { data: existingContact, error: searchError } = await supabase
      .from('contacts')
      .select('id')
      .eq('email', formData.email)
      .single()

    if (searchError && searchError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected
      console.error('❌ Error searching for existing contact:', searchError)
      throw searchError
    }

    if (existingContact) {
      console.log('✅ Found existing contact:', existingContact.id)
      contactId = existingContact.id
    } else {
      console.log('➕ Creating new contact...')
      // Create new contact - using minimal required fields
      const { data: newContact, error: contactError } = await supabase
        .from('contacts')
        .insert({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone || null,
          tenant_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', // Default tenant from migrations
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('id')
        .single()

      if (contactError) {
        console.error('❌ Error creating contact:', contactError)
        throw contactError
      }
      
      console.log('✅ Created new contact:', newContact.id)
      contactId = newContact.id
    }

    // Step 2: Map event type to event name
    const eventTypeMap: Record<string, string> = {
      'sunday-service': 'Sunday Worship Service',
      'youth-night': 'Youth Night',
      'bible-study': 'Bible Study',
      'community-outreach': 'Community Outreach',
      'special-event': 'Special Event'
    }

    const eventName = eventTypeMap[formData.eventType] || formData.eventType

    // Step 3: Combine date and time
    const eventDateTime = new Date(`${formData.preferredDate}T${formData.preferredTime || '10:00'}`)
    
    console.log('📅 Creating planned visit:', {
      contactId,
      eventName,
      eventDateTime: eventDateTime.toISOString(),
      groupSize: formData.groupSize
    })

    // Step 4: Create planned visit
    const { data: plannedVisit, error: visitError } = await supabase
      .from('planned_visits')
      .insert({
        contact_id: contactId,
        event_name: eventName,
        event_date: eventDateTime.toISOString(),
        event_time: formData.preferredTime || '10:00',
        interest_level: 'interested',
        how_heard_about_us: formData.howHeardAboutUs || null,
        coming_with_others: formData.groupSize > 1,
        companions_count: Math.max(0, formData.groupSize - 1),
        companions_details: formData.groupSize > 1 ? `Group of ${formData.groupSize} people` : null,
        special_needs: formData.specialNeeds || null,
        contact_preference: 'email',
        notes: formData.additionalNotes || null,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select('id')
      .single()

    if (visitError) {
      console.error('❌ Error creating planned visit:', visitError)
      throw visitError
    }

    console.log('✅ Planned visit created successfully:', {
      contactId,
      plannedVisitId: plannedVisit.id,
      eventName,
      eventDate: eventDateTime.toISOString()
    })

    return NextResponse.json({ 
      success: true, 
      message: 'Your visit has been planned successfully! We\'ll be in touch soon.',
      plannedVisitId: plannedVisit.id
    })

  } catch (error) {
    console.error('❌ Error creating planned visit:', error)
    
    // More detailed error logging
    if (error && typeof error === 'object') {
      console.error('Error details:', {
        message: (error as any).message,
        code: (error as any).code,
        details: (error as any).details,
        hint: (error as any).hint,
        stack: (error as any).stack
      })
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to submit planned visit. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error',
        code: (error as any)?.code || null
      },
      { status: 500 }
    )
  }
} 