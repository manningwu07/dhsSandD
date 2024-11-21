import { useState } from 'react'
import { Input } from '~/components/ui/input'
import { Loader2 } from 'lucide-react'
import Image from "next/image"

const CLOUDINARY_CLOUD_NAME = 'dokhmjxnx'
const CLOUDINARY_UPLOAD_PRESET = 'HighSchoolWebsites'

interface ImageUploadProps {
  currentSrc: string
  onUpload: (url: string) => void
  path?: string
}

export function ImageUpload({ currentSrc, onUpload }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Upload failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (!data.secure_url) {
        throw new Error('Invalid response: Missing secure_url');
      }
      onUpload(data.secure_url)
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
        <Image 
          src={currentSrc} 
          alt="Current image" 
          width = {300}
          height = {300}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        />
        {uploading && <Loader2 className="h-4 w-4 animate-spin" />}
      </div>
    </div>
  )
}