import BaseService from './baseService'

import ProfessionType from '../types/profession'

class ProfessionService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/professions`

  async getProfessions(props?: { search?: string; categoryId?: string }) {
    const params = new URLSearchParams()
    props?.search && params.append('search', props.search)
    props?.categoryId && params.append('categoryId', props.categoryId)

    const url = params.toString().length
      ? `${this.apiBaseUrl}?${params.toString()}`
      : this.apiBaseUrl
    const res = await this.axios.get(url)

    this.checkResponseNotOk(res)
    return this.getResponseData<Array<ProfessionType>>(res)
  }

  async createProfession(name: string, category: string) {
    const res = await this.authAxios.post(
      this.apiBaseUrl,
      JSON.stringify({ name, categoryId: category }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<ProfessionType>(res)
  }

  async updateProfession(id: number, name: string, category: string) {
    const res = await this.authAxios.put(
      `${this.apiBaseUrl}/${id}`,
      JSON.stringify({ name: name, categoryId: category }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<ProfessionType>(res)
  }

  async deleteProfessionById(id: number) {
    const res = await this.authAxios.delete(`${this.apiBaseUrl}/${id}`)
    this.checkResponseNotOk(res)
  }
}

export default new ProfessionService()
