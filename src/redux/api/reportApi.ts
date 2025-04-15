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
    updateReportStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/reports/${id}`,
        method: "PATCH",
        body: { status }
      }),
      invalidatesTags: ['report']
    }),
  })
})


export const { useGetAllReportsQuery, useGetSingleReportQuery, useUpdateReportStatusMutation } = reportApi;