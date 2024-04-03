import { useLoaderData } from 'react-router-dom'

import ADBusinessDetail from 'Business/AD/ADBusinessDetail'

export default function ADBusinessDetails(): JSX.Element {
  useLoaderData()
  return <ADBusinessDetail />
}
