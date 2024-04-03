import { useLoaderData } from 'react-router-dom'

import { requireAuth } from '../utils/auth'

import ProfessionsManagement from 'Post/AD/ProfessionsManagement'
Professions.loader = function ({ request }: { request: Request }) {
  requireAuth(request, 'Admin')
  return null
}

interface Professions {
  professions: Professions[]
}

export default function Professions() {
  useLoaderData()
  return <ProfessionsManagement />
}
