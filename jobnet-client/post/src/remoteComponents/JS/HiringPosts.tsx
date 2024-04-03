import { AiOutlineFileSearch } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'

import usePagination from '../../hooks/usePagination'

import Pagination from 'Common/Pagination'
import EmptyData from 'Common/EmptyData'
import JobItem from 'Common/JobItem'

import postService from '../../services/postService'

import type PostType from '../../types/post'
import type PaginationType from '../../types/pagination'

export default function HiringPost({
  businessId,
  hiringPostsPagination,
}: {
  businessId: string
  hiringPostsPagination: PaginationType<PostType>
}) {
  const { t } = useTranslation()

  const { pagination, setPagination, scrollIntoView, scrollIntoViewRef } =
    usePagination(hiringPostsPagination)

  const handlePageChange = (page: number) => {
    void (async () => {
      const pagination = await postService.getPosts({
        page,
        businessId: businessId,
        activeStatus: 'Opening',
        isExpired: false,
      })
      setPagination(pagination)
      scrollIntoView()
    })()
  }

  const hiringPostsElms = hiringPostsPagination.data.map((post) => {
    return <JobItem key={post.id} data={post} />
  })
  return (
    <div
      ref={scrollIntoViewRef}
      className="mx-auto mt-8 space-y-6 business-mainLayout"
    >
      <div className="item-flex">
        <div className="text-xl font-bold">{t('businessDetail.list')}</div>
        <div className="flex items-center">
          <div className="text-xl">
            <AiOutlineFileSearch />
          </div>
          <div className="ml-2 font-semibold">
            {t('businessDetail.total')}:{' '}
            <span className="text-main">
              {t('businessDetail.count', { count: hiringPostsElms.length })}
            </span>
          </div>
        </div>
      </div>
      {hiringPostsElms.length ? (
        <div className="gap-6 list-post_search">{hiringPostsElms}</div>
      ) : (
        <div className="col-span-2">
          <EmptyData />
        </div>
      )}
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
