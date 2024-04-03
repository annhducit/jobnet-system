import BaseService from './baseService'

import CategoryType from '../types/category'

class CategoryService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/categories`

  async getCategories(props?: { search?: string }) {
    const params = new URLSearchParams()
    props?.search && params.append('search', props.search)

    const url = params.toString().length
      ? `${this.apiBaseUrl}?${params.toString()}`
      : this.apiBaseUrl
    const res = await this.axios.get(url)

    this.checkResponseNotOk(res)
    return this.getResponseData<CategoryType[]>(res)
  }

  async createCategory(name: string) {
    const res = await this.authAxios.post(
      this.apiBaseUrl,
      JSON.stringify({ name }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<CategoryType>(res)
  }

  async updateCategory(id: string, name: string) {
    const res = await this.authAxios.put(
      `${this.apiBaseUrl}/${id}`,
      JSON.stringify({ name }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<CategoryType>(res)
  }

  async deleteCategoryById(id: string) {
    const res = await this.authAxios.delete(`${this.apiBaseUrl}/${id}`)

    this.checkResponseNotOk(res)
  }
}

export default new CategoryService()
