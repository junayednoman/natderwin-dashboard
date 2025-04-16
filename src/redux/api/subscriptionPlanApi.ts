import { baseApi } from "./baseApi";

const subscriptionPlanApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscriptionPlan: builder.mutation({
      query: (payload) => ({
        url: "/subscription-plans",
        method: "POST",
        body: payload
      }),
      invalidatesTags: ['subscriptionPlan']
    }),
    getAllSubscriptionPlans: builder.query({
      query: (params) => ({
        url: "/subscription-plans",
        method: "GET",
        params
      }),
      providesTags: ['subscriptionPlan']
    }),
    getSubscriptionPlan: builder.query({
      query: (id) => ({
        url: `/subscription-plans/${id}`,
        method: "GET"
      }),
      providesTags: ['subscriptionPlan']
    }),
    updateSubscriptionPlan: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/subscription-plans/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ['subscriptionPlan']
    }),
    deleteSubscriptionPlan: builder.mutation({
      query: (id) => ({
        url: `/subscription-plans/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: ['subscriptionPlan']
    }),
  })
})


export const { useCreateSubscriptionPlanMutation, useGetAllSubscriptionPlansQuery, useGetSubscriptionPlanQuery, useUpdateSubscriptionPlanMutation, useDeleteSubscriptionPlanMutation } = subscriptionPlanApi;