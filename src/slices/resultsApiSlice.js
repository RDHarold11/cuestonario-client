import { RESULTS_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";

export const resultsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getResultsByUser: builder.query({
      query: (id) => ({
        url: `${RESULTS_URL}/user/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createResults: builder.mutation({
      query: (result) => ({
        url: RESULTS_URL,
        method: "POST",
        body: { ...result },
      }),
    }),
    calculateResults: builder.mutation({
      query: (userId) => ({
        url: `${RESULTS_URL}/calculate/${userId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetResultsByUserQuery,
  useCreateResultsMutation,
  useCalculateResultsMutation,
} = resultsApiSlice;
