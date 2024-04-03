import { useLoaderData } from 'react-router-dom'

import { requireAuth } from '../../utils/auth'

import ADRecruiterDetail from 'User/AD/ADRecruiterDetail'
RecuiterDetail.loader = function ({ request }: { request: Request }) {
  requireAuth(request, 'Admin')
  return null
}

export default function RecuiterDetail() {
  useLoaderData()

  return <ADRecruiterDetail />
}
