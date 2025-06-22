import { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase'
import BlogPostClient from './blog-client'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate metadata for the blog post page
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const supabase = createServerSupabaseClient()
    const { data: blog } = await supabase
      .from('blogs')
      .select('title, excerpt, author, seo_meta')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (blog) {
      const title = blog.seo_meta?.title || `${blog.title} - DOCM Church`
      const description = blog.seo_meta?.description || blog.excerpt || `A blog post by ${blog.author}.`
      
      return {
        title,
        description,
      }
    }
  } catch (error) {
    console.error('Error generating blog metadata:', error)
  }

  return {
    title: 'Blog Post - DOCM Church',
    description: 'Read articles, insights, and updates from Demonstration of Christ Ministries.',
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  
  return <BlogPostClient slug={slug} />
} 