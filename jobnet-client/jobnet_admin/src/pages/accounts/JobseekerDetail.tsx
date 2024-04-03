import { useLoaderData } from 'react-router-dom'
import { useParams } from 'react-router-dom'

import { requireAuth } from '../../utils/auth'

import ADJobSeekerDetail from 'User/AD/ADJobSeekerDetail'

JobSeekerDetail.loader = function ({ request }: { request: Request }) {
  requireAuth(request, 'Admin')
  return null
}

export default function JobSeekerDetail() {
  useLoaderData()

  const param = useParams()
  return <ADJobSeekerDetail jobseekerId={param.jobseekerId} />
}
