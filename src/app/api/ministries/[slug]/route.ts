import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// Utility function to generate slug from name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }

    const supabase = createServerSupabaseClient()

    // First, try to find in get_involved_templates
    console.log('🔍 Looking for ministry with slug:', slug)
    
    const { data: getInvolvedTemplates, error: getInvolvedError } = await supabase
      .from('get_involved_templates')
      .select(`
        id,
        title,
        description,
        excerpt,
        featured_image,
        icon_emoji,
        gradient_colors,
        category,
        requirements,
        benefits,
        time_commitment,
        contact_person,
        contact_email,
        contact_phone,
        custom_cta_text,
        custom_cta_url,
        priority_order,
        ministry_group_id,
        ministry_group:groups!ministry_group_id(
          id,
          name,
          type,
          image_url
        )
      `)
      .eq('status', 'published')

    if (!getInvolvedError && getInvolvedTemplates) {
      // Find template by slug match
      const matchingTemplate = getInvolvedTemplates.find(template => 
        generateSlug(template.title) === slug
      )

      if (matchingTemplate) {
        console.log('✅ Found get_involved_template:', matchingTemplate.title)
        return NextResponse.json({ 
          ministry: {
            ...matchingTemplate,
            featured_image: matchingTemplate.featured_image || 
              (matchingTemplate.ministry_group as any)?.image_url || null
          },
          source: 'get_involved_templates'
        })
      }
    }

    // If not found in get_involved_templates, try groups table
    console.log('🔄 Not found in get_involved_templates, trying groups table...')
    
    const { data: groups, error: groupsError } = await supabase
      .from('groups')
      .select(`
        id,
        name,
        description,
        type,
        status,
        image_url,
        created_at
      `)
      .eq('status', 'active')

    if (!groupsError && groups) {
      // Find group by slug match
      const matchingGroup = groups.find(group => 
        generateSlug(group.name) === slug
      )

      if (matchingGroup) {
        console.log('✅ Found group:', matchingGroup.name)
        
        // Transform group to match ministry template structure
        const ministry = {
          id: matchingGroup.id,
          title: matchingGroup.name,
          description: matchingGroup.description || `Connect with our ${matchingGroup.name} and make a difference in our community.`,
          excerpt: matchingGroup.description || `Join our ${matchingGroup.name} and make a difference in our community.`,
          featured_image: (matchingGroup as any).image_url || null,
          icon_emoji: getGroupIcon(matchingGroup.name, matchingGroup.type),
          gradient_colors: getGroupGradient(matchingGroup.name),
          category: matchingGroup.type === 'ministry' ? 'ministry' : 'community',
          time_commitment: '2-3 hours per week',
          contact_person: 'Ministry Leader',
          contact_email: null,
          contact_phone: null,
          requirements: getDefaultRequirements(matchingGroup.type),
          benefits: getDefaultBenefits(matchingGroup.type),
          custom_cta_text: 'Learn More',
          ministry_group: {
            id: matchingGroup.id,
            name: matchingGroup.name,
            type: matchingGroup.type
          }
        }

        return NextResponse.json({ 
          ministry,
          source: 'groups'
        })
      }
    }

    // Not found
    console.log('❌ Ministry not found with slug:', slug)
    return NextResponse.json({ error: 'Ministry not found' }, { status: 404 })

  } catch (error) {
    console.error('❌ Error fetching ministry:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper functions
function getGroupIcon(name: string, type: string): string {
  const nameLower = name.toLowerCase()
  if (nameLower.includes('prayer')) return '🙏'
  if (nameLower.includes('worship')) return '🎵'
  if (nameLower.includes('youth')) return '🏀'
  if (nameLower.includes('children')) return '👶'
  if (nameLower.includes('outreach') || nameLower.includes('community')) return '🤝'
  if (nameLower.includes('marriage') || nameLower.includes('counselling')) return '💒'
  if (type === 'ministry') return '✨'
  return '🤝'
}

function getGroupGradient(name: string): { from: string; to: string } {
  const nameLower = name.toLowerCase()
  if (nameLower.includes('prayer')) return { from: 'purple-800', to: 'indigo-900' }
  if (nameLower.includes('worship')) return { from: 'green-800', to: 'teal-900' }
  if (nameLower.includes('youth')) return { from: 'orange-800', to: 'red-900' }
  if (nameLower.includes('children')) return { from: 'blue-800', to: 'indigo-900' }
  if (nameLower.includes('outreach')) return { from: 'emerald-800', to: 'green-900' }
  return { from: 'blue-800', to: 'indigo-900' }
}

function getDefaultRequirements(type: string): string[] {
  switch (type) {
    case 'ministry':
      return [
        'Heart for serving others',
        'Commitment to regular attendance',
        'Willingness to learn and grow',
        'Team player attitude'
      ]
    case 'small_group':
      return [
        'Desire for community and fellowship',
        'Openness to share and learn',
        'Regular attendance commitment'
      ]
    case 'discipleship':
      return [
        'Commitment to spiritual growth',
        'Willingness to be mentored',
        'Regular study and meeting attendance'
      ]
    default:
      return [
        'Heart for serving',
        'Regular commitment',
        'Team spirit'
      ]
  }
}

function getDefaultBenefits(type: string): string[] {
  switch (type) {
    case 'ministry':
      return [
        'Make a meaningful impact',
        'Develop new skills and talents',
        'Build lasting friendships',
        'Grow in your faith journey'
      ]
    case 'small_group':
      return [
        'Deep community connections',
        'Spiritual growth and support',
        'Lifelong friendships',
        'Safe space to share and learn'
      ]
    case 'discipleship':
      return [
        'Accelerated spiritual growth',
        'Personal mentorship',
        'Biblical knowledge and wisdom',
        'Leadership development'
      ]
    default:
      return [
        'Personal growth',
        'Community connection',
        'Spiritual development'
      ]
  }
} 