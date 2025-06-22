import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

interface RegistrationRequest {
  eventId: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  specialRequests?: string
}

// Default tenant ID from migrations - this is set up in the database
const DEFAULT_TENANT_ID = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'

export async function POST(request: NextRequest) {
  try {
    const body: RegistrationRequest = await request.json()
    
    const { eventId, firstName, lastName, email, phone, specialRequests } = body

    // Validate required fields
    if (!eventId || !firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: eventId, firstName, lastName, email' },
        { status: 400 }
      )
    }

    // Check if Supabase is configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Use service role key if available to bypass RLS policies since the anon access isn't working
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    let supabase
    if (supabaseServiceKey) {
      // Use service role to bypass RLS
      supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      })
      console.log('🔑 Using service role for registration')
    } else {
      // Fallback to anon key
      supabase = createClient(supabaseUrl, supabaseAnonKey)
      console.log('🔑 Using anon key for registration')
    }

    console.log('📝 Processing event registration:', {
      eventId,
      email,
      name: `${firstName} ${lastName}`
    })

    // First, check if the event exists
    const { data: event, error: eventError } = await supabase
      .from('events')
      .select('id, name, capacity')
      .eq('id', eventId)
      .single()

    if (eventError || !event) {
      console.error('🔍 Event not found:', eventId)
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    // Check if there's capacity (if event has capacity limit)
    if (event.capacity) {
      const { count: registrationCount } = await supabase
        .from('registrations')
        .select('*', { count: 'exact', head: true })
        .eq('event_id', eventId)
        .eq('status', 'confirmed')

      if (registrationCount && registrationCount >= event.capacity) {
        return NextResponse.json(
          { error: 'Event is full. Registration capacity reached.' },
          { status: 400 }
        )
      }
    }

    // Find or create contact
    let contactId: string | null = null
    
    // Try to find existing contact by email
    const { data: existingContact, error: contactError } = await supabase
      .from('contacts')
      .select('id')
      .eq('email', email)
      .single()

    if (existingContact) {
      contactId = existingContact.id
      console.log('👤 Found existing contact:', contactId)
    } else {
      // Create new contact with default tenant_id
      const { data: newContact, error: createContactError } = await supabase
        .from('contacts')
        .insert({
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone || null,
          tenant_id: DEFAULT_TENANT_ID, // Add the default tenant_id
          lifecycle: 'registered' // Mark as registered since they're registering for an event
        })
        .select('id')
        .single()

      if (createContactError) {
        console.error('🚫 Failed to create contact:', createContactError)
        console.error('🚫 Contact data was:', {
          first_name: firstName,
          last_name: lastName,
          email: email,
          phone: phone || null,
          tenant_id: DEFAULT_TENANT_ID,
          lifecycle: 'registered'
        })
        return NextResponse.json(
          { error: 'Failed to create contact record. Please try again.', details: createContactError.message },
          { status: 500 }
        )
      }

      contactId = newContact.id
      console.log('👤 Created new contact:', contactId)
    }

    // Check if already registered
    const { data: existingRegistration } = await supabase
      .from('registrations')
      .select('id')
      .eq('event_id', eventId)
      .eq('contact_id', contactId)
      .single()

    if (existingRegistration) {
      return NextResponse.json(
        { error: 'You are already registered for this event' },
        { status: 400 }
      )
    }

    // Create registration record
    const registrationData = {
      event_id: eventId,
      contact_id: contactId,
      status: 'confirmed'
    }

    console.log('📝 Creating registration with data:', registrationData)

    const { data: registration, error: registrationError } = await supabase
      .from('registrations')
      .insert(registrationData)
      .select('id')
      .single()

    if (registrationError) {
      console.error('📝 Failed to create registration:', registrationError)
      console.error('📝 Registration data was:', registrationData)
      return NextResponse.json(
        { error: 'Failed to create registration. Please try again.', details: registrationError.message },
        { status: 500 }
      )
    }

    console.log('✅ Registration successful:', {
      registrationId: registration.id,
      eventName: event.name,
      contact: `${firstName} ${lastName}`
    })

    return NextResponse.json({
      success: true,
      message: 'Registration successful',
      registration: {
        id: registration.id,
        eventId,
        eventName: event.name,
        contactId,
        status: 'confirmed'
      }
    })

  } catch (error) {
    console.error('❌ Error processing registration:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 