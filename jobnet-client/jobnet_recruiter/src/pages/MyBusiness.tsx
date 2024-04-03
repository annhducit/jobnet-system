import { redirect, useLoaderData } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Business from 'Business/RC/Business'

import { store } from '../app/store'
import useTitlePage from '../hooks/useTitlePage'
import { requireAuth } from '../utils/auth'
import type BusinessType from '../types/business'

import businessService from '../services/businessService'
import recruiterService from '../services/recruiterService'

interface MyBusinessLoader {
  business: BusinessType
}

MyBusiness.loader = async function ({
  request,
}: {
  request: Request
}): Promise<MyBusinessLoader | Response> {
  requireAuth(request, 'Recruiter')

  const auth = store.getState().auth
  const recruiterId = auth.user?.id as string

  const recruiter = await recruiterService.getRecruiterById(recruiterId)
  if (!recruiter.business) {
    return redirect('/business')
  }

  const business = await businessService.getBusinessById(recruiter.business?.id)
  return { business }
}

export default function MyBusiness(): JSX.Element {
  const loader = useLoaderData() as MyBusinessLoader
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.mybusiness'))

  return <Business loader={loader} />
}
