import PaginationType from '../types/pagination'
import RecruiterType, { FormUpdateProfileRCProps } from '../types/recruiter'
import axios from 'axios'
import { authAxios } from '../app/axios'

import { checkResponseNotOk, getResponseData } from './baseFetch'

class RecruiterService {
  async getRecruiters(props?: {
    page?: number
    pageSize?: number
    sortBy?: string[]
    email?: string
    name?: string
    phone?: string
    business?: string
  }) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/recruiters`
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
      ? `${apiBaseUrl}?${params.toString()}`
      : apiBaseUrl
    const res = await axios.get(url)

    checkResponseNotOk(res)
    return getResponseData<PaginationType<RecruiterType>>(res)
  }

  async getRecruiterById(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/recruiters`
    const res = await axios.get(`${apiBaseUrl}/${id}/raw`)

    checkResponseNotOk(res)
    return getResponseData<RecruiterType>(res)
  }

  async updateRecruiterProfile(
    id: string | undefined,
    data: FormUpdateProfileRCProps
  ) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/recruiters`
    const res = await authAxios.put(
      `${apiBaseUrl}/${id}/profile`,
      JSON.stringify(data),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<RecruiterType>(res)
  }

  getRecruiterProfileImage(id: string | undefined) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/recruiters`
    const url = `${apiBaseUrl}/${id}/profileImage`
    return url
  }

  async uploadRecruiterProfileImage(recruiterId: string, formData: FormData) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/recruiters`
    const url = `${apiBaseUrl}/${recruiterId}/profileImage`
    const res = await authAxios.post(url, formData)

    checkResponseNotOk(res)
    return getResponseData<RecruiterType>(res)
  }

  async deleteRecruiterById(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/recruiters`
    const res = await authAxios.delete(`${apiBaseUrl}/${id}`)

    checkResponseNotOk(res)
  }

  async openDeleteRecruiterById(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/recruiters`
    const res = await authAxios.delete(`${apiBaseUrl}/${id}/open`)

    checkResponseNotOk(res)
  }
}

export default new RecruiterService()
