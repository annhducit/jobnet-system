import axios, { AxiosError } from 'axios'

import { store } from './store'
import { authActions } from '../features/auth/authSlice'

import AuthType from '../types/auth'

declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean
  }
}

export const authAxios = axios.create({})

authAxios.interceptors.request.use(
  (config) => {
    const accessToken = store.getState().auth.accessToken
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

authAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config

    if (!originalRequest) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true

      try {
        const refreshToken = store.getState().auth.refreshToken
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        )
        const auth = res.data as AuthType
        store.dispatch(authActions.setAuth(auth))

        originalRequest.headers.Authorization = `Bearer ${auth.accessToken}`

        console.log('Refresh token successfully.')
        return axios(originalRequest)
      } catch (error) {
        store.dispatch(authActions.clearAuth())
        console.error('Refresh token failed.')
      }
      return Promise.reject(error)
    }
  }
)
