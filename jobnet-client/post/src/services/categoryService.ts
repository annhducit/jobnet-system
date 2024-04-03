import CategoryType from '../types/category'
import axios, { AxiosResponse } from 'axios'
import { authAxios } from '../app/axios'
import {checkResponseNotOk, getResponseData} from './baseFetch'

class CategoryService {
  // private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/categories`
  async getCategories(props?: { search?: string }) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/categories`
    const params = new URLSearchParams()
    props?.search && params.append('search', props.search)

    const url = params.toString().length
      ? `${apiBaseUrl}?${params.toString()}`
      : apiBaseUrl
    const res : AxiosResponse = await axios.get(url)

    checkResponseNotOk(res)
    return getResponseData<CategoryType[]>(res)
  }

  async createCategory(name: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/categories`
    const res = await authAxios.post(
      apiBaseUrl,
      JSON.stringify({ name }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<CategoryType>(res)
  }

  async updateCategory(id: string, name: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/categories`
    const res = await authAxios.put(
      `${apiBaseUrl}/${id}`,
      JSON.stringify({ name }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<CategoryType>(res)
  }

  async deleteCategoryById(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/categories`
    const res = await authAxios.delete(`${apiBaseUrl}/${id}`)

    checkResponseNotOk(res)
  }
}

export default new CategoryService()
