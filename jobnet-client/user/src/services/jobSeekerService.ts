import JobSeekerType from '../types/jobSeeker'
import PaginationType from '../types/pagination'

import { checkResponseNotOk, getResponseData } from './baseFetch'

import { authAxios } from '../app/axios'
import axios from 'axios'

class JobSeekerService {
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
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/jobSeekers`
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
      ? `${apiBaseUrl}?${params.toString()}`
      : apiBaseUrl
    const res = await axios.get(url)

    checkResponseNotOk(res)
    return getResponseData<PaginationType<JobSeekerType>>(res)
  }

  async getJobSeekerById(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/jobSeekers`
    const res = await axios.get(`${apiBaseUrl}/${id}`)

    checkResponseNotOk(res)
    return getResponseData<JobSeekerType>(res)
  }

  async updateJobSeekerPersonalInfo(id: string, req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/jobSeekers`
    const url = `${apiBaseUrl}/${id}/personalInfo`

    return this.updateJobSeekerInfo(url, req)
  }

  async updateJobSeekerProfessionInfo(id: string, req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/jobSeekers`
    const url = `${apiBaseUrl}/${id}/professionInfo`

    return this.updateJobSeekerInfo(url, req)
  }

  private async updateJobSeekerInfo(url: string, req: object) {
    const res = await authAxios.put(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(req),
    })

    checkResponseNotOk(res)
    return getResponseData<JobSeekerType>(res)
  }

  async deleteJobSeekerById(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/jobSeekers`
    const res = await authAxios.delete(`${apiBaseUrl}/${id}`)
    checkResponseNotOk(res)
  }

  async openDeleteJobSeekerById(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/jobSeekers`
    const res = await authAxios.delete(`${apiBaseUrl}/${id}/open`)
    checkResponseNotOk(res)
  }

  getJobSeekerProfileImage(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/jobSeekers`
    const url = `${apiBaseUrl}/${id}/profileImage`
    return url
  }

  async uploadJobSeekerProfileImage(id: string, formData: FormData) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/jobSeekers`
    const url = `${apiBaseUrl}/${id}/profileImage`
    const res = await authAxios.post(url, formData)

    checkResponseNotOk(res)
    return getResponseData<JobSeekerType>(res)
  }

  async updateJobSeekerBusinessFollowed(id: string, req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/jobSeekers`
    const url = `${apiBaseUrl}/${id}/follow`
    const res = await authAxios.put(url, JSON.stringify(req), {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    checkResponseNotOk(res)
    return getResponseData<JobSeekerType>(res)
  }
}

export default new JobSeekerService()
