import { BlogHero } from '@/components/sections/blog-hero'
import { AllPosts } from '@/components/sections/all-posts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - DOCM Church',
  description: 'Read the latest articles, insights, and updates from Demonstration of Christ Ministries.',
}

export default function BlogPage() {
  return (
    <>
      {/* Blog Hero Section */}
      <BlogHero />
      
      {/* All Posts */}
      <AllPosts />
    </>
  )
} 