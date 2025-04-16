import { baseApi } from "./baseApi";

const starPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createStarPlan: builder.mutation({
      query: (payload) => ({
        url: "/star-plans",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['starPlan']
    }),
    getAllStarPlans: builder.query({
      query: (params) => ({
        url: "/star-plans",
        method: "GET",
        params
      }),
      providesTags: ['starPlan']
    }),
    getSingleStarPlan: builder.query({
      query: (id) => ({
        url: `/star-plans/${id}`,
        method: "GET"
      }),
      providesTags: ['starPlan']
    }),
    updateStarPlan: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/star-plans/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ['starPlan']
    }),
    deleteStarPlan: builder.mutation({
      query: (id) => ({
        url: `/star-plans/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['starPlan']
    }),
  })
})


export const { useCreateStarPlanMutation, useGetAllStarPlansQuery, useGetSingleStarPlanQuery, useUpdateStarPlanMutation, useDeleteStarPlanMutation } = starPlanApi;