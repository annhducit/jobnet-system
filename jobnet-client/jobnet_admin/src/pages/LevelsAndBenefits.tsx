import { useLoaderData } from 'react-router-dom'

import { requireAuth } from '../utils/auth'

import LevelsBenefitsManagement from 'Post/AD/LevelsBenefitsManagement'

LevelsAndBenefitsManagement.loader = function ({
  request,
}: {
  request: Request
}) {
  requireAuth(request, 'Admin')
  return null
}

export default function LevelsAndBenefitsManagement() {
  useLoaderData()

  return <LevelsBenefitsManagement />
}
