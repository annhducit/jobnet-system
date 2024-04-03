import {setJSLoad} from 'Jobnet/loading'
import {setRCLoad} from 'Jobnet_recruiter/loading'
import {setADLoad} from 'Jobnet_admin/loading'

export function setLoad(flag:boolean) {
  if (window.location.port == import.meta.env.VITE_JOBNET_PORT)
    return setJSLoad(flag)
  if (window.location.port == import.meta.env.VITE_JOBNET_RECRUITER_PORT)
    return setRCLoad(flag)
  if (window.location.port == import.meta.env.VITE_JOBNET_ADMIN_PORT)
    return setADLoad(flag)
  return setJSLoad(flag)
}
