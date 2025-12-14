# ResumeATS - Deployment Guide

## Quick Deploy (30 minutes)

### 1. Supabase Setup (Free Tier)
1. Go to [supabase.com](https://supabase.com) and create a new project
2. In SQL Editor, run the contents of `supabase/schema.sql`
3. Go to Settings > API and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_KEY`

### 2. Stripe Setup
1. Go to [stripe.com](https://stripe.com) and create an account
2. Get your API keys from Dashboard > Developers > API Keys:
   - Secret key → `STRIPE_SECRET_KEY`
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Create a webhook endpoint (after Vercel deploy):
   - URL: `https://your-domain.vercel.app/api/webhook`
   - Events: `checkout.session.completed`
   - Copy webhook secret → `STRIPE_WEBHOOK_SECRET`

### 3. OpenAI Setup
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create an API key → `OPENAI_API_KEY`
3. Add $10-20 credits (will last ~500+ optimizations)

### 4. Vercel Deploy
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Add all environment variables from `.env.example`
4. Deploy!

### 5. Configure Stripe Webhook
1. In Stripe Dashboard, go to Developers > Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhook`
3. Select event: `checkout.session.completed`
4. Copy the signing secret to your Vercel environment variables

## Monthly Costs

| Service | Cost |
|---------|------|
| Vercel | $0 (Hobby tier) |
| Supabase | $0 (Free tier - 500MB) |
| Stripe | 2.9% + $0.30 per transaction |
| OpenAI | ~$0.03 per optimization |

**Total fixed cost: $0/month**
Variable: ~$0.18 per $4.99 sale = **$4.66 profit per sale**

## Revenue Projections

| Sales/Month | Revenue | Costs | Profit |
|-------------|---------|-------|--------|
| 10 | $49.90 | $1.80 | $48.10 |
| 50 | $249.50 | $9.00 | $240.50 |
| 100 | $499.00 | $18.00 | $481.00 |
| 500 | $2,495.00 | $90.00 | $2,405.00 |

## Marketing Ideas
- Post on LinkedIn, Reddit (r/jobs, r/resumes)
- Create TikTok/YouTube content about ATS tips
- SEO: Target "ATS resume checker", "resume optimization"
- Partner with career coaches

