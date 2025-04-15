import { baseApi } from "./baseApi";

const summaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserOverview: builder.query({
      query: (params) => ({
        url: "/summaries/user-overview",
        method: "GET",
        params
      }),
      providesTags: ['summary']
    }),
    getEarningOverview: builder.query({
      query: (params) => ({
        url: "/summaries/earning-overview",
        method: "GET",
        params
      }),
      providesTags: ['summary']
    }),
    getStats: builder.query({
      query: (params) => ({
        url: "/summaries/stats",
        method: "GET",
        params
      }),
      providesTags: ['summary']
    }),
    getEarningStats: builder.query({
      query: () => ({
        url: "/summaries/earning",
        method: "GET"
      }),
      providesTags: ['summary']
    }),
    getEarnings: builder.query({
      query: (params) => ({
        url: "/payments",
        method: "GET",
        params
      }),
      providesTags: ['payment']
    }),
    getSingleEarning: builder.query({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "GET"
      }),
      providesTags: ['payment']
    }),
  })
})


export const { useGetUserOverviewQuery, useGetStatsQuery, useGetEarningOverviewQuery, useGetEarningStatsQuery, useGetEarningsQuery, useGetSingleEarningQuery } = summaryApi