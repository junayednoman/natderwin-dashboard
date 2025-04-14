import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params
      }),
      providesTags: ['user']
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/single/${id}`,
        method: "GET"
      }),
      providesTags: ['user']
    }),
    blockUser: builder.mutation({
      query: (id) => ({
        url: `/users/block/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: ['user']
    }),
  })
})


export const { useGetAllUsersQuery, useGetSingleUserQuery, useBlockUserMutation } = userApi;