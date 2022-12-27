import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface collectionParams {
    ps: number;
    sort: string;
  }
export const tleApi = createApi({
  reducerPath: "tleApi",
  baseQuery: fetchBaseQuery({ baseUrl: `https://tle.ivanstanojevic.me/api/tle`}),
  endpoints: (builder) => ({
    getData: builder.query({
      query: (id: number) => `/${id}`,
    }),
    getCollection: builder.query({
        query: (collectionParams: collectionParams) => `?page-size=${collectionParams.ps}&sort=${collectionParams.sort}`,
      }),
  }),
});


export const {
  useGetDataQuery,
  useGetCollectionQuery
} = tleApi;
