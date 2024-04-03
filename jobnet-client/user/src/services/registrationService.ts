
import {checkResponseNotOk, getResponseData} from './baseFetch'
import { authAxios } from '../app/axios'
import axios from 'axios'
import UserType from '../types/user'

class RegistrationService {

  async registerJobSeeker(req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/registration`
    const res = await authAxios.post(
      `${apiBaseUrl}/jobSeeker`,
      JSON.stringify(req),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<UserType>(res)
  }

  async registerRecruiterWithNewBusiness(req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/registration`
    const res = await authAxios.post(
      `${apiBaseUrl}/recruiter/newBusiness`,
      JSON.stringify(req),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<UserType>(res)
  }

  async registerRecruiterWithSelectedBusiness(req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/registration`
    const res = await authAxios.post(
      `${apiBaseUrl}/recruiter/selectedBusiness`,
      JSON.stringify(req),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<UserType>(res)
  }

  async verifyUser(req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/registration`
    const res = await axios.post(
      `${apiBaseUrl}/verify`,
      JSON.stringify(req),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
  }
}

export default new RegistrationService()
