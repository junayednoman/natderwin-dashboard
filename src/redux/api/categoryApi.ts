import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (payload) => ({
        url: "/categories",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['category']
    }),
    getAllCategories: builder.query({
      query: (params) => ({
        url: "/categories",
        method: "GET",
        params
      }),
      providesTags: ['category']
    }),
    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET"
      }),
      providesTags: ['category']
    }),
    updateCategory: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ['category']
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['category']
    }),
  })
})


export const { useCreateCategoryMutation, useGetAllCategoriesQuery, useGetSingleCategoryQuery, useUpdateCategoryMutation, useDeleteCategoryMutation } = categoryApi;