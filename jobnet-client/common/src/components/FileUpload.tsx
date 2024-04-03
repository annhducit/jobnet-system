import { FileInput } from 'flowbite-react'
import { useTranslation } from 'react-i18next'

import Button from './Button'

interface FileUploadProps {
  subtitle?: string
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFileUpload: () => void
  onModalClose: () => void
}

export default function FileUpload({
  subtitle = 'JPG, GIF hoặc PNG. Kích thước tối đa 800K',
  onFileSelect,
  onFileUpload,
  onModalClose,
}: FileUploadProps): JSX.Element {
  const { t } = useTranslation()

  return (
    <div className="space-y-5">
      <FileInput className="outline-main" onChange={onFileSelect} />
      <div className="text-sm text-second">{subtitle}</div>

      <div className="flex justify-end gap-4">
        <Button color="main" onClick={onFileUpload}>
          {t('fileUpload.button.upload')}
        </Button>
        <Button color="red" onClick={onModalClose}>
          {t('fileUpload.button.cancel')}
        </Button>
      </div>
    </div>
  )
}
