import { createClient } from '@supabase/supabase-js'

// Mock environment variables for testing
const supabaseUrl = 'https://test.supabase.co'
const supabaseAnonKey = 'test-anon-key'

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