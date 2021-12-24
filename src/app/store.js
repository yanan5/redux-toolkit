import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './features/posts/postsSlice'
import { apiSlice } from './features/api/apiSlice'
import notificationReducer from './features/notifications/notificationSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    notifications: notificationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
