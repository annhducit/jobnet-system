import { useLoaderData } from 'react-router-dom'
import PostsApplied from 'Post/PostsApplied'
import { useTranslation } from 'react-i18next'
import useTitlePage from '../hooks/useTitlePage'
import { store } from '../app/store'

import ApplicationType from 'Post/Application'

import { requireAuth } from '../utils/auth'
import type PaginationType from '../types/pagination'
import applicationService from '../services/applicationService'
interface ApplicationRecentLoader {
  pagination: PaginationType<ApplicationType>
}

RecentApplications.loader = async function ({
  request,
}: {
  request: Request
}): Promise<ApplicationRecentLoader> {
  requireAuth(request, 'JobSeeker')
  const auth = store.getState().auth
  const jobSeekerId = auth.user?.id
  const pagination = await applicationService.getApplications({ jobSeekerId })
  return { pagination }
}

export default function RecentApplications(): React.ReactElement {
  const loader = useLoaderData() as ApplicationRecentLoader
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.recentApplications'))

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-xl font-bold">
          {t('recentApplications.header.title')}
        </h2>
        <div className="font-semibold text-second">
          {t('recentApplications.header.subTitle')}
        </div>
      </div>
      <PostsApplied applicationPagination={loader.pagination} />
    </>
  )
}
