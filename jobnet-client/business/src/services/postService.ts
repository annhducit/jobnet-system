//review: import không được
// import { format } from 'date-fns'

import BaseService from './baseService'

import PostType, { PostActiveStatus } from '../types/post'
import PaginationType from '../types/pagination'

class PostService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/posts`

  async getPosts(props?: {
    page?: number
    pageSize?: number
    sortBy?: string[]
    search?: string
    categoryId?: string
    professionId?: string
    minSalary?: number
    maxSalary?: number
    provinceCode?: number
    workingFormat?: string
    recruiterId?: string
    businessId?: string
    activeStatus?: string
    fromDate?: string
    toDate?: string
    isExpired?: boolean | string
  }) {
    const params = new URLSearchParams()
    props?.page && params.append('page', props.page.toString())
    props?.pageSize && params.append('pageSize', props.pageSize.toString())
    props?.sortBy &&
      props.sortBy.map((element) => params.append('sortBy', element))
    props?.search && params.append('search', props.search)
    props?.categoryId && params.append('categoryId', props.categoryId)
    props?.professionId && params.append('professionId', props.professionId)
    props?.minSalary && params.append('minSalary', props.minSalary.toString())
    props?.maxSalary && params.append('maxSalary', props.maxSalary.toString())
    props?.provinceCode &&
      params.append('provinceCode', props.provinceCode.toString())
    props?.workingFormat && params.append('workingFormat', props.workingFormat)
    props?.recruiterId && params.append('recruiterId', props.recruiterId)
    props?.businessId && params.append('businessId', props.businessId)
    props?.activeStatus && params.append('activeStatus', props.activeStatus)
    //review: import ko được 'date-fns'
    // props?.fromDate &&
    //   params.append('fromDate', format(new Date(props.fromDate), 'dd/MM/yyyy'))
    // props?.toDate &&
    //   params.append('toDate', format(new Date(props.toDate), 'dd/MM/yyyy'))
    props?.isExpired && params.append('isExpired', props.isExpired.toString())

    const url = params.toString().length
      ? `${this.apiBaseUrl}?${params.toString()}`
      : this.apiBaseUrl

    const res = await this.axios.get(url)

    this.checkResponseNotOk(res)
    return this.getResponseData<PaginationType<PostType>>(res)
  }

  async getPostById(id: string) {
    const res = await this.axios.get(`${this.apiBaseUrl}/${id}`)

    this.checkResponseNotOk(res)
    return this.getResponseData<PostType>(res)
  }

  async createPost(req: FormData) {
    const res = await this.authAxios.post(this.apiBaseUrl, req)

    this.checkResponseNotOk(res)
    return this.getResponseData<PostType>(res)
  }

  async updatePostHeadingInfo(id: string, req: object) {
    const url = `${this.apiBaseUrl}/${id}/headingInfo`
    return this.updatePost(url, req)
  }

  async updatePostGeneralInfo(id: string, req: object) {
    const url = `${this.apiBaseUrl}/${id}/generalInfo`
    return this.updatePost(url, req)
  }

  async updatePostDetailedInfo(id: string, req: object) {
    const url = `${this.apiBaseUrl}/${id}/detailedInfo`
    return this.updatePost(url, req)
  }

  async updatePostStatus(id: string, activeStatus: PostActiveStatus) {
    const url = `${this.apiBaseUrl}/${id}/status`
    return this.updatePost(url, { activeStatus })
  }

  private async updatePost(url: string, req: object) {
    const res = await this.authAxios.put(url, JSON.stringify(req), {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.checkResponseNotOk(res)
    return this.getResponseData<PostType>(res)
  }
}

export default new PostService()
