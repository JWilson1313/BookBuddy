import api from "../store/api.js";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: ({ firstname, lastname, email, password }) => ({
        url: "api/users/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          password,
        }),
      }),
    }),
    userLogin: build.mutation({
      query: ({ email, password }) => ({
        url: "api/users/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }),
    }),
    getUser: build.query({
      query: ({ token }) => ({
        url: "api/users/me",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useUserLoginMutation,
  useGetUserQuery,
} = userApi;

export default userApi;
