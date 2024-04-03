import { AxiosResponse } from 'axios'
import ErrorType from '../types/error'

function checkResponseNotOk(res: AxiosResponse) {
    if (res.status < 200 || res.status >= 300) {
      throw res.data as ErrorType
    }
  }

function getResponseData<T>(res: AxiosResponse): T {
    return res.data as T;
  }

export {checkResponseNotOk, getResponseData}