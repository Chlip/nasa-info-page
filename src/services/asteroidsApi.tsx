import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface dateRange {
    sd: string;
    ed: string;
  }
export const asteroidsApi = createApi({
  reducerPath: "asteroidsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.nasa.gov/neo/rest/v1`}),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (dateRange: dateRange) => `/feed?start_date=${dateRange.sd}&end_date=${dateRange.ed}&api_key=${process.env.REACT_APP_API_KEY}`,
    }),
  }),
});


export const {
  useGetDataQuery,
} = asteroidsApi;
