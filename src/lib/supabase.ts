import { createServerClient } from '@supabase/ssr'

// Server-side Supabase client for API routes
export const createServerSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!url || !key) {
    throw new Error('Supabase environment variables not configured')
  }
  
  return createServerClient(
    url,
    key,
  {
    cookies: {
        get() {
          return null
      },
        set() {
          // No-op for API routes
      },
        remove() {
          // No-op for API routes
      },
    },
  }
)
}

// Types for the website (focusing on public-facing data)
export type Contact = {
  id: string
  first_name: string | null
  last_name: string | null
  phone: string | null
  email: string | null
  profile_image: string | null
  lifecycle: string
  created_at: string
  updated_at: string
}

export type Event = {
  id: string
  name: string
  description: string | null
  location: string | null
  capacity: number | null
  event_date: string
  is_recurring: boolean
  created_at: string
  updated_at: string
}

export type EventImage = {
  id: string
  event_id: string
  url: string
  alt_text: string | null
  sort_order: number
  created_at: string
}

export type EventRegistration = {
  id: string
  event_id: string
  contact_id: string
  status: string
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      'contacts': {
        Row: Contact
        Insert: Omit<Contact, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Contact, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  },
  events: {
    Tables: {
      'events': {
        Row: Event
        Insert: Omit<Event, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>
      },
      'event_images': {
        Row: EventImage
        Insert: Omit<EventImage, 'id' | 'created_at'>
        Update: Partial<Omit<EventImage, 'id' | 'created_at'>>
      },
      'registrations': {
        Row: EventRegistration
        Insert: Omit<EventRegistration, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<EventRegistration, 'id' | 'created_at' | 'updated_at'>>
      }
    }
  }
} 