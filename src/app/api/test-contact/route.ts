import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email } = await request.json()
    const supabase = createServerSupabaseClient()

    console.log('Testing contact creation with:', { firstName, lastName, email })

    const { data, error } = await supabase
      .from('contacts')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        tenant_id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select('id')
      .single()

    if (error) {
      console.error('Contact creation error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      })
    }

    console.log('Contact created successfully:', data)
    return NextResponse.json({ success: true, contact: data })

  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
} 