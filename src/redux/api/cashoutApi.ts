import { baseApi } from "./baseApi";

const cashoutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCashoutRequests: builder.query({
      query: (params) => ({
        url: "/cashout-requests",
        method: "GET",
        params
      }),
      providesTags: ['cashout']
    }),
    getSingleCashoutRequest: builder.query({
      query: (id) => ({
        url: `/cashout-requests/${id}`,
        method: "GET"
      }),
      providesTags: ['cashout']
    }),
    updateCashoutRequest: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/cashout-requests/${id}`,
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ['cashout']
    }),
  })
})


export const { useGetAllCashoutRequestsQuery, useGetSingleCashoutRequestQuery, useUpdateCashoutRequestMutation } = cashoutApi;