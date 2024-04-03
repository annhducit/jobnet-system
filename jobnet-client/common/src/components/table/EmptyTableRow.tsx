import { Table } from 'flowbite-react'
import { useTranslation } from 'react-i18next'

export default function EmptyTableRow(): React.ReactElement {
  const { t } = useTranslation()

  return (
    <Table.Row>
      <Table.Cell className="pl-4 text-lg text-center" colSpan={5}>
        {t('emptyTableRow.text')}
      </Table.Cell>
    </Table.Row>
  )
}
