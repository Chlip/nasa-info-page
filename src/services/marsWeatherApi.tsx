import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const marsWeatherApi = createApi({
  reducerPath: "marsWeatherApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://mars.nasa.gov/rss/api/?feed=weather&category=${'msl'}&feedtype=json&ver=1.0` }),//category - weather station name
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => ``,
    }),
  }),
});

export const {
  useGetDataQuery,
} = marsWeatherApi;
