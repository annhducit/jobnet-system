import { useLoaderData } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Button from 'Common/Button'
import Appliciant from 'User/RC/Appliciant'

import useTitlePage from '../hooks/useTitlePage'
import { requireAuth } from '../utils/auth'
import { useAppSelector } from '../app/hooks'

ApplicantManagement.loader = async function ({
  request,
}: {
  request: Request
}) {
  requireAuth(request, 'Recruiter')
  return Promise.resolve(null)
}

export default function ApplicantManagement(): JSX.Element {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.applicant'))
  useLoaderData()

  const user = useAppSelector((state) => state.auth.user)

  return (
    <>
      <main className="space-y-8">
        <div className="space-y-2">
          <div className="applicant-item">
            <h2 className="text-2xl font-bold">
              {t('recruiter.manageCandidate.title')}
            </h2>
            <Button>{t('recruiter.manageCandidate.create')}</Button>
          </div>
          <div className="font-semibold text-second">
            {t('recruiter.manageCandidate.subTitle')}
          </div>
        </div>
        <Appliciant recruiterId={user?.id} />
      </main>
    </>
  )
}
