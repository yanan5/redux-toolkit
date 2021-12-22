import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './features/posts/postsSlice'
import notificationReducer from './features/notifications/notificationSlice'
import { apiSlice } from './features/api/apiSlice'

export default configureStore({
  reducer: {
    posts: postsReducer,
    notifications: notificationReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
