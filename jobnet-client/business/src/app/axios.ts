import axios, { AxiosError } from 'axios'

import {getAuth, setAuth, clearAuth} from "Common/auth"

import AuthType from '../types/auth'

declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean
  }
}

export const authAxios = axios.create({})

authAxios.interceptors.request.use(
  (config) => {
    const accessToken = getAuth().accessToken
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
        const refreshToken = getAuth().refreshToken
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
        setAuth(auth)

        originalRequest.headers.Authorization = `Bearer ${auth.accessToken}`

        console.log('Refresh token successfully.')
        return axios(originalRequest)
      } catch (error) {
        clearAuth()
        console.error('Refresh token failed.')
      }
      return Promise.reject(error)
    }
  }
)
