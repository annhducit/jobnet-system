import { useTranslation } from 'react-i18next'

import { requireAuth } from '../utils/auth'
import useTitlePage from '../hooks/useTitlePage'
import JSSetting from 'User/JSSettings'

JSSettings.loader = function ({ request }: { request: Request }) {
  requireAuth(request, 'JobSeeker')

  return null
}

export default function JSSettings(): JSX.Element {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.settings'))
  return <JSSetting></JSSetting>
}
