import { authAxios } from '../app/axios'
import {checkResponseNotOk, getResponseData} from './baseFetch'

import EvaluationType from '../types/evaluation'

class EvaluationService {

  async getEvaluationByResumeId(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`
    const res = await authAxios.get(`${apiBaseUrl}/evaluations/${id}`)

    checkResponseNotOk(res)
    return getResponseData<EvaluationType>(res)
  }

  async getEvaluationByAuth(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`
    const res = await authAxios.get(`${apiBaseUrl}/${id}/evaluations`)

    checkResponseNotOk(res)
    return getResponseData<EvaluationType[]>(res)
  }

  async createEvaluation(id: string, comment: string | undefined) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`
    const res = await authAxios.post(
      `${apiBaseUrl}/${id}/evaluations`,
      JSON.stringify(comment),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<EvaluationType>(res)
  }

  async createComment(id: string, comment: string | undefined) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`
    const res = await authAxios.post(
      `${apiBaseUrl}/evaluations/${id}`,
      JSON.stringify(comment),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<EvaluationType>(res)
  }

  async deleteEvaluation(id: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`
    const res = await authAxios.delete(
      `${apiBaseUrl}/evaluations/${id}`
    )

    checkResponseNotOk(res)
  }

  async deleteComment(evaluationId: string, commentId: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/resumes`
    const res = await authAxios.delete(
      `${apiBaseUrl}/${evaluationId}/evaluations/comments/${commentId}`
    )

    checkResponseNotOk(res)
  }
}

export default new EvaluationService()
