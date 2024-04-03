import PaginationType from '../types/pagination'
import { authAxios } from '../app/axios'

import ApplicationType from 'Post/Application'

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
    console.log(res)

    this.checkResponseNotOk(res)
    return this.getResponseData<PaginationType<ApplicationType>>(res)
  }
}

export default new ApplicationService()
