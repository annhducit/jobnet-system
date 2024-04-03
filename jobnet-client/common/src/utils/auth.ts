import { getJSAuth, setJSAuth, clearJSAuth } from 'Jobnet/auth'
import { getRCAuth, setRCAuth, clearRCAuth } from 'Jobnet_recruiter/auth'
import { getADAuth, setADAuth, clearADAuth } from 'Jobnet_admin/auth'

// function getHostAuth(): {
//     getAuth: () => AuthType;
//     setAuth: (auth: AuthType) => void;
//     clearAuth: () => void;
// }{
//     if(window.location.port==import.meta.env.VITE_JOBNET_PORT)
//         return {getAuth: getAuth, setAuth: setAuth, clearAuth: clearAuth}
//     if(window.location.port==import.meta.env.VITE_JOBNET_RECRUITER_PORT)
//         return {getAuth: rc_auth.getAuth, setAuth: rc_auth.setAuth, clearAuth: rc_auth.clearAuth}
//     if(window.location.port==import.meta.env.VITE_JOBNET_ADMIN_PORT)
//         return {getAuth: ad_auth.getAuth, setAuth: ad_auth.setAuth, clearAuth: ad_auth.clearAuth}
//     return {getAuth: getAuth, setAuth: setAuth, clearAuth: clearAuth}
// }

export function getAuth() {
  if (window.location.port == import.meta.env.VITE_JOBNET_PORT) return getJSAuth()
  if (window.location.port == import.meta.env.VITE_JOBNET_RECRUITER_PORT)
    return getRCAuth()
  if (window.location.port == import.meta.env.VITE_JOBNET_ADMIN_PORT)
    return getADAuth()
  return getJSAuth()
}

export function setAuth(auth: AuthType) {
  if (window.location.port == import.meta.env.VITE_JOBNET_PORT)
    return setJSAuth(auth)
  if (window.location.port == import.meta.env.VITE_JOBNET_RECRUITER_PORT)
    return setRCAuth(auth)
  if (window.location.port == import.meta.env.VITE_JOBNET_ADMIN_PORT)
    return setADAuth(auth)
  return setJSAuth(auth)
}

export function clearAuth() {
  if (window.location.port == import.meta.env.VITE_JOBNET_PORT)
    return clearJSAuth()
  if (window.location.port == import.meta.env.VITE_JOBNET_RECRUITER_PORT)
    return clearRCAuth()
  if (window.location.port == import.meta.env.VITE_JOBNET_ADMIN_PORT)
    return clearADAuth()
  return clearJSAuth()
}
