import axios from 'axios'
import { authAxios } from '../app/axios'
import {checkResponseNotOk, getResponseData} from './baseFetch'

import ProfessionType from '../types/profession'

class ProfessionService{

  async getProfessions(props?: { search?: string; categoryId?: string }) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/professions`
    const params = new URLSearchParams()
    props?.search && params.append('search', props.search)
    props?.categoryId && params.append('categoryId', props.categoryId)

    const url = params.toString().length
      ? `${apiBaseUrl}?${params.toString()}`
      : apiBaseUrl
    const res = await axios.get(url)

    checkResponseNotOk(res)
    return getResponseData<Array<ProfessionType>>(res)
  }

  async createProfession(name: string, category: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/professions`
    const res = await authAxios.post(
      apiBaseUrl,
      JSON.stringify({ name, categoryId: category }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<ProfessionType>(res)
  }

  async updateProfession(id: number, name: string, category: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/professions`
    const res = await authAxios.put(
      `${apiBaseUrl}/${id}`,
      JSON.stringify({ name: name, categoryId: category }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<ProfessionType>(res)
  }

  async deleteProfessionById(id: number) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/professions`
    const res = await authAxios.delete(`${apiBaseUrl}/${id}`)
    checkResponseNotOk(res)
  }
}

export default new ProfessionService()
