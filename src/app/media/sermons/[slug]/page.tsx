import { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase'
import SermonDetailClient from './sermon-client'

interface SermonPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for the sermon page
export async function generateMetadata({ params }: SermonPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const supabase = createServerSupabaseClient()
    const { data: sermon } = await supabase
      .from('sermons')
      .select('title, description, speaker, series')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (sermon) {
      const title = `${sermon.title} - DOCM Church`
      const description = sermon.description || `A sermon by ${sermon.speaker}${sermon.series ? ` from the ${sermon.series} series` : ''}.`
      
      return {
        title,
        description,
      }
    }
  } catch (error) {
    console.error('Error generating sermon metadata:', error)
  }

  return {
    title: 'Sermon - DOCM Church',
    description: 'Listen to biblical teachings and spiritual insights from Demonstration of Christ Ministries.',
  }
}

export default async function SermonDetailPage({ params }: SermonPageProps) {
  const { slug } = await params
  
  return <SermonDetailClient slug={slug} />
} 