import { baseApi } from "./baseApi";

const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => {
        console.log('getProfile');
        return {
          url: '/admins',
          method: 'GET'
        }
      },
      providesTags: ['profile']
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/admins',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['profile']
    }),
    updateProfileImage: builder.mutation({
      query: (data) => ({
        url: '/admins/image',
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['profile']
    }),
  }),
})

export const { useGetProfileQuery, useUpdateProfileMutation, useUpdateProfileImageMutation } = profileApi;