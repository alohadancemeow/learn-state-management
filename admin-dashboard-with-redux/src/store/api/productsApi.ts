import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    /**
     * Fetches a list of products with optional pagination and search.
     * 
     * @param params - Object containing limit, skip, and optional search query 'q'
     * @returns List of products and total count
     */
    getProducts: builder.query({
      query: ({ limit = 10, skip = 0, q = '' }) => {
        if (q) {
          return `products/search?q=${q}&limit=${limit}&skip=${skip}`;
        }
        return `products?limit=${limit}&skip=${skip}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }: { id: number }) => ({ type: 'Product' as const, id })),
              { type: 'Product', id: 'LIST' },
            ]
          : [{ type: 'Product', id: 'LIST' }],
    }),
    /**
     * Fetches a single product by its ID.
     * 
     * @param id - The ID of the product to retrieve
     * @returns Product details
     */
    getProductById: builder.query({
      query: (id) => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    /**
     * Adds a new product.
     * 
     * Note: Since this uses a dummy API, the product is not actually added to a persistent database,
     * but the API returns the created object.
     * 
     * @param body - The product data to add
     * @returns The created product
     */
    addProduct: builder.mutation({
      query: (body) => ({
        url: 'products/add',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }], // Invalidates the product list cache to refresh the list
    }),
    /**
     * Updates an existing product.
     * 
     * @param params - Object containing the product ID and fields to update
     * @returns The updated product
     */
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }],
    }),
    /**
     * Deletes a product by its ID.
     * 
     * @param id - The ID of the product to delete
     * @returns The deleted product data
     */
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Product', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
