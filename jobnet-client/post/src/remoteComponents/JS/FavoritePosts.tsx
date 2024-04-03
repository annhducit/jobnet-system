import { useState } from 'react'
import { AiOutlineFileSearch } from 'react-icons/ai'
import { differenceInDays } from 'date-fns'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'

import mainProfile from '../../assets/images/business-main-profile.png'

import Pagination from 'Common/Pagination'
import Button from 'Common/Button'
import Tag from 'Common/Tag'
import SelectChangeEvent from 'Common/type/SelectChangeEvent'
import Selection from 'Common/input/Selection'
import EmptyData from 'Common/EmptyData'
import { setLoad } from 'Common/setLoad'

import wishlistService from '../../services/wishlistService'

import usePagination from '../../hooks/usePagination'
import type PostType from '../../types/post'
import type ErrorType from '../../types/error'
import PaginationType from '../../types/pagination'
import WishlistType from '../../types/wishlist'

export default function FavoritePosts({
  wishlistPagination,
}: {
  wishlistPagination: PaginationType<WishlistType>
}): React.ReactElement {
  const { t } = useTranslation()
  console.log(wishlistPagination)

  const { pagination, setPagination, scrollIntoView, scrollIntoViewRef } =
    usePagination(wishlistPagination)

  const [sortBy, setSortBy] = useState('createdAt-desc')

  const handlePageChange = (page: number) => {
    void (async () => {
      setLoad(true)

      try {
        const pagination = await wishlistService.getWishlists({ page })
        setPagination(pagination)
        scrollIntoView()
      } catch (err) {
        console.error('An error occured.')
      } finally {
        setLoad(false)
      }
    })()
  }

  const handleSortByChange = (e: SelectChangeEvent) => {
    const sortBy = e.target.value
    void (async () => {
      setLoad(true)

      try {
        const pagination = await wishlistService.getWishlists({
          sortBy,
        })
        setPagination(pagination)
        setSortBy(sortBy)
      } catch (err) {
        console.error('An error occured.')
      } finally {
        setLoad(false)
      }
    })()
  }

  const handleDeleteWishlist = async (postId: string) => {
    setLoad(true)

    try {
      await wishlistService.deleteWishlist(postId)
      const pagination = await wishlistService.getWishlists({})
      setPagination(pagination)
      toast.success(t('toast.post.save.unsave'))
    } catch (err) {
      toast.error((err as ErrorType).message)
    } finally {
      setLoad(false)
    }
  }

  const favoriteJobsElms: JSX.Element[] = pagination.data.map((wishlist) => (
    <FavoriteJob
      key={wishlist.id}
      post={wishlist.post}
      handleDeleteWishlist={handleDeleteWishlist}
    />
  ))

  return (
    <main ref={scrollIntoViewRef}>
      <div className="flex flex-col gap-y-6">
        <div className="justify-between favorite-first_line">
          <h1 className="text-xl font-bold leading-none">
            {t('favoritePost.header.title')}
          </h1>
          <div className="flex items-baseline gap-4">
            <label className="font-semibold" htmlFor="sortBy">
              {t('favoritePost.filter.sort.title')}:
            </label>
            <Selection
              id="sortBy"
              name="sortBy"
              className="w-40"
              options={[
                {
                  id: 'createdAt-desc',
                  name: t('favoritePost.filter.sort.recent'),
                },
                {
                  id: 'salary-desc',
                  name: t('favoritePost.filter.sort.topSalary'),
                },
              ]}
              value={sortBy}
              onSelectChange={handleSortByChange}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center">
            <div className="text-2xl">
              <AiOutlineFileSearch />
            </div>
            <div className="flex items-center justify-between">
              <div className="ml-2 font-semibold">
                {t('favoritePost.filter.title')}:{' '}
                <span className="underline text-main">
                  {t('favoritePost.filter.totalResult', {
                    total: pagination.totalElements,
                  })}
                </span>
              </div>
            </div>
          </div>

          {favoriteJobsElms.length ? (
            <div className="gap-2 mt-5 list-post_search ">
              {favoriteJobsElms}
            </div>
          ) : (
            <EmptyData />
          )}

          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  )
}

function FavoriteJob({
  post,
  handleDeleteWishlist,
}: {
  post: PostType
  handleDeleteWishlist: (postId: string) => Promise<void>
}): React.ReactElement {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const remainingApplicationDays = differenceInDays(
    new Date(post.applicationDeadline),
    new Date()
  )
  return (
    <div className="px-4 py-6 space-y-6 items-stretch hover:border-main transition-all hover:bg-slate-50 cursor-pointer border border-[color:var(--Gray-100,#E4E5E8)] shadow-sm bg-white flex flex-col p-4 rounded-lg border-solid">
      <div className="flex items-center gap-4 favorite-first_line">
        <img
          loading="lazy"
          className="w-14 h-14"
          src={`http://localhost:3012${mainProfile}`}
        />
        <div className="flex flex-col p-2 gap-y-2">
          <div className="favorite-job_page">
            <Link
              to={`/posts/${post.id}`}
              className="text-lg font-bold truncate favorite-title hover:text-main hover:underline"
            >
              {post.title}
            </Link>
            <span className="font-semibold">
              {post.minSalaryString} - {post.maxSalaryString}
            </span>
          </div>
          <div className="truncate business-name">
            <Link
              to={`/businesses/${post.business.id}`}
              className="hover:text-main w-[420px] truncate"
              preventScrollReset={true}
            >
              {post.business.name}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-start gap-2">
        <Tag>Quận 7, Tp HCM</Tag>
        <Tag>Mới</Tag>

        <Tag>Còn {remainingApplicationDays | 20} ngày để ứng tuyển</Tag>
      </div>
      <div className="items-center justify-between gap-2 favorite-job_page">
        <div className="text-sm italic update-at">
          {t('favoritePost.post.updatedAt')}: 06/07/2023
        </div>
        <div className="flex items-center gap-2 button-both">
          <Button
            onClick={() => navigate(`/posts/${post.id}`)}
            size="sm"
            className="rounded"
          >
            {t('favoritePost.post.button.detail')}
          </Button>
          <Button
            color="red"
            size="sm"
            onClick={() => void handleDeleteWishlist(post.id)}
            className="rounded"
          >
            {t('favoritePost.post.button.cancel')}
          </Button>
        </div>
      </div>
    </div>
  )
}
