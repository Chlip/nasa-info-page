import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const marsRoverPhotoApi = createApi({
  reducerPath: "marsRoverPhotoApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://api.nasa.gov/mars-photos/api/v1/` }),
  endpoints: (builder) => ({
    getRovers: builder.query({
      query: () => `/rovers/?API_KEY=${process.env.REACT_APP_API_KEY}`,
    }),
    getRoverLatestPhoto: builder.query({
        query: (rover:string) => `/rovers/${rover}/latest_photos?api_key=${process.env.REACT_APP_API_KEY}`,
      }),
  }),
});


export const {
  useGetRoversQuery,
  useGetRoverLatestPhotoQuery
} = marsRoverPhotoApi;
