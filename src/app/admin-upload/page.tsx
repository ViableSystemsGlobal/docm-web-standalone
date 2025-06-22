'use client'

import { useState } from 'react'

export default function AdminUpload() {
  const [files, setFiles] = useState<File[]>([])
  const [collectionName, setCollectionName] = useState('')
  const [collectionCategory, setCollectionCategory] = useState('Sunday Service')
  const [collectionDate, setCollectionDate] = useState('')
  const [uploading, setUploading] = useState(false)
  const [results, setResults] = useState<string[]>([])

  const categories = [
    'Sunday Service', 'Youth Ministry', 'Prayer Meeting', 'Bible Study',
    'Community Outreach', 'Special Events', 'Baptisms', 'Fellowship',
    'Worship Night', 'Missions', 'Kids Ministry', 'Mens Ministry', 'Womens Ministry'
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleUpload = async () => {
    if (!files.length || !collectionName) {
      setResults(['Please select files and enter collection name'])
      return
    }

    setUploading(true)
    setResults([])
    const uploadResults: string[] = []

    for (const file of files) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('altText', '')
        formData.append('collectionName', collectionName)
        formData.append('collectionCategory', collectionCategory)
        formData.append('collectionDate', collectionDate)

        // Use the working admin API endpoint
        const response = await fetch('http://localhost:3001/api/upload-media', {
          method: 'POST',
          body: formData,
        })

        const result = await response.json()

        if (response.ok && result.success) {
          uploadResults.push(`✅ ${file.name} uploaded successfully`)
        } else {
          uploadResults.push(`❌ ${file.name} failed: ${result.error || 'Unknown error'}`)
        }
      } catch (error) {
        uploadResults.push(`❌ ${file.name} failed: ${error}`)
      }
    }

    setResults(uploadResults)
    setUploading(false)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Church Media Upload</h1>
      <p style={{ marginBottom: '20px', color: '#666' }}>
        Upload photos and videos for your church services and events
      </p>
      
      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Collection Name:</label>
        <input
          type="text"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
          placeholder="e.g., Sunday Service January 2025"
          style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Service/Program:</label>
        <select
          value={collectionCategory}
          onChange={(e) => setCollectionCategory(e.target.value)}
          style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Date (optional):</label>
        <input
          type="date"
          value={collectionDate}
          onChange={(e) => setCollectionDate(e.target.value)}
          style={{ width: '100%', padding: '12px', border: '2px solid #ddd', borderRadius: '8px', fontSize: '16px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Select Files:</label>
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          style={{ 
            width: '100%', 
            padding: '12px', 
            border: '2px dashed #007bff', 
            borderRadius: '8px',
            backgroundColor: '#f8f9fa',
            fontSize: '16px'
          }}
        />
        {files.length > 0 && (
          <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#e7f3ff', borderRadius: '6px' }}>
            <strong>Selected: {files.length} files</strong>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              {files.slice(0, 5).map((file, index) => (
                <li key={index} style={{ margin: '2px 0' }}>{file.name}</li>
              ))}
              {files.length > 5 && <li>... and {files.length - 5} more files</li>}
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={handleUpload}
        disabled={uploading || !files.length || !collectionName}
        style={{
          backgroundColor: uploading ? '#ccc' : '#007bff',
          color: 'white',
          padding: '15px 30px',
          border: 'none',
          borderRadius: '8px',
          cursor: uploading ? 'not-allowed' : 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          width: '100%'
        }}
      >
        {uploading ? 'Uploading...' : `Upload Collection (${files.length} files)`}
      </button>

      {results.length > 0 && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}>
          <h3 style={{ marginTop: 0 }}>Upload Results:</h3>
          {results.map((result, index) => (
            <div key={index} style={{ 
              margin: '8px 0', 
              padding: '8px',
              backgroundColor: result.includes('✅') ? '#d4edda' : '#f8d7da',
              borderRadius: '4px',
              fontFamily: 'monospace'
            }}>
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 