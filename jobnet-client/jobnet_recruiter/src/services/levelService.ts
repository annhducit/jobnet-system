import BaseService from './baseService'

import LevelType from '../types/level'

class LevelService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/levels`

  async getLevels(props?: { search?: string }) {
    const params = new URLSearchParams()
    props?.search && params.append('search', props.search)

    const url = params.toString().length
      ? `${this.apiBaseUrl}?${params.toString()}`
      : this.apiBaseUrl

    const res = await this.axios.get(url)

    this.checkResponseNotOk(res)
    return this.getResponseData<LevelType[]>(res)
  }

  async createLevel(req: object) {
    const res = await this.authAxios.post(
      this.apiBaseUrl,
      JSON.stringify(req),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<LevelType>(res)
  }

  async updateLevel(id: string, req: object) {
    const res = await this.authAxios.put(
      `${this.apiBaseUrl}/${id}`,
      JSON.stringify(req),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<LevelType>(res)
  }

  async deleteLevelById(id: string) {
    const res = await this.authAxios.delete(`${this.apiBaseUrl}/${id}`)

    this.checkResponseNotOk(res)
  }
}

export default new LevelService()
