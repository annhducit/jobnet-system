import BaseService from './baseService'

import PaginationType from '../types/pagination'
import WishlistType from '../types/wishlist'

class WishlistService extends BaseService {
  private apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/wishlists`

  async getWishlists(props: {
    page?: number
    pageSize?: number
    sortBy?: string
  }) {
    const params = new URLSearchParams()
    props.page && params.append('page', props.page.toString())
    props.pageSize && params.append('pageSize', props.pageSize.toString())
    props?.sortBy && params.append('sortBy', props.sortBy)

    const url = params.toString().length
      ? `${this.apiBaseUrl}?${params.toString()}`
      : this.apiBaseUrl

    const res = await this.authAxios.get(url)

    this.checkResponseNotOk(res)
    return this.getResponseData<PaginationType<WishlistType>>(res)
  }

  async existsWishlist(postId: string) {
    const params = new URLSearchParams()
    params.append('postId', postId)

    const url = `${this.apiBaseUrl}/exists?${params.toString()}`
    const res = await this.authAxios.get(url)

    this.checkResponseNotOk(res)
    return this.getResponseData<boolean>(res)
  }

  async createWishlist(postId: string) {
    const res = await this.authAxios.post(
      this.apiBaseUrl,
      JSON.stringify(postId),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    this.checkResponseNotOk(res)
    return this.getResponseData<WishlistType>(res)
  }

  async deleteWishlist(postId: string) {
    const res = await this.authAxios.delete(this.apiBaseUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(postId),
    })

    this.checkResponseNotOk(res)
  }
}

export default new WishlistService()
