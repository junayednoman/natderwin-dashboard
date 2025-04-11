import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params
      }),
      providesTags: ['user']
    })
  })
})


export const { useGetAllUsersQuery } = userApi;