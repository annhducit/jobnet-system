import ResumeType from '../types/resume'
import { authAxios } from '../app/axios'
import { checkResponseNotOk, getResponseData } from './baseFetch'
import BaseService from './baseService'
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
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`
    const res = await authAxios.get(`${apiBaseUrl}/${id}`)

    checkResponseNotOk(res)
    return getResponseData<ResumeType>(res)
  }

  async getResumeFile(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`
    const res = await authAxios.get(`${apiBaseUrl}/${id}/file`, {
      responseType: 'blob',
    })

    checkResponseNotOk(res)
    return getResponseData<Blob>(res)
  }

  async createResume(formData: FormData) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`
    const res = await authAxios.post(apiBaseUrl, formData)

    checkResponseNotOk(res)
    return getResponseData<ResumeType>(res)
  }

  async updateResume(id: string, req: object) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`
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
    return getResponseData<ResumeType>(res)
  }

  async deleteResumeById(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`
    const res = await authAxios.delete(`${apiBaseUrl}/${id}`)

    checkResponseNotOk(res)
  }

  // * Evalution
}

export default new ResumeService()
