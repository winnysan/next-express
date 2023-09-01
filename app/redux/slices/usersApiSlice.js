import { apiSlice } from './apiSlice'
import { USERS_URL } from '@/app/constants'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ['Users'],
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetUsersQuery } = usersApiSlice
