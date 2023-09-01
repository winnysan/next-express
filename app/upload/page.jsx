'use client'
import { useState } from 'react'
import { useUploadImagesMutation } from '../redux/slices/uploadsApiSlice'

const Uploads = () => {
  const [images, setImages] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const [upload] = useUploadImagesMutation()

  const uploadImages = async (e) => {
    const files = e.target?.files

    if (files?.length > 0) {
      setIsUploading(true)

      let data = new FormData()
      for await (const file of files) {
        data.append('image', file)
      }

      try {
        const res = await upload(data).unwrap()
        setImages((oldImages) => {
          return [...oldImages, ...res.links]
        })
      } catch (err) {
        console.log('uploadImages', err?.data?.message || err.error)
      }
    }

    setIsUploading(false)
  }

  return (
    <main>
      <h1>Uploads</h1>
      {isUploading ? (
        <div>Uploading...</div>
      ) : (
        <label style={{ border: '1px solid' }}>
          <input
            type="file"
            onChange={(e) => uploadImages(e)}
            style={{ display: 'none' }}
            multiple
          />
          Upload
        </label>
      )}

      {images.length > 0 && (
        <div>
          {images.map((link) => (
            <img
              key={link}
              src={`/uploads/${link}`}
              alt={link}
              style={{ height: '64px', padding: '4px' }}
            />
          ))}
        </div>
      )}
    </main>
  )
}

export default Uploads
