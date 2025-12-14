import Stripe from 'stripe'

let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2024-06-20',
    })
  }
  return stripeInstance
}

// Keep for backwards compatibility
export const stripe = {
  get instance() {
    return getStripe()
  }
}

export const PRICE_AMOUNT = 499 // $4.99 in cents
export const PRICE_CURRENCY = 'usd'

