import { apiSlice } from './apiSlice'
import { UPLOAD_URL } from '@/app/constants'

export const uploadsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImages: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
})

export const { useUploadImagesMutation } = uploadsApiSlice
