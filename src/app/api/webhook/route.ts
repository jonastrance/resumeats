import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import { optimizeResume } from '@/lib/openai'
import Stripe from 'stripe'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed')
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const orderId = session.metadata?.order_id

    if (!orderId) {
      return NextResponse.json({ error: 'No order ID' }, { status: 400 })
    }

    // Update order status to paid
    await supabaseAdmin
      .from('orders')
      .update({ status: 'processing' })
      .eq('id', orderId)

    // Get the order
    const { data: order } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single()

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    try {
      // Process the resume with AI
      const optimizedResume = await optimizeResume(
        order.original_resume,
        order.job_description
      )

      // Update order with optimized resume
      await supabaseAdmin
        .from('orders')
        .update({
          optimized_resume: optimizedResume,
          status: 'completed',
          completed_at: new Date().toISOString(),
        })
        .eq('id', orderId)
    } catch (error) {
      console.error('Optimization error:', error)
      await supabaseAdmin
        .from('orders')
        .update({ status: 'failed' })
        .eq('id', orderId)
    }
  }

  return NextResponse.json({ received: true })
}

