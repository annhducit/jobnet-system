import axios from 'axios'
import { authAxios } from '../app/axios'
import {checkResponseNotOk, getResponseData} from './baseFetch'

import BusinessType, { EBusinessStatus } from '../types/business'
import PaginationType from '../types/pagination'


class BusinessService {

  async getBusinesses(props?: {
    page?: number
    pageSize?: number
    sortBy?: string[]
    name?: string
    phone?: string
    status?: string
    isDeleted?: boolean | string
  }) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const params = new URLSearchParams()
    props?.page && params.append('page', props.page.toString())
    props?.pageSize && params.append('pageSize', props.pageSize.toString())
    props?.name && params.append('name', props.name)
    props?.phone && params.append('phone', props.phone)
    props?.status && params.append('status', props.status)
    props?.isDeleted && params.append('isDeleted', props.isDeleted.toString())

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
    return getResponseData<PaginationType<BusinessType>>(res)
  }

  async getBusinessById(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const res = await axios.get(`${apiBaseUrl}/${id}`)

    checkResponseNotOk(res)
    return getResponseData<BusinessType>(res)
  }

  async updateBusinessGeneralInfo(id: string, req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const url = `${apiBaseUrl}/${id}/generalInfo`
    return this.updateBusinessInfo(url, req)
  }

  async updateBusinessIntroductionInfo(id: string, req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const url = `${apiBaseUrl}/${id}/introductionInfo`
    return this.updateBusinessInfo(url, req)
  }

  async updateBusinessContactInfo(id: string, req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const url = `${apiBaseUrl}/${id}/contactInfo`
    return this.updateBusinessInfo(url, req)
  }

  async updateBusinessStatus(id: string, status: EBusinessStatus) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const url = `${apiBaseUrl}/${id}/status`
    return this.updateBusinessInfo(url, { status })
  }

  private async updateBusinessInfo(url: string, req: object) {
    const res = await authAxios.put(url, JSON.stringify(req), {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    checkResponseNotOk(res)
    return getResponseData<BusinessType>(res)
  }

  async deleteBusinessById(id: string | undefined) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const res = await authAxios.delete(`${apiBaseUrl}/${id}`)

    checkResponseNotOk(res)
  }

  async openDeleteBusinessById(id: string | undefined) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const res = await authAxios.delete(`${apiBaseUrl}/${id}/open`)

    checkResponseNotOk(res)
  }

  getBusinessProfileImage(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const url = `${apiBaseUrl}/${id}/profileImage`
    return url
  }

  async uploadBusinessProfileImage(id: string, formData: FormData) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const url = `${apiBaseUrl}/${id}/profileImage`
    const res = await authAxios.post(url, formData)

    checkResponseNotOk(res)
    return getResponseData<BusinessType>(res)

  }

  getBusinessBackgroundImage(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const url = `${apiBaseUrl}/${id}/backgroundImage`
    return url
  }

  async uploadBusinessBackgroundImage(id: string, formData: FormData) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const url = `${apiBaseUrl}/${id}/backgroundImage`
    const res = await authAxios.post(url, formData)

    checkResponseNotOk(res)
    return getResponseData<BusinessType>(res)
  }

  async updateBusinessFollowers(id: string, req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/businesses`
    const url = `${apiBaseUrl}/${id}/follow`
    const res = await authAxios.put(url, JSON.stringify(req), {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    checkResponseNotOk(res)
    return getResponseData<BusinessType>(res)
  }
}

export default new BusinessService()
