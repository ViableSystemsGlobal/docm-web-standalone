import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import Stripe from 'stripe'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_51M3A4oL5sFi7cbV9iie5qzus9bF21F71csX8mUsLGYSwDRzr0nl34T8aH3QjFxyW7Cp4dQWLlWYqJ2je1fwiq9Xu0036EG9X4l', {
  apiVersion: '2025-05-28.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { setupIntentId } = await request.json()
    
    console.log('🔄 Confirming recurring donation setup:', setupIntentId)

    if (!setupIntentId) {
      return NextResponse.json(
        { error: 'Setup intent ID is required' },
        { status: 400 }
      )
    }

    // Retrieve the setup intent
    const setupIntent = await stripe.setupIntents.retrieve(setupIntentId)
    
    if (setupIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Setup intent not confirmed' },
        { status: 400 }
      )
    }

    const metadata = setupIntent.metadata || {}
    const customerId = setupIntent.customer as string
    const paymentMethodId = setupIntent.payment_method as string
    const priceId = metadata.price_id
    const contactId = metadata.contact_id
    const fundDesignation = metadata.fund_designation || 'General Fund'
    const frequency = metadata.frequency || 'monthly'
    const amount = parseFloat(metadata.amount || '0')

    // Create the subscription with the confirmed payment method
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      default_payment_method: paymentMethodId,
      metadata: {
        contact_id: contactId,
        fund_designation: fundDesignation,
        type: 'recurring_donation',
        frequency,
        setup_intent_id: setupIntentId
      },
      description: `Recurring donation to ${fundDesignation}`,
    })

    console.log('✅ Created subscription:', subscription.id)

    // Update the transaction record to mark it as active/confirmed
    const supabase = createServerSupabaseClient()
    
    // First, find the transaction record by customer and amount
    const { data: transactionRecord, error: findError } = await supabase
      .from('transactions')
      .select('id')
      .eq('stripe_customer_id', customerId)
      .eq('amount', amount)
      .eq('is_recurring', true)
      .eq('payment_status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (findError) {
      console.error('❌ Error finding transaction record:', findError)
    } else if (transactionRecord) {
      // Update the transaction record with subscription details
      const { error: updateError } = await supabase
        .from('transactions')
        .update({
          payment_status: 'active',
          stripe_subscription_id: subscription.id,
          metadata: {
            frequency,
            source: 'church_website',
            type: 'recurring_donation',
            setup_intent_id: setupIntentId,
            subscription_id: subscription.id
          }
        })
        .eq('id', transactionRecord.id)

      if (updateError) {
        console.error('❌ Error updating transaction record:', updateError)
      } else {
        console.log('✅ Updated transaction record with subscription details')
      }
    }

    // Also create a recurring donation record if needed
    const recurringDonationData = {
      contact_id: contactId || null,
      stripe_subscription_id: subscription.id,
      amount,
      currency: 'USD',
      interval_type: frequency === 'weekly' ? 'week' : 'month',
      interval_count: 1,
      fund_designation: fundDesignation,
      status: 'active',
      started_at: new Date().toISOString(),
      next_payment_date: new Date(Date.now() + (frequency === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000).toISOString()
    }

    const { error: recurringError } = await supabase
      .from('recurring_donations')
      .upsert(recurringDonationData, {
        onConflict: 'stripe_subscription_id',
        ignoreDuplicates: false
      })

    if (recurringError) {
      console.error('❌ Error creating/updating recurring donation record:', recurringError)
    } else {
      console.log('✅ Created/updated recurring donation record')
    }

    return NextResponse.json({
      success: true,
      subscriptionId: subscription.id,
      message: 'Recurring donation confirmed successfully'
    })

  } catch (error) {
    console.error('❌ Error confirming recurring donation:', error)
    return NextResponse.json(
      { error: 'Failed to confirm recurring donation' },
      { status: 500 }
    )
  }
} 