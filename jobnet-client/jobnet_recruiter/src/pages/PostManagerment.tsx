import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Button from 'Common/Button'
import ManagePosts from 'Post/RC/ManagePosts'

import { requireAuth } from '../utils/auth'

import useTitlePage from '../hooks/useTitlePage'

PostManagement.loader = async function ({ request }: { request: Request }) {
  requireAuth(request, 'Recruiter')
  return Promise.resolve(null)
}

export default function PostManagement(): JSX.Element {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.posts'))

  return (
    <main className="px-2 space-y-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">
          {t('recruiter.postManagement.title')}
        </h2>
        <div className="font-semibold text-second">
          {t('recruiter.postManagement.subTitle')}
        </div>
        <Link to={'../posts/new'} className="block mt-6">
          <Button size="sm">
            {t('recruiter.postManagement.button.createPost')}
          </Button>
        </Link>
      </div>
      <ManagePosts></ManagePosts>
    </main>
  )
}
