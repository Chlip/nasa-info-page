import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface queryParamsInfo {
  date: string
  picType: string
}
interface queryParamsPic {
    date: string[]
    picType: string
    picExtension: string
    imageName: string
  }

export const epicApi = createApi({
  reducerPath: "epicApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://epic.gsfc.nasa.gov/" }),
  endpoints: (builder) => ({
    getInfo: builder.query({
      query: (queryParamsInfo: queryParamsInfo) => `api/${queryParamsInfo.picType}/${queryParamsInfo.date}`,
    }),
    getPicture: builder.query({
        query: (queryParamsPic: queryParamsPic) => `archive/${queryParamsPic.picType}/${queryParamsPic.date[0]}/${queryParamsPic.date[1]}/${queryParamsPic.date[2]}/${queryParamsPic.picExtension}/${queryParamsPic.imageName}.${queryParamsPic.picExtension}`,
      }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPictureQuery,
  useGetInfoQuery
} = epicApi;
