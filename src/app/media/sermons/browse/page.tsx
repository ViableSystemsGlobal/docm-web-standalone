import { Metadata } from 'next'
import BrowseSermonsClient from './browse-client'

export const metadata: Metadata = {
  title: 'Sermons - DOCM Church',
  description: 'Browse all sermons from Demonstration of Christ Ministries. Find messages by speaker, series, or topic.',
}

export default function BrowseSermonsPage() {
  return <BrowseSermonsClient />
} 