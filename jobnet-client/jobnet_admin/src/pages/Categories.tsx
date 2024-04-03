import { useLoaderData } from 'react-router-dom'

import { requireAuth } from '../utils/auth'

import CategoriesManagement from 'Post/AD/CategoriesManagement'

Categories.loader = function ({ request }: { request: Request }) {
  requireAuth(request, 'Admin')
  return null
}

export default function Categories() {
  useLoaderData()

  return <CategoriesManagement />
}
