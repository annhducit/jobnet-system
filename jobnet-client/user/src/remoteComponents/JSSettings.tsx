import { useTranslation } from 'react-i18next'

import InfoSection from 'Common/InfoSection'

export default function JSSetting() {
  const { t } = useTranslation()
  return (
    <div className="setting">
      <div className="divide-y-2">
        <div className="pb-6 space-y-1">
          <h2 className="text-2xl font-bold">{t('setting.header.title')}</h2>
          <p className="text-lg font-semibold text-second">
            {t('setting.header.subTitle')}
          </p>
        </div>

        <InfoSection
          header={
            <InfoSection.CheckboxHeader
              title={t('setting.mail.title')}
              subTitle={t('setting.mail.subtitle')}
            />
          }
        >
          <InfoSection.CheckboxItem
            title={t('setting.mail.events.title')}
            subTitle={t('setting.mail.events.subTitle')}
          />
          <InfoSection.CheckboxItem
            title={t('setting.mail.suggestions.title')}
            subTitle={t('setting.mail.suggestions.subTitle')}
          />
          <InfoSection.CheckboxItem
            title={t('setting.mail.successSubmitted.title')}
            subTitle={t('setting.mail.successSubmitted.subTitle')}
          />
          <InfoSection.CheckboxItem
            title={t('setting.mail.bussinessFollow.title')}
            subTitle={t('setting.mail.bussinessFollow.subTitle')}
          />
          <InfoSection.CheckboxItem
            title={t('setting.mail.viewResume.title')}
            subTitle={t('setting.mail.viewResume.subTitle')}
          />
        </InfoSection>

        <InfoSection
          header={
            <InfoSection.CheckboxHeader
              title={t('setting.notifications.title')}
              subTitle={t('setting.notifications.subtitle')}
            />
          }
        >
          <InfoSection.CheckboxItem
            title={t('setting.notifications.suitableJob.title')}
            subTitle={t('setting.notifications.suitableJob.subTitle')}
          />
          <InfoSection.CheckboxItem
            title={t('setting.notifications.jobApplied.title')}
            subTitle={t('setting.notifications.jobApplied.subTitle')}
          />
        </InfoSection>
      </div>
    </div>
  )
}
