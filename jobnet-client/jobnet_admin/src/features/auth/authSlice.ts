import { createSlice } from '@reduxjs/toolkit'

import { getAuth } from '../../utils/auth'

import type { PayloadAction } from '@reduxjs/toolkit'
import type AuthType from '../../types/auth'

export const authSlice = createSlice({
  name: 'auth',
  initialState: getAuth(),
  reducers: {
    setAuth: (state, action: PayloadAction<AuthType>) => {
      localStorage.setItem('auth', JSON.stringify(action.payload))
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    },

    clearAuth: (state) => {
      localStorage.removeItem('auth')
      state.user = undefined
      state.accessToken = undefined
      state.refreshToken = undefined
    },
  },
})

export const authActions = authSlice.actions
export default authSlice.reducer
