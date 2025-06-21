import { createSlice } from '@reduxjs/toolkit'

export const historySlice = createSlice({
  name: 'history',
  initialState: {
    array: [],
  },
  reducers: {
    push: (state,action) => {
      state.array.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { push } = historySlice.actions

export default historySlice.reducer