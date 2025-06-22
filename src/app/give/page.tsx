import { Metadata } from 'next'
import GivingPageClient from './give-client'

export const metadata: Metadata = {
  title: 'Give - DOCM Church',
  description: 'Support the ministry of Demonstration of Christ Ministries through your generous giving and make an impact in our community.',
}

export default function GivingPage() {
  return <GivingPageClient />
} 