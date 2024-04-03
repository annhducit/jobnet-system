import BaseService from './baseService'

import PaginationType from '../types/pagination'
import RecruiterType, { FormUpdateProfileRCProps } from '../types/recruiter'

class RecruiterService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/recruiters`

  async getRecruiters(props?: {
    page?: number
    pageSize?: number
    sortBy?: string[]
    email?: string
    name?: string
    phone?: string
    business?: string
  }) {
    const params = new URLSearchParams()
    props?.page && params.append('page', props.page.toString())
    props?.pageSize && params.append('pageSize', props.pageSize.toString())
    props?.email && params.append('email', props.email)
    props?.name && params.append('name', props.name)
    props?.phone && params.append('phone', props.phone)
    props?.business && params.append('business', props.business)
    if (props?.sortBy) {
      props.sortBy.map((element) => {
        params.append('sortBy', element)
      })
    }
    const url = params.toString().length
      ? `${this.apiBaseUrl}?${params.toString()}`
      : this.apiBaseUrl
    const res = await this.axios.get(url)

    this.checkResponseNotOk(res)
    return this.getResponseData<PaginationType<RecruiterType>>(res)
  }

  async getRecruiterById(id: string) {
    const res = await this.axios.get(`${this.apiBaseUrl}/${id}`)

    this.checkResponseNotOk(res)
    return this.getResponseData<RecruiterType>(res)
  }

  async updateRecruiterProfile(
    id: string | undefined,
    data: FormUpdateProfileRCProps
  ) {
    const res = await this.authAxios.put(
      `${this.apiBaseUrl}/${id}/profile`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<RecruiterType>(res)
  }

  getRecruiterProfileImage(id: string | undefined) {
    const url = `${this.apiBaseUrl}/${id}/profileImage`
    return url
  }

  async uploadRecruiterProfileImage(recruiterId: string, formData: FormData) {
    const url = `${this.apiBaseUrl}/${recruiterId}/profileImage`
    const res = await this.authAxios.post(url, formData)

    this.checkResponseNotOk(res)
    return this.getResponseData<RecruiterType>(res)
  }

  async deleteRecruiterById(id: string) {
    const res = await this.authAxios.delete(`${this.apiBaseUrl}/${id}`)

    this.checkResponseNotOk(res)
  }

  async openDeleteRecruiterById(id: string) {
    const res = await this.authAxios.delete(`${this.apiBaseUrl}/${id}/open`)

    this.checkResponseNotOk(res)
  }
}

export default new RecruiterService()
