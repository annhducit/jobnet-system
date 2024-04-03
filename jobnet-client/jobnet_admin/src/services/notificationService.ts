import BaseService from './baseService'

import NotificationType from '../types/notification'
import PaginationType from '../types/pagination'

class NotificationService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/notifications`

  async getNotificationsByAuth(props?: { page?: number; pageSize?: number }) {
    const params = new URLSearchParams()
    props?.page && params.append('page', props.page.toString())
    props?.pageSize && params.append('pageSize', props.pageSize.toString())

    const url = params.toString().length
      ? `${this.apiBaseUrl}?${params.toString()}`
      : this.apiBaseUrl

    const res = await this.authAxios.get(url)

    this.checkResponseNotOk(res)
    return this.getResponseData<PaginationType<NotificationType>>(res)
  }
}

export default new NotificationService()
