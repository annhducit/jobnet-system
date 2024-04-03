import NotificationType from '../types/notification'
import PaginationType from '../types/pagination'
import { authAxios } from '../app/axios'
import { checkResponseNotOk, getResponseData } from './baseFetch'
export interface Notification {
  title: string
  status: boolean
}
const notifications: Notification[] = [
  { title: 'Nhà tuyển dụng NetCompany đã xem hồ sơ của bạn', status: false },
  { title: 'Nhà tuyển dụng Bstart đã xem hồ sơ của bạn', status: false },
]
class NotificationService {
  getNotificationsByAuthTemp(){
    return notifications
  }
  async getNotificationsByAuth(props?: { page?: number; pageSize?: number }) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/notifications`
    const params = new URLSearchParams()
    props?.page && params.append('page', props.page.toString())
    props?.pageSize && params.append('pageSize', props.pageSize.toString())

    const url = params.toString().length
      ? `${apiBaseUrl}?${params.toString()}`
      : apiBaseUrl

    const res = await authAxios.get(url)

    checkResponseNotOk(res)
    return getResponseData<PaginationType<NotificationType>>(res)
  }
}

export default new NotificationService()
