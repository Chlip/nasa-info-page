import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface dateRange {
  sd: string;
  ed: string;
}

export const apodApi = createApi({
  reducerPath: "apodApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.nasa.gov/planetary/apod" }),
  endpoints: (builder) => ({
    getPicture: builder.query({
      query: (date: string) => `?api_key=${process.env.REACT_APP_API_KEY}&date=${date}`,
    }),
    getPicturesRange: builder.query({
      query: (dateRange: dateRange) => `?api_key=${process.env.REACT_APP_API_KEY}&start_date=${dateRange.sd}&end_date=${dateRange.ed}`,
    }),
    getRecentPicture: builder.query({
      query: () => `?api_key=${process.env.REACT_APP_API_KEY}`,
    }),
  }),
});


export const {
  useGetPictureQuery,
  useGetPicturesRangeQuery,
  useGetRecentPictureQuery,
} = apodApi;
