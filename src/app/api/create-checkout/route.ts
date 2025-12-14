import { NextRequest, NextResponse } from 'next/server'
import { getStripe, PRICE_AMOUNT, PRICE_CURRENCY } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  )
}

export async function POST(request: NextRequest) {
  const supabaseAdmin = getSupabaseAdmin()
  const stripe = getStripe()
  try {
    const formData = await request.formData()
    const email = formData.get('email') as string
    const resumeText = formData.get('resumeText') as string
    const jobDescription = formData.get('jobDescription') as string | null

    if (!email || !resumeText) {
      return NextResponse.json(
        { error: 'Email and resume are required' },
        { status: 400 }
      )
    }

    // Create order in database
    const { data: order, error: dbError } = await supabaseAdmin
      .from('orders')
      .insert({
        email,
        original_resume: resumeText,
        job_description: jobDescription || null,
        status: 'pending',
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: PRICE_CURRENCY,
            product_data: {
              name: 'ResumeATS Optimization',
              description: 'AI-powered resume optimization to beat Applicant Tracking Systems',
            },
            unit_amount: PRICE_AMOUNT,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?order=${order.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}?canceled=true`,
      metadata: {
        order_id: order.id,
      },
    })

    // Update order with session ID
    await supabaseAdmin
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

