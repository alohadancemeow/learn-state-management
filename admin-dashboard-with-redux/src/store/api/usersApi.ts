import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ limit = 10, skip = 0 }) => `users?limit=${limit}&skip=${skip}`,
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }: { id: number }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
