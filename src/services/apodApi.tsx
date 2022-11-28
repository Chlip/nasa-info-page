import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface dateRange {
  startDate: string;
  endDate: string;
}

// Define a service using a base URL and expected endpoints
export const apodApi = createApi({
  reducerPath: "apodApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.nasa.gov/planetary/apod" }),
  endpoints: (builder) => ({
    getPicture: builder.query({
      query: (date: string) => `?api_key=${process.env.REACT_APP_API_KEY}&date=${date}`,
    }),
    getPicturesRange: builder.query({
      query: (dateRange: dateRange) => `?api_key=${process.env.REACT_APP_API_KEY}&start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`,
    }),
    getRecentPicture: builder.query({
      query: () => `?api_key=${process.env.REACT_APP_API_KEY}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPictureQuery,
  useGetPicturesRangeQuery,
  useGetRecentPictureQuery,
} = apodApi;
