import axios, { AxiosResponse } from 'axios'
import { authAxios } from '../app/axios'

import ErrorType from '../types/error'

class BaseService {
  protected axios = axios
  protected authAxios = authAxios

  protected checkResponseNotOk(res: AxiosResponse) {
    if (res.status < 200 || res.status >= 300) {
      throw res.data as ErrorType
    }
  }

  protected getResponseData<T>(res: AxiosResponse) {
    return res.data as T
  }
}

export default BaseService
