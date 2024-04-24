import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const TASKS_URL = "/task";

const baseQuery = async (args, api, extraOptions) => {
  const { method, headers, ...others } = args;
  const response = await fetch(args.url, {
    method,
    headers: {
      'Origin': 'https://karapain.github.io',
      'Access-Control-Request-Headers': 'Content-Type, Authorization',
      'Access-Control-Request-Method': 'GET',
      // Add any other headers your backend expects here
      ...headers,
    },
    credentials: 'include', // Include this if you need to send cookies or authentication headers
    ...others,
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export const taskApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: TASKS_URL }),
  endpoints: (builder) => ({
    getDashbordStats: builder.query({
      query: () => `${TASKS_URL}/dashboard`,
    }),

    getAllTask: builder.query({
      query: ({ strQuery, isTrashed, search }) =>
        `${TASKS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search={search}`,
    }),

    createTask: builder.mutation({
      query: (data) => ({
        url: `${TASKS_URL}/create`,
        method: "POST",
        body: data,
      }),
    }),

    duplicateTask: builder.mutation({
      query: (id) => ({
        url: `${TASKS_URL}/duplicate/${id}`,
        method: "POST",
        body: {},
      }),
    }),

    // Other endpoints go here
  }),
});

export const {
  useGetDashbordStatsQuery,
  useGetAllTaskQuery,
  useCreateTaskMutation,
  useDuplicateTaskMutation,
} = taskApi;
