# ResumeATS

> AI-powered resume optimization for Applicant Tracking Systems. Beat the bots and get 3x more interviews.

## 🚀 What is ResumeATS?

ResumeATS is a SaaS micro-product that uses GPT-4o-mini to rewrite resumes for maximum ATS (Applicant Tracking System) compatibility. 75% of resumes are rejected by automated systems before a human ever sees them — ResumeATS fixes that.

**Live Demo:** [Coming Soon]

## 💰 Business Model

- **Price:** $4.99 per resume optimization
- **Cost per sale:** ~$0.48 (Stripe fees + OpenAI API)
- **Profit per sale:** ~$4.51
- **Fixed costs:** $0/month (free tiers for Vercel + Supabase)

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React, Tailwind CSS |
| Backend | Next.js API Routes (serverless) |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe Checkout |
| AI Engine | OpenAI GPT-4o-mini |
| Hosting | Vercel |

## 📦 Features

- ✅ Upload resume (text/paste)
- ✅ Optional job description targeting
- ✅ Stripe payment integration ($4.99)
- ✅ AI-powered ATS optimization
- ✅ Real-time processing status
- ✅ Copy/download optimized resume
- ✅ ATS score estimation

## 🚀 Quick Start

### Prerequisites

You need accounts on these services:
- [Supabase](https://supabase.com) (database)
- [Stripe](https://stripe.com) (payments)
- [OpenAI](https://platform.openai.com) (AI)
- [Vercel](https://vercel.com) (hosting)

### 1. Clone & Install

```bash
git clone https://github.com/jonastrance/resumeats.git
cd resumeats
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

See [DEPLOY.md](./DEPLOY.md) for detailed setup instructions.

### 3. Set Up Database

Run the SQL in `supabase/schema.sql` in your Supabase SQL Editor.

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📖 Full Deployment Guide

See **[DEPLOY.md](./DEPLOY.md)** for complete step-by-step instructions including:
- Account creation for all services
- Database setup
- Stripe webhook configuration
- Vercel deployment
- Going live with real payments

## 💵 Cost Breakdown

| Service | Cost |
|---------|------|
| Vercel | $0/month (Hobby tier) |
| Supabase | $0/month (Free tier) |
| Stripe | 2.9% + $0.30 per transaction (~$0.45) |
| OpenAI | ~$0.03 per optimization |

**Total:** $0 fixed + ~$0.48 variable per sale

## 📁 Project Structure

```
resumeats/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── create-checkout/    # Stripe checkout session
│   │   │   ├── webhook/            # Stripe webhook handler
│   │   │   └── order/[id]/         # Order status endpoint
│   │   ├── success/                # Success page after payment
│   │   ├── page.tsx                # Homepage
│   │   └── layout.tsx              # Root layout
│   └── lib/
│       ├── openai.ts               # AI optimization logic
│       ├── stripe.ts               # Stripe configuration
│       └── supabase.ts             # Database client
├── supabase/
│   └── schema.sql                  # Database schema
├── DEPLOY.md                       # Deployment guide
└── .env.example                    # Environment variables template
```

## 🔐 Environment Variables

See `.env.example` for all required variables:
- Supabase (3 keys)
- Stripe (3 keys)
- OpenAI (1 key)
- App URL (1 value)

## 📝 License

MIT

## 👤 Author

**Ryan Mauldin (Dev Jonas)**
- GitHub: [@jonastrance](https://github.com/jonastrance)

---

**Ready to deploy?** Check out [DEPLOY.md](./DEPLOY.md) for the complete guide!

