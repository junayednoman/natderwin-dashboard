import { baseApi } from "./baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (params) => ({
        url: "/notifications",
        method: "GET",
        params
      }),
      providesTags: ['notification']
    }),
    marAllAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications`,
        method: "PATCH"
      }),
      invalidatesTags: ['notification']
    }),
    marAsRead: builder.mutation({
      query: (id) => ({
        url: `/notifications/${id}`,
        method: "PATCH"
      }),
      invalidatesTags: ['notification']
    }),
    getNotificationCount: builder.query({
      query: () => ({
        url: "/notifications/count",
        method: "GET"
      }),
      providesTags: ['notification']
    })
  })
})


export const { useGetNotificationsQuery, useMarAllAsReadMutation, useMarAsReadMutation, useGetNotificationCountQuery } = notificationApi;