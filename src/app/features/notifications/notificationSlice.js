import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../../../api/client'

export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const allNotifications = selectAllNotifications(getState())
    const [latestNotifications] = allNotifications
    const latestTimestamp = latestNotifications ? latestNotifications.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
)

const notificationAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
})
const notificationSlice = createSlice({
  name: 'notifications',
  initialState: notificationAdapter.getInitialState(),
  reducers: {
    notificationsRead: (state, action) => {
      Object.values(state.entities).forEach((notification) => {
        notification.read = true
      })
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      notificationAdapter.upsertMany(state, action.payload)
      Object.values(state.entities).forEach((notification) => {
        notification.isNew = !notification.read
      })
    })
  },
})

export const { notificationsRead } = notificationSlice.actions
export default notificationSlice.reducer
export const { selectAll: selectAllNotifications } =
  notificationAdapter.getSelectors((state) => state.notifications)
