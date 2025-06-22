import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: NextRequest) {
  try {
    // For tenant settings, we need to bypass RLS since this is public church information
    // Try to use service role key if available, otherwise use anon key with RLS disabled query
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ 
        error: 'Database configuration missing',
        success: false 
      }, { status: 500 });
    }

    let supabase;
    
    // Try service role first for bypassing RLS
    if (supabaseServiceKey) {
      supabase = createClient(supabaseUrl, supabaseServiceKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
    } else {
      // Fallback to anon key
      supabase = createClient(supabaseUrl, supabaseAnonKey);
    }
    
    // Try to get existing tenant settings
    const { data: settings, error } = await supabase
      .from('tenant_settings')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error fetching tenant settings:', error);
      
      // If it's an RLS policy violation, return default settings
      if (error.message.includes('row-level security') || error.code === '42501') {
        console.log('RLS policy violation, returning default settings');
        const defaultSettings = {
          id: 'default',
          name: 'DOCM Church',
          time_zone: 'America/New_York',
          primary_color: '#1A202C',
          secondary_color: '#F6E05E',
          description: 'Demonstration of Christ Ministries',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        return NextResponse.json({ 
          success: true, 
          data: defaultSettings,
          message: 'Using default tenant settings - database not accessible',
          source: 'default'
        });
      }
      
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    // If no settings exist, return default ones (don't try to create via API)
    if (!settings || settings.length === 0) {
      const defaultSettings = {
        id: 'default',
        name: 'DOCM Church',
        time_zone: 'America/New_York',
        primary_color: '#1A202C',
        secondary_color: '#F6E05E',
        description: 'Demonstration of Christ Ministries',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      return NextResponse.json({ 
        success: true, 
        data: defaultSettings,
        message: 'No tenant settings found, using defaults',
        source: 'default'
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: settings[0],
      message: 'Tenant settings found',
      source: 'database'
    });
    
  } catch (error) {
    console.error('Unexpected error in tenant-settings API:', error);
    
    // Return default settings on any error
    const defaultSettings = {
      id: 'default',
      name: 'DOCM Church',
      time_zone: 'America/New_York',
      primary_color: '#1A202C',
      secondary_color: '#F6E05E',
      description: 'Demonstration of Christ Ministries',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    return NextResponse.json({ 
      success: true, 
      data: defaultSettings,
      message: 'Error occurred, using default settings',
      source: 'default',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ 
    error: 'Tenant settings creation not allowed from web frontend. Use admin panel.' 
  }, { status: 403 });
} 