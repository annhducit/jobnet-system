import { useLoaderData } from 'react-router-dom'

import ADJobseekers from 'User/AD/ADJobseekers'

import { requireAuth } from '../../utils/auth'
ADJobseekerManagement.loader = async function ({
  request,
}: {
  request: Request
}) {
  requireAuth(request, 'Admin')
  return Promise.resolve(null)
  // const jobseekers = await jobseekersService.getJobSeekers()
  // return { jobseekers }
}

function ADJobseekerManagement() {
  useLoaderData()
  return <ADJobseekers />
}
export default ADJobseekerManagement
