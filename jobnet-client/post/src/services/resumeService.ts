import BaseService from './baseService'

import ResumeType from '../types/resume'
import AuthType from '../types/auth'

class ResumeService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`
  private data = JSON.parse(localStorage.getItem('auth') as string) as AuthType

  async getResumesByAuth() {
    const res = this.data ? await this.authAxios.get(this.apiBaseUrl) : null

    if (res) {
      this.checkResponseNotOk(res)
      return this.getResponseData<Array<ResumeType>>(res)
    }
    return null
  }

  async getResumesById(id: string) {
    const res = await this.authAxios.get(`${this.apiBaseUrl}/${id}`)

    this.checkResponseNotOk(res)
    return this.getResponseData<ResumeType>(res)
  }

  async getResumeFile(id: string) {
    const res = await this.authAxios.get(`${this.apiBaseUrl}/${id}/file`, {
      responseType: 'blob',
    })

    this.checkResponseNotOk(res)
    return this.getResponseData<Blob>(res)
  }

  async createResume(formData: FormData) {
    const res = await this.authAxios.post(this.apiBaseUrl, formData)

    this.checkResponseNotOk(res)
    return this.getResponseData<ResumeType>(res)
  }

  async updateResume(id: string, req: object) {
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
    return this.getResponseData<ResumeType>(res)
  }

  async deleteResumeById(id: string) {
    const res = await this.authAxios.delete(`${this.apiBaseUrl}/${id}`)

    this.checkResponseNotOk(res)
  }

  // * Evalution
}

export default new ResumeService()
