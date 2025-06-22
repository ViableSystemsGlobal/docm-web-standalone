'use client'

import { useState } from 'react'

export interface DonationFormData {
  amount: number
  frequency: 'one-time' | 'weekly' | 'monthly'
  fundDesignation: string
  donorName: string
  donorEmail: string
  isAnonymous: boolean
  notes?: string
}

export interface PaymentResult {
  success: boolean
  error?: string
  paymentIntentId?: string
  clientSecret?: string
  setupIntentId?: string
  priceId?: string
  type?: 'one-time' | 'recurring'
}

export function useDonation() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createPaymentIntent = async (formData: DonationFormData): Promise<PaymentResult> => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/donations/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment intent')
      }

      return {
        success: true,
        clientSecret: data.clientSecret,
        paymentIntentId: data.paymentIntentId,
        setupIntentId: data.setupIntentId,
        priceId: data.priceId,
        type: data.type || 'one-time'
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred'
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage,
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    createPaymentIntent,
    loading,
    error,
    setError
  }
} 