import { baseApi } from "./baseApi";

const settingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettings: builder.query({
      query: () => ({
        url: "/settings",
        method: "GET"
      }),
      providesTags: ['settings']
    }),
    updateSettings: builder.mutation({
      query: (payload) => ({
        url: "/settings",
        method: "PUT",
        body: payload
      }),
      invalidatesTags: ['settings']
    }),
  })
})


export const { useGetSettingsQuery, useUpdateSettingsMutation } = settingApi;