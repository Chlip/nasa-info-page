import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const marsWeatherApi = createApi({
  reducerPath: "marsWeatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://mars.nasa.gov/rss/api/?feed=weather&category=insight_temperature&feedtype=json&ver=1.0` }),
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => ``,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetDataQuery,
} = marsWeatherApi;
