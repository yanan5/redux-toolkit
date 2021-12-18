import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../../api/client'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})

/**
 * INITIAL STATE
 */
const initialState = postsAdapter.getInitialState({
  status: 'idle',
  error: null,
})
/**
 * Async Action Creators
 */
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async (initialPost) => {
    const response = await client.post('fakeApi/posts', initialPost)
    return response.data
  }
)

/**
 * State Slice
 */
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    reactionAdded: {
      reducer: (state, action) => {
        const { postId, reaction } = action.payload
        const existingPost = state.entities[postId]
        if (existingPost) {
          existingPost.reactions[reaction]++
        }
      },
      prepare: (postId, reaction) => ({
        payload: {
          postId,
          reaction,
        },
      }),
    },
    postUpdated: {
      reducer: (state, action) => {
        const { id, title, content, user } = action.payload
        const existingPost = state.entities[id]
        if (existingPost) {
          existingPost.title = title
          existingPost.content = content
          existingPost.user = user
        }
      },
      prepare: (id, title, content, userId) => {
        return {
          payload: {
            id,
            title,
            content,
            user: userId,
          },
        }
      },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'success'
        postsAdapter.upsertMany(state, action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
  },
})

/**
 * selectors
 */
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds,
} = postsAdapter.getSelectors((state) => state.posts)
export const selectPostsByUser = createSelector(
  [selectAllPosts],
  (state, userId) => userId,
  (posts, userId) => posts.filter((post) => post.user === userId)
)

/**
 * actions and reducers export
 */
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer
