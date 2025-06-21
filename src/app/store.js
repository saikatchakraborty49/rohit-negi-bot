import { configureStore } from '@reduxjs/toolkit'
import historyReducer from '../features/historySlice'
import userReducer from '../features/userSlice'

export default configureStore({
  reducer: {
    history:historyReducer,
    user:userReducer
  },
})