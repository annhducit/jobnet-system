import { useLoaderData } from 'react-router-dom'
import { FaBell } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import useTitlePage from '../hooks/useTitlePage'
import usePagination from '../hooks/usePagination'

import vite from '/vite.svg'

import Pagination from 'Common/Pagination'

import notificationService from 'User/Noftification'

import { requireAuth } from '../utils/auth'
import type NotificationType from '../types/notification'
import type PaginationType from '../types/pagination'

interface NotificationsLoader {
  pagination: PaginationType<NotificationType>
}
Notifications.loader = async function ({
  request,
}: {
  request: Request
}): Promise<NotificationsLoader> {
  requireAuth(request, 'JobSeeker')

  //review: ko có phương thức notificationService.getNotificationsOfJobSeeker
  // const jobSeekerEmail = store.getState().auth.user?.email as string
  // const pagination = await notificationService.getNotificationsOfJobSeeker({
  //   email: jobSeekerEmail,
  // })
  //để tạm trước khi review
  const pagination = await notificationService.getNotificationsByAuth({})
  return { pagination }
}

export default function Notifications(): JSX.Element {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.notification'))
  const loader = useLoaderData() as NotificationsLoader

  const { pagination, setPagination, scrollIntoView, scrollIntoViewRef } =
    usePagination(loader.pagination)

  const notificationElms = pagination.data.map((notification) => (
    <Notification data={notification} />
  ))

  const handlePageChange = (page: number) => {
    void (async () => {
      const pagination = await notificationService.getNotificationsByAuth({
        page,
      })
      setPagination(pagination)
      scrollIntoView()
    })()
  }

  return (
    <div ref={scrollIntoViewRef}>
      <div className="flex items-center text-2xl font-bold">
        <div>
          <FaBell />
        </div>
        <h4 className="ml-4">Thông báo</h4>
      </div>
      <div className="mt-6 space-y-2">
        {notificationElms}
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  )
}

function Notification({ data }: { data: NotificationType }): JSX.Element {
  return (
    <div className="flex flex-col items-center border-l-4 rounded sm:flex-row bg-second-lower hover:bg-second-lower border-main-lower">
      <div className="p-4">
        <img src={vite} className="h-16 border-2 rounded-full border-second" />
      </div>
      <div className="flex flex-col justify-between w-full p-4 sm:w-max grow">
        <div className="font-bold text-main">{data.title}</div>
        <div>{data.content}</div>
        <div className="text-sm text-second-upper">{data.createdAt}</div>
      </div>
    </div>
  )
}
