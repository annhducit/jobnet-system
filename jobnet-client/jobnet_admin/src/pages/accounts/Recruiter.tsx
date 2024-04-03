import { useLoaderData } from 'react-router-dom'

import { requireAuth } from '../../utils/auth'

import ADRecruiters from 'User/AD/ADRecruiters'

ADRecruiterManagement.loader = async function ({
  request,
}: {
  request: Request
}) {
  requireAuth(request, 'Admin')
  return Promise.resolve(null)
}

function ADRecruiterManagement() {
  useLoaderData()

  return (<ADRecruiters></ADRecruiters>)
}

export default ADRecruiterManagement
