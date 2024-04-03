import BaseService from './baseService'

import EvaluationType from '../types/evaluation'

class EvaluationService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`

  async getEvaluationByResumeId(id: string) {
    const res = await this.authAxios.get(`${this.apiBaseUrl}/evaluations/${id}`)

    this.checkResponseNotOk(res)
    return this.getResponseData<EvaluationType>(res)
  }

  async getEvaluationByAuth(id: string) {
    const res = await this.authAxios.get(`${this.apiBaseUrl}/${id}/evaluations`)

    this.checkResponseNotOk(res)
    return this.getResponseData<EvaluationType[]>(res)
  }

  async createEvaluation(id: string, comment: string | undefined) {
    const res = await this.authAxios.post(
      `${this.apiBaseUrl}/${id}/evaluations`,
      JSON.stringify(comment),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<EvaluationType>(res)
  }

  async createComment(id: string, comment: string | undefined) {
    const res = await this.authAxios.post(
      `${this.apiBaseUrl}/evaluations/${id}`,
      JSON.stringify(comment),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<EvaluationType>(res)
  }

  async deleteEvaluation(id: string) {
    const res = await this.authAxios.delete(
      `${this.apiBaseUrl}/evaluations/${id}`
    )

    this.checkResponseNotOk(res)
  }

  async deleteComment(evaluationId: string, commentId: string) {
    const res = await this.authAxios.delete(
      `${this.apiBaseUrl}/${evaluationId}/evaluations/comments/${commentId}`
    )

    this.checkResponseNotOk(res)
  }
}

export default new EvaluationService()
