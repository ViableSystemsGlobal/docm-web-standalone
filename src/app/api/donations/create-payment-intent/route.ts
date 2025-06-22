import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import Stripe from 'stripe'

// Initialize Stripe - using the same keys as admin
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51M3A4oL5sFi7cbV9iie5qzus9bF21F71csX8mUsLGYSwDRzr0nl34T8aH3QjFxyW7Cp4dQWLlWYqJ2je1fwiq9Xu0036EG9X4l', {
  apiVersion: '2025-05-28.basil',
})

// Helper function to create transaction record
async function createTransactionRecord({
  contactId,
  amount,
  currency,
  fundDesignation,
  paymentMethod,
  isAnonymous,
  notes,
  stripePaymentIntentId,
  stripeCustomerId,
  isRecurring = false,
  frequency = 'one-time'
}: {
  contactId?: string
  amount: number
  currency: string
  fundDesignation: string
  paymentMethod: string
  isAnonymous: boolean
  notes?: string
  stripePaymentIntentId?: string
  stripeCustomerId?: string
  isRecurring?: boolean
  frequency?: string
}) {
  const supabase = createServerSupabaseClient()
  
  const transactionData = {
    contact_id: contactId || null,
    amount,
    currency: currency.toUpperCase(),
    category: fundDesignation,
    payment_method: paymentMethod,
    payment_status: 'pending',
    transacted_at: new Date().toISOString(),
    notes: notes || null,
    stripe_payment_intent_id: stripePaymentIntentId || null,
    stripe_customer_id: stripeCustomerId || null,
    is_anonymous: isAnonymous,
    is_recurring: isRecurring,
    fund_designation: fundDesignation,
    metadata: {
      frequency,
      source: 'church_website',
      type: isRecurring ? 'recurring_donation' : 'one_time_donation'
    }
  }

  console.log('💾 Creating transaction record:', transactionData)

  const { data, error } = await supabase
    .from('transactions')
    .insert([transactionData])
    .select()
    .single()

  if (error) {
    console.error('❌ Error creating transaction record:', error)
    throw new Error(`Failed to create transaction record: ${error.message}`)
  }

  console.log('✅ Created transaction record:', data.id)
  return data
}

// This route will proxy to admin's create-payment-intent endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      amount,
      currency = 'usd',
      fundDesignation = 'General',
      isAnonymous = false,
      notes,
      donorEmail,
      donorName,
      frequency = 'one-time'
    } = body

    console.log('💰 Processing donation request:', { amount, frequency, fundDesignation, donorEmail, isAnonymous })

    // Validate required fields
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Valid amount is required' },
        { status: 400 }
      )
    }

    if (!donorEmail && !isAnonymous) {
      return NextResponse.json(
        { error: 'Email is required for non-anonymous donations' },
        { status: 400 }
      )
    }

    // Create or get contact record if not anonymous
    let contactId: string | undefined
    let customerId: string | undefined
    
    if (!isAnonymous && donorEmail) {
      const supabase = createServerSupabaseClient()
      
      // Try to find existing contact
      const { data: existingContact } = await supabase
        .from('contacts')
        .select('id')
        .eq('email', donorEmail)
        .single()

      if (existingContact) {
        contactId = existingContact.id
        console.log('📧 Found existing contact:', contactId)
      } else if (donorName) {
        // Create new contact
        const [firstName, ...lastNameParts] = donorName.split(' ')
        const lastName = lastNameParts.join(' ')
        
        const { data: newContact, error } = await supabase
          .from('contacts')
          .insert([{
            first_name: firstName,
            last_name: lastName || '',
            email: donorEmail,
            phone: '',
            source: 'online_donation'
          }])
          .select()
          .single()

        if (!error && newContact) {
          contactId = newContact.id
          console.log('👤 Created new contact:', contactId)
        }
      }

      // Create or retrieve Stripe customer
      try {
        const existingCustomers = await stripe.customers.list({
          email: donorEmail,
          limit: 1,
        })

        if (existingCustomers.data.length > 0) {
          customerId = existingCustomers.data[0].id
          console.log('💳 Found existing Stripe customer:', customerId)
        } else {
          const customer = await stripe.customers.create({
            email: donorEmail,
            name: donorName,
            metadata: {
              contact_id: contactId || '',
              source: 'church_website',
            },
          })
          customerId = customer.id
          console.log('🆕 Created new Stripe customer:', customerId)
        }
      } catch (stripeError) {
        console.error('❌ Failed to create/retrieve Stripe customer:', stripeError)
        return NextResponse.json(
          { error: 'Failed to set up customer account' },
          { status: 500 }
        )
      }
    }

    // Handle recurring donations
    if (frequency !== 'one-time') {
      console.log('🔄 Processing recurring donation...')
      
      if (!customerId) {
        console.error('❌ Customer required for recurring donations')
        return NextResponse.json(
          { error: 'Customer required for recurring donations' },
          { status: 400 }
        )
      }

      try {
        console.log('📝 Creating price for recurring donation...', {
          amount: Math.round(amount * 100),
          currency,
          interval: frequency === 'weekly' ? 'week' : 'month'
        })

        // Create a price for the recurring donation
        const price = await stripe.prices.create({
          unit_amount: Math.round(amount * 100), // Convert to cents
          currency: currency.toLowerCase(),
          recurring: {
            interval: frequency === 'weekly' ? 'week' : 'month',
            interval_count: 1,
          },
          product_data: {
            name: `Recurring Donation - ${fundDesignation}`,
          },
          metadata: {
            fund_designation: fundDesignation,
            type: 'recurring_donation',
          },
        })

        console.log('✅ Created price:', price.id)

        console.log('🔔 Creating subscription...', {
          customer: customerId,
          priceId: price.id
        })

        // For recurring donations, we'll create a setup intent instead
        // This allows the customer to set up a payment method that can be used for future payments
        const setupIntent = await stripe.setupIntents.create({
          customer: customerId,
          metadata: {
            contact_id: contactId || '',
            fund_designation: fundDesignation,
            type: 'recurring_donation_setup',
            frequency,
            amount: amount.toString(),
            price_id: price.id,
          },
          usage: 'off_session',
        })

        console.log('✅ Created setup intent for recurring donation:', setupIntent.id)

        // Create transaction record for recurring donation setup
        await createTransactionRecord({
          contactId,
          amount,
          currency,
          fundDesignation,
          paymentMethod: 'Stripe (Recurring)',
          isAnonymous,
          notes,
          stripeCustomerId: customerId,
          isRecurring: true,
          frequency
        })

        return NextResponse.json({
          setupIntentId: setupIntent.id,
          clientSecret: setupIntent.client_secret,
          priceId: price.id,
          type: 'recurring',
        })
      } catch (error) {
        console.error('❌ Error creating recurring donation:', error)
        console.error('Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          type: typeof error,
          customerId,
          amount,
          frequency
        })
        return NextResponse.json(
          { error: 'Failed to create recurring donation', details: error instanceof Error ? error.message : 'Unknown error' },
          { status: 500 }
        )
      }
    }

    // Handle one-time donations
    console.log('💳 Processing one-time donation...')
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: currency.toLowerCase(),
        customer: customerId,
        metadata: {
          contact_id: contactId || '',
          fund_designation: fundDesignation,
          is_anonymous: isAnonymous.toString(),
          notes: notes || '',
          category: fundDesignation,
          type: 'donation',
          frequency: 'one-time',
        },
        description: `Donation to ${fundDesignation}`,
        statement_descriptor: 'CHURCH DONATION',
        receipt_email: isAnonymous ? undefined : donorEmail,
      })

      console.log('✅ Created one-time payment intent:', paymentIntent.id)

      // Create transaction record for one-time donation
      await createTransactionRecord({
        contactId,
        amount,
        currency,
        fundDesignation,
        paymentMethod: 'Stripe',
        isAnonymous,
        notes,
        stripePaymentIntentId: paymentIntent.id,
        stripeCustomerId: customerId,
        isRecurring: false,
        frequency
      })

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      })
    } catch (error) {
      console.error('❌ Error creating payment intent:', error)
      return NextResponse.json(
        { error: 'Failed to create payment intent' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('❌ Error creating payment intent:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 