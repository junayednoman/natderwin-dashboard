import { baseApi } from "./baseApi";

const summaryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserOverview: builder.query({
      query: (params) => ({
        url: "/summaries/user-overview",
        method: "GET",
        params
      })
    }),
    getEarningOverview: builder.query({
      query: (params) => ({
        url: "/summaries/earning-overview",
        method: "GET",
        params
      })
    }),
    getStats: builder.query({
      query: (params) => ({
        url: "/summaries/stats",
        method: "GET",
        params
      })
    })
  })
})


export const { useGetUserOverviewQuery, useGetStatsQuery, useGetEarningOverviewQuery } = summaryApi