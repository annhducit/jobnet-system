import { useLoaderData } from 'react-router-dom'

import { requireAuth } from '../../utils/auth'

import AdminPostDetail from 'Post/AD/AdminPostDetail'

ADPostDetail.loader = function ({ request }: { request: Request }) {
  requireAuth(request, 'Admin')
  return null
}

export default function ADPostDetail(): JSX.Element {
  useLoaderData()
  return <AdminPostDetail />
}
