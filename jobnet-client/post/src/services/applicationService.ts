import { authAxios } from '../app/axios'
import { checkResponseNotOk, getResponseData } from './baseFetch'

import ApplicationType, { ApplicationStatus } from '../types/application'
import PaginationType from '../types/pagination'
import BaseService from './baseService'

class ApplicationService extends BaseService {
  async getApplications(props?: {
    jobSeekerId?: string | undefined
    page?: number
    pageSize?: number
    status?: ApplicationStatus
  }) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/applications`
    const params = new URLSearchParams()
    props?.jobSeekerId && params.append('jobSeekerId', props.jobSeekerId)
    props?.page && params.append('page', props.page.toString())
    props?.pageSize && params.append('pageSize', props.pageSize.toString())
    props?.status && params.append('status', props.status)

    const url = params.toString().length
      ? `${apiBaseUrl}?${params.toString()}`
      : apiBaseUrl
    const res = await authAxios.get(url)
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
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/applications`
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
      ? `${apiBaseUrl}/recruiter?${params.toString()}`
      : `${apiBaseUrl}/recruiter`

    const res = await authAxios.get(url)

    checkResponseNotOk(res)
    return getResponseData<PaginationType<ApplicationType>>(res)
  }

  async createApplication(data: FormData) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/applications`
    const contentType = 'application/json'
    const res = await authAxios.post(apiBaseUrl, data, {
      headers: { 'Content-Type': contentType },
    })

    this.checkResponseNotOk(res)
    return this.getResponseData<ApplicationType>(res)
  }

  async updateApplicationStatus(
    id: string,
    applicationStatus: ApplicationStatus
  ) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/applications`
    const url = `${apiBaseUrl}/${id}/applicationStatus`
    const res = await authAxios.put(
      url,
      JSON.stringify({ applicationStatus }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<ApplicationType>(res)
  }

  async isSubmitted(postId: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/applications`
    const params = new URLSearchParams({ postId })
    const url = `${apiBaseUrl}/isSubmitted?${params.toString()}`
    const res = await authAxios.get(url)

    checkResponseNotOk(res)
    return getResponseData<boolean>(res)
  }
}

export default new ApplicationService()
