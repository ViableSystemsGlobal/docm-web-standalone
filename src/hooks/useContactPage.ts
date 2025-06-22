'use client'

import { useState, useEffect } from 'react'

export interface ContactPageData {
  hero: {
    first_line_text: string
    heading: string
    subheading: string
    backgroundImage: string
    backgroundMedia?: {
      url: string
      type: 'image' | 'video'
      alt_text?: string
    }
    ctaButtons: Array<{
      text: string
      link: string
      style: 'primary' | 'secondary'
    }>
  }
  contact_form: {
    sectionTitle: string
    sectionHeading: string
    sectionDescription: string
    urgentContactPhone: string
    urgentContactDescription: string
    responseTimeText: string
    categories: string[]
  }
  contact_info: {
    phone: string
    email: string
    address: string
    office_hours: {
      weekdays: string
      weekends: string
    }
    social_media: Array<{
      platform: string
      url: string
    }>
  }
  contact_cta: {
    sectionTitle: string
    sectionHeading: string
    sectionDescription: string
    ctaButtons: Array<{
      text: string
      link: string
      style: 'primary' | 'secondary'
    }>
    features: Array<{
      text: string
      icon: string
    }>
  }
}

interface UseContactPageResult {
  contactPage: ContactPageData
  loading: boolean
  error: string | null
  source: string
  message: string
}

export function useContactPage(): UseContactPageResult {
  const [contactPage, setContactPage] = useState<ContactPageData>({
    hero: {
      first_line_text: "Contact",
      heading: "Let's connect and start a meaningful conversation.",
      subheading: "Whether you have questions about faith, want to learn more about our church, or need prayer, we're here to listen and support you on your journey.",
      backgroundImage: "",
      ctaButtons: []
    },
    contact_form: {
      sectionTitle: "Send us a Message",
      sectionHeading: "Get In Touch", 
      sectionDescription: "We'd love to hear from you. Send us a message and we'll respond as soon as possible",
      urgentContactPhone: "+15551237729",
      urgentContactDescription: "For pastoral emergencies or urgent prayer needs",
      responseTimeText: "We typically respond within 24 hours",
      categories: []
    },
    contact_info: {
      phone: "(555) 123-4567",
      email: "hello@churchname.org",
      address: "123 Church Street, City, State 12345",
      office_hours: {
        weekdays: "Monday - Friday: 9:00 AM - 5:00 PM",
        weekends: "Saturday - Sunday: By appointment"
      },
      social_media: []
    },
    contact_cta: {
      sectionTitle: "Connect With Our Community",
      sectionHeading: "Ready to take the next step?",
      sectionDescription: "Whether you're new to faith, seeking community, or looking to grow deeper in your relationship with God, we're here to walk alongside you on this journey.",
      ctaButtons: [],
      features: []
    }
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [source, setSource] = useState<string>('default')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    async function fetchContactPage() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/api/contact-page')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch contact page: ${response.statusText}`)
        }
        
        const data = await response.json()
        
        setContactPage(data)
        setSource(data.source || 'default')
        
        if (data.source === 'database') {
          setMessage('Contact page loaded successfully from database')
        } else {
          setMessage('Contact page loaded from fallback content')
        }
        
      } catch (err) {
        console.error('Error fetching contact page:', err)
        setError(err instanceof Error ? err.message : 'Failed to load contact page')
        setMessage('Error loading contact page, using fallback content')
      } finally {
        setLoading(false)
      }
    }

    fetchContactPage()
  }, [])

  return {
    contactPage,
    loading,
    error,
    source,
    message
  }
} 