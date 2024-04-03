import BaseService from './baseService'

import { GeneratePostType } from '../types/post'
import { postInputs } from '../types/post'

class generateJSService extends BaseService {
  private URL = 'http://127.0.0.1:8090/api/ai/post'

  async generatePost(question: GeneratePostType) {
    const res = await this.axios.post(
      `${this.URL}/generate`,
      JSON.stringify(question),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<postResult>(res)
  }

  async parseJD(formData: FormData) {
    const res = await this.axios.post(`${this.URL}/parseJD`, formData)

    this.checkResponseNotOk(res)
    return this.getResponseData<postResult>(res)
  }
}
type postResult = { content: string; data: postInputs; message: string }
export default new generateJSService()
