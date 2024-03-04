import { QUESTION_URL } from "../utils/constants";
import { apiSlice } from "./apiSlice";

export const cuestonarioApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => ({
        url: `${QUESTION_URL}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetQuestionsQuery } = cuestonarioApiSlice;
