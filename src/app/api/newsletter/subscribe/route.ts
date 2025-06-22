import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Simple email validation function
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const { email, firstName, lastName } = body

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!firstName || typeof firstName !== 'string') {
      return NextResponse.json(
        { error: 'First name is required' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = createServerSupabaseClient()

    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('id, status, first_name, last_name')
      .eq('email', email.toLowerCase())
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is fine for new subscribers
      console.error('Error checking existing subscriber:', checkError)
      return NextResponse.json(
        { error: 'Failed to process subscription' },
        { status: 500 }
      )
    }

    if (existingSubscriber) {
      if (existingSubscriber.status === 'active') {
        return NextResponse.json(
          { error: 'This email is already subscribed to our newsletter' },
          { status: 400 }
        )
      } else if (existingSubscriber.status === 'unsubscribed') {
        // Reactivate subscription and update name if provided
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({
            status: 'active',
            first_name: firstName,
            last_name: lastName || null,
            subscribed_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', existingSubscriber.id)

        if (updateError) {
          console.error('Error reactivating subscription:', updateError)
          return NextResponse.json(
            { error: 'Failed to process subscription' },
            { status: 500 }
          )
        }

        return NextResponse.json({
          success: true,
          message: `Welcome back, ${firstName}! Your subscription has been reactivated.`
        })
      }
    }

    // Create new subscription
    const { error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({
        email: email.toLowerCase(),
        first_name: firstName,
        last_name: lastName || null,
        status: 'active',
        subscription_source: 'website',
        subscribed_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (insertError) {
      console.error('Error creating subscription:', insertError)
      return NextResponse.json(
        { error: 'Failed to process subscription' },
        { status: 500 }
      )
    }

    // Log the successful subscription
    console.log(`✅ Newsletter subscription: ${firstName} ${lastName || ''} (${email})`)

    return NextResponse.json({
      success: true,
      message: `Thank you for subscribing, ${firstName}! Welcome to our community of believers.`
    })

  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to process subscription. Please try again.' },
      { status: 500 }
    )
  }
} 