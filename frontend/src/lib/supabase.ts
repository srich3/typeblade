import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          username: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          username: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      typing_sessions: {
        Row: {
          id: string
          user_id: string
          wpm: number
          accuracy: number
          duration: number
          text_length: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          wpm: number
          accuracy: number
          duration: number
          text_length: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          wpm?: number
          accuracy?: number
          duration?: number
          text_length?: number
          created_at?: string
        }
      }
    }
  }
} 