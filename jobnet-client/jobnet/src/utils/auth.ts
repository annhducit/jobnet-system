import { redirect } from 'react-router-dom'
import type AuthType from '../types/auth'
import { store } from '../app/store'
import { authActions } from '../features/auth/authSlice'

export function setJSAuth(auth:AuthType){
  store.dispatch(authActions.setAuth(auth))
}

export function clearJSAuth(){
  store.dispatch(authActions.clearAuth())
}
export function getJSAuth() {
  const authString = localStorage.getItem('auth')
  const auth = (authString ? JSON.parse(authString) : {}) as AuthType
  return auth
}
export function getAuth() {
  const authString = localStorage.getItem('auth')
  const auth = (authString ? JSON.parse(authString) : {}) as AuthType
  return auth
}

export const requireAuth = (
  request: Request,
  requiredRole: 'Admin' | 'Recruiter' | 'JobSeeker'
) => {
  const auth = getAuth()
  const isLoggedIn = !!auth.accessToken
  const pathname = new URL(request.url).pathname

  if (isLoggedIn) {
    const role = auth.user?.role
    role !== requiredRole && redirectToHomeByRole(role)
    return
  } else {
    throw redirect(`/signin?type=info&message=You must log in first.&redirectTo=${pathname}`)
  }
}

export const redirectIfAuthenticated = () => {
  const auth = getAuth()
  const isLoggedIn = !!auth.accessToken

  if (!isLoggedIn) return

  // Should replace by extract role from access
  redirectToHomeByRole(auth.user?.role)
}

const redirectToHomeByRole = (role?: 'Admin' | 'Recruiter' | 'JobSeeker') => {
  switch (role) {
    case 'Admin':
      throw redirect('http://localhost:3002/')
    case 'Recruiter':
      throw redirect('http://localhost:3001/')
    default:
      throw redirect('http://localhost:3000/')
  }
}
