import { useLoaderData } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useTitlePage from '../hooks/useTitlePage'

import WishlistType, { getWishlists } from 'Post/Wishlist'
import Favorite from 'Post/FavoritePosts'

import { requireAuth } from '../utils/auth'
import type PaginationType from '../types/pagination'

interface FavoritePostsLoader {
  pagination: PaginationType<WishlistType>
}

FavoritePosts.loader = async function ({
  request,
}: {
  request: Request
}): Promise<FavoritePostsLoader> {
  requireAuth(request, 'JobSeeker')

  const pagination = await getWishlists({})
  return { pagination }
}

export default function FavoritePosts(): React.ReactElement {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.favorite'))
  const loader = useLoaderData() as FavoritePostsLoader
  console.log(loader.pagination)
  return (
    <>
      <Favorite wishlistPagination={loader.pagination} />
    </>
  )
}
