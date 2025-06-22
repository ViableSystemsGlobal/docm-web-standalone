import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Define the interface for contact page structure
interface ContactPageData {
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

// Default fallback data
const defaultContactPageData: ContactPageData = {
  hero: {
    first_line_text: "Contact",
    heading: "Let's connect and start a meaningful conversation.",
    subheading: "Whether you have questions about faith, want to learn more about our church, or need prayer, we're here to listen and support you on your journey.",
    backgroundImage: "",
    ctaButtons: [
      {
        text: "Send a Message",
        link: "#contact-form",
        style: "primary"
      },
      {
        text: "Visit Us",
        link: "#office-hours",
        style: "secondary"
      }
    ]
  },
  contact_form: {
    sectionTitle: "Send us a Message",
    sectionHeading: "Get In Touch",
    sectionDescription: "We'd love to hear from you. Send us a message and we'll respond as soon as possible",
    urgentContactPhone: "+15551237729",
    urgentContactDescription: "For pastoral emergencies or urgent prayer needs",
    responseTimeText: "We typically respond within 24 hours",
    categories: [
      "General Inquiry",
      "Prayer Request", 
      "Pastoral Care",
      "Youth Ministry",
      "Worship Team",
      "Community Outreach",
      "Events & Facilities",
      "Missions",
      "New Member Information",
      "Other"
    ]
  },
  contact_info: {
    phone: "(555) 123-4567",
    email: "hello@churchname.org",
    address: "123 Church Street, City, State 12345",
    office_hours: {
      weekdays: "Monday - Friday: 9:00 AM - 5:00 PM",
      weekends: "Saturday - Sunday: By appointment"
    },
    social_media: [
      { platform: "Facebook", url: "https://facebook.com/churchname" },
      { platform: "Instagram", url: "https://instagram.com/churchname" },
      { platform: "Twitter", url: "https://twitter.com/churchname" }
    ]
  },
  contact_cta: {
    sectionTitle: "Connect With Our Community",
    sectionHeading: "Ready to take the next step?",
    sectionDescription: "Whether you're new to faith, seeking community, or looking to grow deeper in your relationship with God, we're here to walk alongside you on this journey.",
    ctaButtons: [
      {
        text: "Plan Your Visit",
        link: "/events",
        style: "primary"
      },
      {
        text: "Start a Conversation",
        link: "#contact-form",
        style: "secondary"
      }
    ],
    features: [
      { text: "All are welcome", icon: "check" },
      { text: "No pressure", icon: "check" },
      { text: "Come as you are", icon: "check" }
    ]
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Attempting to fetch contact page from database...')
    
    const supabase = createServerSupabaseClient()

    // Fetch contact page content
    const { data: pageData, error: pageError } = await supabase
      .from('pages')
      .select('id, slug, title, seo_meta, published_at, created_at, updated_at')
      .eq('slug', 'contact')
      .not('published_at', 'is', null)
      .single()

    if (pageError || !pageData) {
      console.log('⚠️ Contact page not found in database, using defaults')
      console.log('Page error:', pageError)
      return NextResponse.json({
        ...defaultContactPageData,
        source: 'default'
      })
    }

    // Fetch contact page sections
    const { data: sectionsData, error: sectionsError } = await supabase
      .from('page_sections')
      .select('id, type, order, props')
      .eq('page_id', pageData.id)
      .order('order', { ascending: true })

    if (sectionsError) {
      console.error('❌ Error fetching contact page sections:', sectionsError)
      return NextResponse.json({
        ...defaultContactPageData,
        source: 'default'
      })
    }

    console.log(`📊 Contact page database query result:`, {
      page: pageData,
      sections: sectionsData,
      error: null,
      sectionsLength: sectionsData?.length || 0
    })

    // Transform the database sections into our contact page structure
    const contactPageData: ContactPageData = { ...defaultContactPageData }

    sectionsData?.forEach(section => {
      console.log(`🔍 Raw section props:`)
      console.log(`  Section ${section.order} (${section.type}):`, section.props)

      switch (section.type) {
        case 'hero':
          contactPageData.hero = {
            first_line_text: section.props.first_line_text || defaultContactPageData.hero.first_line_text,
            heading: section.props.heading || defaultContactPageData.hero.heading,
            subheading: section.props.subheading || defaultContactPageData.hero.subheading,
            backgroundImage: section.props.backgroundImage || section.props.backgroundMedia?.url || "",
            backgroundMedia: section.props.backgroundMedia,
            ctaButtons: section.props.ctaButtons || defaultContactPageData.hero.ctaButtons
          }
          break
        case 'contact_form':
          contactPageData.contact_form = {
            sectionTitle: section.props.sectionTitle || defaultContactPageData.contact_form.sectionTitle,
            sectionHeading: section.props.sectionHeading || defaultContactPageData.contact_form.sectionHeading,
            sectionDescription: section.props.sectionDescription || defaultContactPageData.contact_form.sectionDescription,
            urgentContactPhone: section.props.urgentContactPhone || defaultContactPageData.contact_form.urgentContactPhone,
            urgentContactDescription: section.props.urgentContactDescription || defaultContactPageData.contact_form.urgentContactDescription,
            responseTimeText: section.props.responseTimeText || defaultContactPageData.contact_form.responseTimeText,
            categories: section.props.categories || defaultContactPageData.contact_form.categories
          }
          break
        case 'contact_info':
          contactPageData.contact_info = {
            phone: section.props.phone || defaultContactPageData.contact_info.phone,
            email: section.props.email || defaultContactPageData.contact_info.email,
            address: section.props.address || defaultContactPageData.contact_info.address,
            office_hours: section.props.office_hours || defaultContactPageData.contact_info.office_hours,
            social_media: section.props.social_media || defaultContactPageData.contact_info.social_media
          }
          break
        case 'contact_cta':
          contactPageData.contact_cta = {
            sectionTitle: section.props.sectionTitle || defaultContactPageData.contact_cta.sectionTitle,
            sectionHeading: section.props.sectionHeading || defaultContactPageData.contact_cta.sectionHeading,
            sectionDescription: section.props.sectionDescription || defaultContactPageData.contact_cta.sectionDescription,
            ctaButtons: section.props.ctaButtons || defaultContactPageData.contact_cta.ctaButtons,
            features: section.props.features || defaultContactPageData.contact_cta.features
          }
          break
      }
    })

    console.log('✅ CONTACT SOURCE: DATABASE')
    return NextResponse.json({
      ...contactPageData,
      source: 'database'
    })

  } catch (error) {
    console.error('❌ Error in contact page API:', error)
    return NextResponse.json({
      ...defaultContactPageData,
      source: 'default'
    })
  }
} 