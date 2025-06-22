import { GalleryHero } from '@/components/sections/gallery-hero'
import { PhotoGalleries } from '@/components/sections/photo-galleries'
import { VideoGalleries } from '@/components/sections/video-galleries'

export default function GalleryPage() {
  return (
    <>
      {/* Gallery Hero Section */}
      <GalleryHero />
      
      {/* Photo Galleries */}
      <PhotoGalleries />
      
      {/* Video Galleries */}
      <VideoGalleries />
    </>
  )
} 