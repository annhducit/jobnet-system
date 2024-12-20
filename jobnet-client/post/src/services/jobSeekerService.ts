import BaseService from './baseService'

import JobSeekerType from '../types/jobSeeker'
import PaginationType from '../types/pagination'

class JobSeekerService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/jobSeekers`

  async getJobSeekers(props?: {
    page?: number
    pageSize?: number
    sortBy?: string[]
    email?: string
    name?: string
    phone?: string
    verificationStatus?: string
    accountType?: string
  }): Promise<PaginationType<JobSeekerType>> {
    const params = new URLSearchParams()
    props?.page && params.append('page', props.page.toString())
    props?.pageSize && params.append('pageSize', props.pageSize.toString())
    props?.email && params.append('email', props.email)
    props?.name && params.append('name', props.name)
    props?.phone && params.append('phone', props.phone)
    props?.verificationStatus &&
      params.append('verificationStatus', props.verificationStatus)
    props?.accountType && params.append('accountType', props.accountType)

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
    return this.getResponseData<PaginationType<JobSeekerType>>(res)
  }

  async getJobSeekerById(id: string) {
    const res = await this.axios.get(`${this.apiBaseUrl}/${id}`)

    this.checkResponseNotOk(res)
    return this.getResponseData<JobSeekerType>(res)
  }

  async updateJobSeekerPersonalInfo(id: string, req: object) {
    const url = `${this.apiBaseUrl}/${id}/personalInfo`

    return this.updateJobSeekerInfo(url, req)
  }

  async updateJobSeekerProfessionInfo(id: string, req: object) {
    const url = `${this.apiBaseUrl}/${id}/professionInfo`

    return this.updateJobSeekerInfo(url, req)
  }

  private async updateJobSeekerInfo(url: string, req: object) {
    const res = await this.authAxios.put(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(req),
    })

    this.checkResponseNotOk(res)
    return this.getResponseData<JobSeekerType>(res)
  }

  async deleteJobSeekerById(id: string) {
    const res = await this.authAxios.delete(`${this.apiBaseUrl}/${id}`)
    this.checkResponseNotOk(res)
  }

  async openDeleteJobSeekerById(id: string) {
    const res = await this.authAxios.delete(`${this.apiBaseUrl}/${id}/open`)
    this.checkResponseNotOk(res)
  }

  getJobSeekerProfileImage(id: string) {
    const url = `${this.apiBaseUrl}/${id}/profileImage`
    return url
  }

  async uploadJobSeekerProfileImage(id: string, formData: FormData) {
    const url = `${this.apiBaseUrl}/${id}/profileImage`
    const res = await this.authAxios.post(url, formData)

    this.checkResponseNotOk(res)
    return this.getResponseData<JobSeekerType>(res)
  }

  async updateJobSeekerBusinessFollowed(id: string, req: object) {
    const url = `${this.apiBaseUrl}/${id}/follow`
    const res = await this.authAxios.put(url, JSON.stringify(req), {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.checkResponseNotOk(res)
    return this.getResponseData<JobSeekerType>(res)
  }
}

export default new JobSeekerService()
