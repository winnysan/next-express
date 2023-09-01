import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userInfo: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
})

export const {} = authSlice.actions

export default authSlice.reducer
