import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Order = {
  id: string
  email: string
  original_resume: string
  optimized_resume: string | null
  job_description: string | null
  status: 'pending' | 'paid' | 'processing' | 'completed' | 'failed'
  stripe_session_id: string | null
  created_at: string
  completed_at: string | null
}

