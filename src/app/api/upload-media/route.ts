import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid'

// Create admin client with service role key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// GET method to fetch existing media items
export async function GET() {
  try {
    console.log('=== Media Fetch from upload-media route ===')
    
    // Fetch media items using admin client (bypasses RLS)
    const { data: mediaData, error: mediaError } = await supabaseAdmin
      .from('media_library')
      .select('*')
      .order('uploaded_at', { ascending: false })
    
    if (mediaError) {
      console.error('Media fetch error:', mediaError)
      return NextResponse.json({ 
        success: false, 
        data: null,
        error: mediaError
      })
    }
    
    console.log('✅ Media fetch successful:', mediaData?.length || 0, 'items')
    
    return NextResponse.json({ 
      success: true, 
      data: mediaData,
      error: null
    })
    
  } catch (error) {
    console.error('Media fetch error:', error)
    return NextResponse.json({ 
      success: false, 
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { 
      status: 500 
    })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Server-side media upload started ===')
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    const altText = formData.get('altText') as string || ''
    
    // Get collection fields
    const collectionName = formData.get('collectionName') as string || null
    const collectionCategory = formData.get('collectionCategory') as string || null
    const collectionDate = formData.get('collectionDate') as string || null
    const description = formData.get('description') as string || null
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }
    
    console.log('File details:', {
      name: file.name,
      type: file.type,
      size: `${(file.size / 1024 / 1024).toFixed(2)}MB`
    })
    
    // Generate unique filename
    const fileExt = file.name.split('.').pop()
    const fileName = `${uuidv4()}.${fileExt}`
    
    console.log('Generated filename:', fileName)
    
    // Ensure the bucket exists using admin privileges
    try {
      const { data: buckets } = await supabaseAdmin.storage.listBuckets()
      const uploadmediaBucket = buckets?.find(b => b.name === 'uploadmedia')
      
      if (!uploadmediaBucket) {
        console.log('Creating uploadmedia bucket with admin privileges')
        const { error: bucketError } = await supabaseAdmin.storage.createBucket('uploadmedia', {
          public: true
        })
        
        if (bucketError) {
          console.error('Error creating bucket:', bucketError)
          return NextResponse.json({ error: 'Failed to create storage bucket' }, { status: 500 })
        }
        console.log('Bucket created successfully')
      } else {
        console.log('Bucket already exists')
      }
    } catch (err) {
      console.error('Error ensuring bucket exists:', err)
      return NextResponse.json({ error: 'Failed to access storage' }, { status: 500 })
    }
    
    // Convert the file to a Buffer for upload
    const buffer = Buffer.from(await file.arrayBuffer())
    
    // Upload using admin privileges
    console.log('Uploading file...')
    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from('uploadmedia')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true
      })
    
    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json({ error: uploadError.message }, { status: 500 })
    }
    
    console.log('File uploaded successfully:', uploadData)
    
    // Get the public URL
    const { data: urlData } = supabaseAdmin.storage
      .from('uploadmedia')
      .getPublicUrl(fileName)
    
    if (!urlData?.publicUrl) {
      return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 })
    }
    
    // Determine file type
    const fileType = file.type.split('/')[0] // 'image', 'video', 'application', etc.
    
    // Insert into media_library using admin privileges
    console.log('Saving to database...')
    console.log('Insert data:', {
      url: urlData.publicUrl,
      type: fileType,
      alt_text: altText,
      collection_name: collectionName,
      collection_category: collectionCategory,
      collection_date: collectionDate,
      description: description
    })
    
    const { data: mediaData, error: dbError } = await supabaseAdmin
      .from('media_library')
      .insert({
        url: urlData.publicUrl,
        type: fileType,
        alt_text: altText,
        collection_name: collectionName,
        collection_category: collectionCategory,
        collection_date: collectionDate,
        description: description
      })
      .select()
      .single()
    
    if (dbError) {
      console.error('❌ Database insertion error details:', {
        message: dbError.message,
        code: dbError.code,
        details: dbError.details,
        hint: dbError.hint,
        full_error: dbError
      })
      return NextResponse.json({ 
        error: `Database error: ${dbError.message}`,
        details: dbError,
        success: false
      }, { status: 500 })
    }
    
    console.log('Media saved successfully:', mediaData)
    
    return NextResponse.json({ 
      success: true,
      data: mediaData,
      message: `${fileType === 'video' ? 'Video' : 'File'} uploaded successfully`
    })
    
  } catch (error) {
    console.error('Unhandled error in media upload:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown server error' 
    }, { 
      status: 500 
    })
  }
} 