import { loadStripe, Stripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

// Using the same publishable key as admin
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51M3A4oL5sFi7cbV9s5n3hemWG43sjUMzZTdfB8D6qwGCooBKUi4BXv3D6tOpfuNv0GNA1s1bZtaezrymznltEQBx000dN4XLHR'

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || STRIPE_PUBLISHABLE_KEY)
  }
  return stripePromise
} 