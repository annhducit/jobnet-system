import axios from 'axios'
import { authAxios } from '../app/axios'
import {checkResponseNotOk, getResponseData} from './baseFetch'

import LevelType from '../types/level'

class LevelService{

  async getLevels(props?: { search?: string }) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/levels`
    const params = new URLSearchParams()
    props?.search && params.append('search', props.search)

    const url = params.toString().length
      ? `${apiBaseUrl}?${params.toString()}`
      : apiBaseUrl

    const res = await axios.get(url)

    checkResponseNotOk(res)
    return getResponseData<LevelType[]>(res)
  }

  async createLevel(req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/levels`
    const res = await authAxios.post(
      apiBaseUrl,
      JSON.stringify(req),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<LevelType>(res)
  }

  async updateLevel(id: string, req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/levels`
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
    return getResponseData<LevelType>(res)
  }

  async deleteLevelById(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/levels`
    const res = await authAxios.delete(`${apiBaseUrl}/${id}`)

    checkResponseNotOk(res)
  }
}

export default new LevelService()
