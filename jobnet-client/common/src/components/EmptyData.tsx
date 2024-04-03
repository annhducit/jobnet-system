import { useTranslation } from 'react-i18next'

import empty from '/empty.png'

export default function EmptyData({
  title,
  subtitle,
}: {
  title?: string
  subtitle?: string
}): React.ReactElement {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="object-cover w-48 h-48">
        <img src={empty} />
      </div>
      <h4 className="text-lg font-bold">{title || t('emptyData.title')}</h4>
      <div className="text-second">
        {subtitle || t('emptyData.subtitle')}
      </div>
    </div>
  )
}
