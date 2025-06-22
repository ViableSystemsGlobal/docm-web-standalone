'use client'

import { useEffect } from 'react'
import { initializeTimezoneCache } from '@/lib/timezone-utils'

export function TimezoneInitializer() {
  useEffect(() => {
    initializeTimezoneCache().catch(console.error)
  }, [])

  return null // This component doesn't render anything
} 