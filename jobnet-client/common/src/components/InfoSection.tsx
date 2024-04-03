import { useState, useEffect, createContext, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import Button from './Button'
import Checkbox from './input/Checkbox'

interface InfoSectionContextProps {
  isCompleted: boolean
  setIsCompleted: React.Dispatch<React.SetStateAction<boolean>>
}
const InfoSectionContext = createContext<InfoSectionContextProps>(
  {} as InfoSectionContextProps
)

export default function InfoSection({
  className = '',
  header,
  children,
}: {
  className?: string
  header: React.ReactNode
  children: React.ReactNode
}): JSX.Element {
  const [isCompleted, setIsCompleted] = useState(false)

  return (
    <InfoSectionContext.Provider
      value={{
        isCompleted,
        setIsCompleted,
      }}
    >
      <div className={`${className} info-section flex py-6`}>
        <div className="basis-1/3">{header}</div>
        <div className="flex flex-col gap-6 grow">{children}</div>
      </div>
    </InfoSectionContext.Provider>
  )
}

InfoSection.HeaderItem = function HeaderItem({
  title,
  handleOpenModal,
}: {
  title: string
  handleOpenModal?: React.MouseEventHandler<HTMLButtonElement>
}): JSX.Element {
  const { t } = useTranslation()

  const context = useContext(InfoSectionContext)

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="flex flex-col items-start gap-2">
        <h4 className="font-bold">{title}</h4>
        <div className="text-sm font-semibold text-second">
          {t('infoSection.status.label')} (
          {!context.isCompleted
            ? t('infoSection.status.incomplete')
            : t('infoSection.status.complete')}
          )
        </div>
      </div>
      <Button onClick={handleOpenModal}>{t('infoSection.button')}</Button>
    </div>
  )
}

InfoSection.Item = function Item({
  title,
  content,
}: {
  title: string
  content?: string
}): JSX.Element {
  const context = useContext(InfoSectionContext)

  useEffect(() => {
    context.setIsCompleted(!!content)
  }, [content, context])

  return (
    <div className="flex items-center">
      <div className="flex-none w-40 font-semibold">{title}</div>
      <div className="flex items-center grow">{content}</div>
    </div>
  )
}

InfoSection.CheckboxHeader = function CheckboxHeader({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}): JSX.Element {
  return (
    <div>
      <h4 className="font-bold">{title}</h4>
      <p className="text-second">{subTitle}</p>
    </div>
  )
}

InfoSection.CheckboxItem = function CheckBoxItem({
  title,
  subTitle,
}: {
  title: string
  subTitle: string
}): JSX.Element {
  return (
    <div className="flex items-start gap-6">
      <div>
        <Checkbox />
      </div>
      <div>
        <label className="font-semibold cursor-pointer">{title}</label>
        <p className="text-second">{subTitle}</p>
      </div>
    </div>
  )
}