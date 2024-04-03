import axios from 'axios'
import {checkResponseNotOk, getResponseData} from './baseFetch'

import { GeneratePostType } from '../types/post'
import { postInputs } from '../types/post'

class generateJSService {

  async generatePost(question: GeneratePostType) {
    const URL= 'http://127.0.0.1:8090/api/ai/post'
    const res = await axios.post(
      `${URL}/generate`,
      JSON.stringify(question),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<postResult>(res)
  }

  async parseJD(formData: FormData) {
    const URL= 'http://127.0.0.1:8090/api/ai/post'
    const res = await axios.post(`${URL}/parseJD`, formData)

    checkResponseNotOk(res)
    return getResponseData<postResult>(res)
  }
}
type postResult = { content: string; data: postInputs; message: string }
export default new generateJSService()
