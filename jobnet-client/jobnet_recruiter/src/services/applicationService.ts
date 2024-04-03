import BaseService from './baseService'

import ApplicationType, { ApplicationStatus } from '../types/application'
import PaginationType from '../types/pagination'

class ApplicationService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/applications`

  async getApplications(props?: {
    jobSeekerId?: string | undefined
    page?: number
    pageSize?: number
    status?: ApplicationStatus
  }) {
    const params = new URLSearchParams()
    props?.jobSeekerId && params.append('jobSeekerId', props.jobSeekerId)
    props?.page && params.append('page', props.page.toString())
    props?.pageSize && params.append('pageSize', props.pageSize.toString())
    props?.status && params.append('status', props.status)

    const url = params.toString().length
      ? `${this.apiBaseUrl}?${params.toString()}`
      : this.apiBaseUrl
    const res = await this.authAxios.get(url)

    this.checkResponseNotOk(res)
    return this.getResponseData<PaginationType<ApplicationType>>(res)
  }

  async getApplicationsByRecruiterId(props?: {
    page?: number
    pageSize?: number
    sortBy?: string
    applicationStatuses?: Array<ApplicationStatus>
    fromDate?: string
    toDate?: string
  }) {
    const params = new URLSearchParams()
    props?.page && params.append('page', props.page.toString())
    props?.pageSize && params.append('pageSize', props.pageSize.toString())
    props?.sortBy && params.append('sortBy', props.sortBy.toString())
    props?.applicationStatuses &&
      props.applicationStatuses.forEach((applicationStatus) =>
        params.append('applicationStatuses', applicationStatus)
      )
    props?.fromDate && params.append('fromDate', props.fromDate.toString())
    props?.toDate && params.append('toDate', props.toDate.toString())

    const url = params.toString().length
      ? `${this.apiBaseUrl}/recruiter?${params.toString()}`
      : `${this.apiBaseUrl}/recruiter`

    const res = await this.authAxios.get(url)

    this.checkResponseNotOk(res)
    return this.getResponseData<PaginationType<ApplicationType>>(res)
  }

  async createApplication(data: FormData) {
    const res = await this.authAxios.post(this.apiBaseUrl, data)

    this.checkResponseNotOk(res)
    return this.getResponseData<ApplicationType>(res)
  }

  async updateApplicationStatus(
    id: string,
    applicationStatus: ApplicationStatus
  ) {
    const url = `${this.apiBaseUrl}/${id}/applicationStatus`
    const res = await this.authAxios.put(
      url,
      JSON.stringify({ applicationStatus }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<ApplicationType>(res)
  }

  async isSubmitted(postId: string) {
    const params = new URLSearchParams({ postId })
    const url = `${this.apiBaseUrl}/isSubmitted?${params.toString()}`
    const res = await this.authAxios.get(url)

    this.checkResponseNotOk(res)
    return this.getResponseData<boolean>(res)
  }
}

export default new ApplicationService()
