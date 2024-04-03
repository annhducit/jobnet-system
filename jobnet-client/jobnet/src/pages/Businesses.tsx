import { useTranslation } from 'react-i18next'

import useTitlePage from '../hooks/useTitlePage'
import UploadCVGif from '../components/UploadCVGif'
import Business from 'Business/components/Businesses'

export default function Businesses() {
  const { t } = useTranslation()
  useTitlePage(t('pageTitle.businesses'))
  return (
    <section className="pt-10 pb-6 overflow-hidden lg:pt-20">
      <Business />
      <UploadCVGif />
    </section>
  )
}
