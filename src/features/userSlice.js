import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    profilePicture:null,
    name:null
  },
  reducers: {
    updateprofilePicture: (state,action) => {
      state.profilePicture=action.payload
    },
    updateName:(state,action)=>{
        state.name=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { updateprofilePicture, updateName} = userSlice.actions

export default userSlice.reducer