import BaseService from './baseService'

import ResumeType from '../types/resume'

class ResumeService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`

  async getResumesByAuth() {
    const res = await this.authAxios.get(this.apiBaseUrl)

    this.checkResponseNotOk(res)
    return this.getResponseData<Array<ResumeType>>(res)
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
