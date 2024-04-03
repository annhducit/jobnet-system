import type BenefitType from '../types/benefit'
import axios from 'axios'
import { authAxios } from '../app/axios'
import {checkResponseNotOk, getResponseData} from './baseFetch'

class BenefitService {
  async getBenefits(props?: { search?: string }) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/benefits`
    const params = new URLSearchParams()
    props?.search && params.append('search', props.search)

    const url = params.toString().length
      ? `${apiBaseUrl}?${params.toString()}`
      : apiBaseUrl
    const res = await axios.get(url)

    checkResponseNotOk(res)
    return getResponseData<BenefitType[]>(res)
  }

  async createBenefit(req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/benefits`
    const res = await authAxios.post(apiBaseUrl, JSON.stringify(req), {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    checkResponseNotOk(res)
    return getResponseData<BenefitType>(res)
  }

  async updateBenefit(id: string, req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/benefits`
    const res = await authAxios.put(
      `${apiBaseUrl}/${id}`,
      JSON.stringify(req),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<BenefitType>(res)
  }

  async deleteBenefitById(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/benefits`
    const res = await authAxios.delete(`${apiBaseUrl}/${id}`)

    checkResponseNotOk(res)
  }
}

export default new BenefitService()
