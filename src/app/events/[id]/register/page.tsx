import { Suspense } from 'react'
import { EventRegistrationForm } from '@/components/events/event-registration-form'
import { EventRegistrationLoading } from '@/components/events/event-registration-loading'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EventRegistrationPage({ params }: PageProps) {
  const { id } = await params
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<EventRegistrationLoading />}>
          <EventRegistrationForm eventId={id} />
        </Suspense>
      </div>
    </div>
  )
} 