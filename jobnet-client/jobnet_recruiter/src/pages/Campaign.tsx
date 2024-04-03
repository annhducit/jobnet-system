import { useLoaderData } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Campaigns from 'User/RC/Campaigns'

import ResumeType from '../types/resume'
import resumeService from '../services/resumeService'
import { requireAuth } from '../utils/auth'
import useTitlePage from '../hooks/useTitlePage'
interface CampaignLoader {
  resumes: Array<ResumeType>
}

Campaign.loader = async function ({
  request,
}: {
  request: Request
}): Promise<CampaignLoader> {
  requireAuth(request, 'Recruiter')

  const resumes = await resumeService.getResumesByAuth()
  return { resumes }
}

export default function Campaign(): JSX.Element {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.campaign'))
  useLoaderData() as CampaignLoader

  return (
    <main className="flex flex-col w-full px-2 mt-3 lg:px-6 lg:gap-y-4 gap-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{t('recruiter.campaign.title')}</h2>
      </div>
      <h3>{t('recruiter.campaign.subTitle')}</h3>
      <Campaigns />
    </main>
  )
}
