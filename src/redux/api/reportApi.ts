import { baseApi } from "./baseApi";

const reportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReports: builder.query({
      query: (params) => ({
        url: "/reports",
        method: "GET",
        params
      }),
      providesTags: ['report']
    }),
    getSingleReport: builder.query({
      query: (id) => ({
        url: `/reports/${id}`,
        method: "GET"
      }),
      providesTags: ['report']
    }),

  })
})


export const { useGetAllReportsQuery, useGetSingleReportQuery } = reportApi;