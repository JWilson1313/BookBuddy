import api from "../store/api";

const booksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => ({
        url: "/api/books",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getBookById: build.query({
      query: (id) => ({
        url: `/api/books/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    patchAvailabilityById: build.mutation({
      query: ({ id, available, token }) => ({
        url: `/api/books/${id}`,
        method: "PATCH",
        body: { available },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Books", id },
        { type: "UserBooks" },
      ],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  usePatchAvailabilityByIdMutation,
} = booksApi;

export default booksApi;
