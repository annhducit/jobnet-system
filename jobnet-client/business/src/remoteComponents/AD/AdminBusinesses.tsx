import ADBussinessesTable from '../../components/ADBusinessesTable.tsx'

export interface BusinessAdminLoader {
  BusinessPageParams: object
}

function AdminBusinesses({ loader }: { loader: BusinessAdminLoader }) {
  return (
    <ADBussinessesTable {...loader.BusinessPageParams}></ADBussinessesTable>
  )
}

export default AdminBusinesses
