import { authAxios } from '../app/axios'
import {checkResponseNotOk, getResponseData} from './baseFetch'

import PaginationType from '../types/pagination'
import WishlistType from '../types/wishlist'

class WishlistService  {

  async getWishlists(props: {
    page?: number
    pageSize?: number
    sortBy?: string
  }) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/wishlists`
    const params = new URLSearchParams()
    props.page && params.append('page', props.page.toString())
    props.pageSize && params.append('pageSize', props.pageSize.toString())
    props?.sortBy && params.append('sortBy', props.sortBy)

    const url = params.toString().length
      ? `${apiBaseUrl}?${params.toString()}`
      : apiBaseUrl

    const res = await authAxios.get(url)

    checkResponseNotOk(res)
    return getResponseData<PaginationType<WishlistType>>(res)
  }

  async existsWishlist(postId: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/wishlists`
    const params = new URLSearchParams()
    params.append('postId', postId)

    const url = `${apiBaseUrl}/exists?${params.toString()}`
    const res = await authAxios.get(url)

    checkResponseNotOk(res)
    return getResponseData<boolean>(res)
  }

  async createWishlist(postId: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/wishlists`
    const res = await authAxios.post(
      apiBaseUrl,
      JSON.stringify(postId),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    checkResponseNotOk(res)
    return getResponseData<WishlistType>(res)
  }

  async deleteWishlist(postId: string) {
    const apiBaseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/wishlists`
    const res = await authAxios.delete(apiBaseUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(postId),
    })

    checkResponseNotOk(res)
  }
}

export default new WishlistService()
