import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface queryParamsInfo {
  date: string;
  picType: string;
}
interface queryParamsPic {
  date: string[];
  picType: string;
  picExtension: string;
  imageName: string;
}

export const eonetApi = createApi({
  reducerPath: "eonetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://eonet.gsfc.nasa.gov/api/",
  }),
  endpoints: (builder) => ({
    getEventsDays: builder.query({
      query: (days: number) => `v2.1/events?days=${days}`,
    }),
    getEventsLimit: builder.query({
      query: (limit: number) => `v2.1/events?limit=${limit}`,
    }),
    getSources: builder.query({
      query: () => `v3/sources`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEventsDaysQuery, useGetEventsLimitQuery, useGetSourcesQuery } = eonetApi;
