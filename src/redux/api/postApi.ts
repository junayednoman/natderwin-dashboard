import { baseApi } from "./baseApi";

const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPosts: builder.query({
      query: (params) => ({
        url: "/posts/guest",
        method: "GET",
        params
      }),
      providesTags: ['post']
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['post']
    }),
  })
})


export const { useGetAllPostsQuery, useDeletePostMutation } = postApi;