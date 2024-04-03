import { useLoaderData } from 'react-router-dom'

import AdminBusinesses from 'Business/AD/AdminBusinesses'

import { requireAuth } from '../../utils/auth'
export interface BusinessAdminLoader {
  BusinessPageParams: object
}

ADBussinesses.loader = async function ({
  request,
}: {
  request: Request
}): Promise<BusinessAdminLoader> {
  requireAuth(request, 'Admin')

  const url = request.url.split('/')
  const type = url[url.length - 1].trim()

  if (type === 'Pending' || type === 'Approved' || type === 'Rejected') {
    return Promise.resolve({ BusinessPageParams: { status: type } })
  }
  return Promise.resolve({ BusinessPageParams: {} })
}

function ADBussinesses() {
  const loader = useLoaderData() as BusinessAdminLoader
  return (
    <>
      <AdminBusinesses loader={loader} />
    </>
  )
}

export default ADBussinesses
