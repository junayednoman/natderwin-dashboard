import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/login',
          method: 'POST',
          body: data
        }
      },
      invalidatesTags: ['profile']
    }),
    logOut: builder.mutation({
      query: () => {
        return {
          url: '/auth/log-out',
          method: 'POST',
          credentials: "include"
        }
      },
      invalidatesTags: ['profile']
    }),
    sendOtp: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/send-otp',
          method: 'POST',
          body: data
        }
      }
    }),
    verifyOtp: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/verify-otp',
          method: 'POST',
          body: data
        }
      }
    }),
    setForgottenPassword: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/reset-forgotten-password',
          method: 'POST',
          body: data
        }
      }
    }),
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: '/auth/create-new-password',
          method: 'POST',
          body: data
        }
      }
    }),
    getAllUsers: builder.query({
      query: (params) => ({
        url: '/auth/all-users',
        method: "GET",
        params: params
      }),
      providesTags: ['user'],
    }),
    getSingleUser: builder.query({
      query: ({ id, params }) => ({
        url: `/auth/users/${id}`,
        method: "GET",
        params: params
      }),
      providesTags: ['user'],
    }),
    approveUser: builder.mutation({
      query: (id) => ({
        url: `/auth/approve/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ['user', "profile"],
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/auth/block/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ['user', "profile"],
    }),
  })
})

export const { useSignInMutation, useVerifyOtpMutation, useSendOtpMutation, useSetForgottenPasswordMutation, useChangePasswordMutation, useGetAllUsersQuery, useGetSingleUserQuery, useBlockUserMutation, useApproveUserMutation, useLogOutMutation } = authApi;