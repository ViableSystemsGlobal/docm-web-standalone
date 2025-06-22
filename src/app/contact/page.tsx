import { ContactHero } from '@/components/sections/contact-hero'
import { ContactForm } from '@/components/sections/contact-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us - DOCM Church',
  description: 'Get in touch with Demonstration of Christ Ministries. We\'d love to hear from you and answer any questions.',
}

export default function ContactPage() {
  return (
    <>
      {/* Contact Hero Section */}
      <ContactHero />
      
      {/* Contact Form */}
      <ContactForm />
    </>
  )
} 