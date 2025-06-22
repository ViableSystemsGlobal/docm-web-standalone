import { createServerSupabaseClient } from '@/lib/supabase'

// Cache for tenant timezone to avoid repeated API calls
let cachedTimezone: string | null = null
let cacheTimestamp: number = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

/**
 * Get the configured timezone from tenant settings
 */
export async function getConfiguredTimezone(): Promise<string> {
  const now = Date.now()
  
  // Return cached timezone if still valid
  if (cachedTimezone && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedTimezone
  }
  
  // Default fallback timezone
  const defaultTimezone = 'America/New_York'
  
  try {
    const supabase = createServerSupabaseClient()
    const { data: settings, error } = await supabase
      .from('tenant_settings')
      .select('time_zone')
      .limit(1)
    
    // Handle case where no records exist or query fails
    if (error) {
      // Only log as info since this is expected when no tenant settings exist
      console.info('Using default timezone - tenant settings not available:', error.message)
      cachedTimezone = defaultTimezone
      cacheTimestamp = now
      return defaultTimezone
    }
    
    // Check if we have data and extract timezone
    const timezone = (settings && settings.length > 0) 
      ? settings[0]?.time_zone || defaultTimezone
      : defaultTimezone
    
    // Update cache
    cachedTimezone = timezone
    cacheTimestamp = now
    
    console.info(`Using configured timezone: ${timezone}`)
    return timezone
  } catch (error) {
    // Only log as info since this is expected in many cases
    console.info('Using default timezone - tenant settings query failed:', error)
    cachedTimezone = defaultTimezone
    cacheTimestamp = now
    return defaultTimezone
  }
}

/**
 * Format date using the configured timezone
 */
export async function formatDateWithTimezone(
  date: string | Date, 
  options: Intl.DateTimeFormatOptions = {}
): Promise<string> {
  const timezone = await getConfiguredTimezone()
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    ...options
  }
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj)
}

/**
 * Format date using the configured timezone (synchronous version with cached timezone)
 */
export function formatDateWithCachedTimezone(
  date: string | Date,
  options: Intl.DateTimeFormatOptions = {}
): string {
  const timezone = cachedTimezone || 'America/New_York'
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    timeZone: timezone,
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    ...options
  }
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(dateObj)
}

/**
 * Format date for display (short format)
 */
export async function formatDisplayDate(date: string | Date): Promise<string> {
  return formatDateWithTimezone(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Format datetime for display (includes time)
 */
export async function formatDisplayDateTime(date: string | Date): Promise<string> {
  return formatDateWithTimezone(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

/**
 * Format full date with weekday (for events)
 */
export async function formatEventDateTime(date: string | Date): Promise<string> {
  return formatDateWithTimezone(date, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

/**
 * Format just the date part (no time)
 */
export async function formatDateOnly(date: string | Date): Promise<string> {
  return formatDateWithTimezone(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

/**
 * Format just the time part
 */
export async function formatTimeOnly(date: string | Date): Promise<string> {
  return formatDateWithTimezone(date, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  })
}

/**
 * Initialize timezone cache - call this in your app startup
 */
export async function initializeTimezoneCache(): Promise<void> {
  await getConfiguredTimezone()
}

/**
 * Synchronous versions using cached timezone (for components that can't use async)
 */
export const syncFormatters = {
  displayDate: (date: string | Date): string => formatDateWithCachedTimezone(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }),
  
  displayDateTime: (date: string | Date): string => formatDateWithCachedTimezone(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }),
  
  eventDateTime: (date: string | Date): string => formatDateWithCachedTimezone(date, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }),
  
  timeOnly: (date: string | Date): string => formatDateWithCachedTimezone(date, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }),
  
  dateOnly: (date: string | Date): string => formatDateWithCachedTimezone(date, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
} 