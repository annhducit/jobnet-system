import { useEffect, useState } from 'react'
import { FaClock, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaGear } from 'react-icons/fa6'
import clns from 'classnames'
import { useTranslation } from 'react-i18next'

import Input from 'Common/input/Input'
import Button from 'Common/Button'
import Tabs from 'Common/Tabs'
import Dropdown from 'Common/Dropdown'
import EmptyData from 'Common/EmptyData'
import Pagination from 'Common/Pagination'
import { getAuth } from 'Common/auth'
import RCJobItemSkeleton from 'Common/skeleton/RCJobItem'

import postService from '../../services/postService'

import PostType, { PostActiveStatus } from '../../types/post'
import PaginationType from '../../types/pagination'
import ErrorType from '../../types/error'

export default function ManagePosts(): JSX.Element {
  const auth = getAuth()
  const recruiterId = auth.user?.id as string

  const { t } = useTranslation()

  const [criteria, setCriteria] = useState({
    search: '',
    activeStatus: undefined as PostActiveStatus | undefined,
    fromDate: '',
    toDate: '',
  })

  const [postsPagination, setPostsPagination] = useState<
    PaginationType<PostType>
  >({
    totalElements: 0,
    totalPages: 0,
    currentPage: 0,
    hasNextPage: false,
    data: [],
  })

  const [postElms, setPostElms] = useState<JSX.Element[]>(() =>
    Array.from({ length: 3 }, (_, i) => <RCJobItemSkeleton key={i} />)
  )

  useEffect(() => {
    setPostElms(
      postsPagination.data.map((post) => (
        <JobItem
          key={post.id}
          post={post}
          onPostActiveStatusUpdate={handlePostActiveStatusUpdate}
        />
      ))
    )
  }, [postsPagination])

  const handleCriteriaInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setCriteria((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSearchClick = () => {
    void (async () => {
      try {
        const pagination = await postService.getPosts({
          recruiterId,
          ...criteria,
        })
        setPostsPagination(pagination)
      } catch (err) {
        console.error((err as ErrorType).message)
      }
    })()
  }

  const handleTabClick = (activeStatus?: PostActiveStatus) => {
    void (async () => {
      try {
        const pagination = await postService.getPosts({
          recruiterId,
          activeStatus,
        })
        setPostsPagination(pagination)
        setCriteria({
          search: '',
          activeStatus,
          fromDate: '',
          toDate: '',
        })
      } catch (err) {
        console.error((err as ErrorType).message)
      }
    })()
  }

  const handlePageChange = (page: number) => {
    void (async () => {
      try {
        const pagination = await postService.getPosts({
          recruiterId,
          page,
          ...criteria,
        })
        setPostsPagination(pagination)
      } catch (err) {
        console.error((err as ErrorType).message)
      }
    })()
  }

  const handlePostActiveStatusUpdate = (
    postId: string,
    activeStatus: PostActiveStatus
  ) => {
    void (async () => {
      try {
        await postService.updatePostStatus(postId, activeStatus)
        const _pagination = await postService.getPosts({
          recruiterId,
          page: postsPagination.currentPage,
          ...criteria,
        })
        setPostsPagination(_pagination)
        toast.success(t('recruiter.postManagement.action.update.success'))
      } catch (err) {
        toast.error((err as ErrorType).message)
      }
    })()
  }

  return (
    <>
      <div className="justify-between item-parent">
        <div className="items-center item-input ">
          <Input
            id="search"
            name="search"
            label={t('recruiter.postManagement.inputs.search.label')}
            type="text"
            color="main"
            placeholder={t(
              'recruiter.postManagement.inputs.search.placeholder'
            )}
            value={criteria.search}
            onChange={handleCriteriaInputChange}
          />
          <Input
            id="fromDate"
            name="fromDate"
            label={t('recruiter.postManagement.inputs.fromDate.label')}
            type="date"
            color="main"
            value={criteria.fromDate}
            onChange={handleCriteriaInputChange}
          />
          <Input
            id="toDate"
            name="toDate"
            label={t('recruiter.postManagement.inputs.toDate.label')}
            type="date"
            color="main"
            value={criteria.toDate}
            onChange={handleCriteriaInputChange}
          />
        </div>
        <div className="pt-7">
          <Button onClick={handleSearchClick}>
            <FaSearch className="w-4 h-4 mr-2" />
            {t('recruiter.postManagement.button.search')}
          </Button>
        </div>
      </div>
      <Tabs>
        <Tabs.Item
          title={t('recruiter.postManagement.tab.open')}
          onTabClick={() => handleTabClick('Opening')}
        />
        <Tabs.Item
          title={t('recruiter.postManagement.tab.pending')}
          onTabClick={() => handleTabClick('Pending')}
        />
        <Tabs.Item
          title={t('recruiter.postManagement.tab.stop')}
          onTabClick={() => handleTabClick('Stopped')}
        />
        <Tabs.Item title={t('recruiter.postManagement.tab.expire')} />
        <Tabs.Item
          title={t('recruiter.postManagement.tab.all')}
          onTabClick={() => handleTabClick()}
        />
      </Tabs>
      <div className="layout-post_management">
        {postElms.length ? (
          postElms
        ) : (
          <div className="col-span-2">
            <EmptyData />
          </div>
        )}
      </div>
      <Pagination
        currentPage={postsPagination.currentPage}
        totalPages={postsPagination.totalPages}
        onPageChange={handlePageChange}
      />
    </>
  )
}

function JobItem({
  post,
  onPostActiveStatusUpdate,
}: {
  post: PostType
  onPostActiveStatusUpdate: (
    postId: string,
    activeStatus: PostActiveStatus
  ) => void
}): JSX.Element {
  const navigate = useNavigate()

  const { t } = useTranslation()

  return (
    <div className="p-4 space-y-4 rounded-lg bg-white hover:border-main transition-all hover:bg-slate-50 cursor-pointer border border-[color:var(--Gray-100,#E4E5E8)] shadow-sm  border-solid">
      <div className="flex items-baseline justify-between">
        <h2
          className="text-xl font-bold truncate cursor-pointer w-96 hover:text-main"
          onClick={() => navigate(`../../posts/${post.id}`)}
        >
          {post.title}
        </h2>
        <Dropdown
          render={
            <Button size="xs">
              <FaGear className="w-4 h-4 mr-1" />
              {t('recruiter.postManagement.jobItem.button.custom')}
            </Button>
          }
          position="bottomRight"
          width="w-[200px]"
        >
          <Dropdown.Item
            disabled={post.activeStatus === 'Stopped'}
            onItemClick={() => onPostActiveStatusUpdate(post.id, 'Stopped')}
          >
            {t('recruiter.postManagement.jobItem.dropdown.stop')}
          </Dropdown.Item>
          <Dropdown.Item
            disabled={post.activeStatus === 'Opening'}
            onItemClick={() => onPostActiveStatusUpdate(post.id, 'Opening')}
          >
            {t('recruiter.postManagement.jobItem.dropdown.continue')}
          </Dropdown.Item>
        </Dropdown>
      </div>
      <div className="flex items-end justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2 ">
            <div className="font-semibold">
              {t('recruiter.postManagement.jobItem.status')}:
            </div>
            <div
              className={clns('px-2 text-white rounded-lg', {
                'bg-main': post.activeStatus === 'Opening',
                'bg-yellow-500': post.activeStatus === 'Pending',
                'bg-red-500': post.activeStatus === 'Stopped',
              })}
            >
              {post.activeStatus}
            </div>
          </div>
          <div>
            <span className="font-semibold">
              {t('recruiter.postManagement.jobItem.view')}:
            </span>{' '}
            5
          </div>
          <div>
            <span className="font-semibold">
              {t('recruiter.postManagement.jobItem.apply')}:
            </span>{' '}
            5
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <FaClock className="text-main" />
            <p className="text-sm italic text-second-upper">
              <span className="font-semibold">
                {t('recruiter.postManagement.jobItem.createAt')}:{' '}
              </span>
              {post.createdAt}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-main" />
            <p className="text-sm italic text-second-upper">
              <span className="font-semibold">
                {t('recruiter.postManagement.jobItem.applicationDeadline')}::{' '}
              </span>
              {post.applicationDeadline}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
