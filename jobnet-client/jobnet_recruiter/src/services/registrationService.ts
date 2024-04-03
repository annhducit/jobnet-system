import BaseService from './baseService'

import UserType from '../types/user'

class RegistrationService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/registration`

  async registerJobSeeker(req: object) {
    const res = await this.authAxios.post(
      `${this.apiBaseUrl}/jobSeeker`,
      JSON.stringify(req),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<UserType>(res)
  }

  async registerRecruiterWithNewBusiness(req: object) {
    const res = await this.authAxios.post(
      `${this.apiBaseUrl}/recruiter/newBusiness`,
      JSON.stringify(req),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<UserType>(res)
  }

  async registerRecruiterWithSelectedBusiness(req: object) {
    const res = await this.authAxios.post(
      `${this.apiBaseUrl}/recruiter/selectedBusiness`,
      JSON.stringify(req),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<UserType>(res)
  }

  async verifyUser(req: object) {
    const res = await this.axios.post(
      `${this.apiBaseUrl}/verify`,
      JSON.stringify(req),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
  }
}

export default new RegistrationService()
