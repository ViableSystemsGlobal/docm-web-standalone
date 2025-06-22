import { Metadata } from 'next'
import MinistriesPageClient from './ministries-client'

export const metadata: Metadata = {
  title: 'Ministries - DOCM Church',
  description: 'Discover meaningful ways to connect, serve, and grow in your faith journey at Demonstration of Christ Ministries.',
}

export default function MinistriesPage() {
  return <MinistriesPageClient />
} 