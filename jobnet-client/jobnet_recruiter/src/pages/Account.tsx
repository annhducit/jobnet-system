import { useTranslation } from 'react-i18next'

import Profile from 'User/Profile'

import useTitlePage from '../hooks/useTitlePage'

export default function Account(): JSX.Element {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.profile'))
  return <Profile />
}
