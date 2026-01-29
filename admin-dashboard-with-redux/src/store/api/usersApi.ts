import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    /**
     * Fetches a list of users with optional pagination.
     * 
     * @param params - Object containing limit and skip for pagination
     * @returns List of users and total count
     */
    getUsers: builder.query({
      query: ({ limit = 10, skip = 0 }) => `users?limit=${limit}&skip=${skip}`,
      // Provides cache tags for the getUsers query so the cache can be invalidated later.
      // When data exists, it tags each user by id and also tags the entire list.
      // When no data, it only tags the list.
      providesTags: (result) =>
        result
          ? [
              ...result.users.map(({ id }: { id: number }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    /**
     * Fetches a single user by their ID.
     * 
     * @param id - The ID of the user to retrieve
     * @returns User details
     */
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = usersApi;
