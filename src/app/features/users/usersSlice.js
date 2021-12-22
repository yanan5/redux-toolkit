import { createSelector } from '@reduxjs/toolkit'
import { apiSlice } from '../api/apiSlice'

export const extendApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/users',
    }),
  }),
})
export const selectUsersResult = extendApiSlice.endpoints.getUsers.select()
const emptyResult = []
export const selectAllUsers = createSelector(
  selectUsersResult,
  (usersResult) => usersResult?.data ?? emptyResult
)
export const selectUserById = createSelector(
  selectAllUsers,
  (state, userId) => userId,
  (users, userId) => users.find((user) => user.id === userId)
)
export const { useGetUsersQuery } = extendApiSlice
/* Temporarily ignore selectors - we'll come back to this later
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users)
*/
