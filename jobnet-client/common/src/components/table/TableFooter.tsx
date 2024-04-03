import Pagination from '../Pagination'
import { Table as TableFlowbite } from 'flowbite-react'

import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'

export default function TableFooter({
  page,
  totalPage,
  colSpan,
  handleChangePage,
  handleChangeFontSize,
}: {
  page: number
  totalPage: number
  colSpan: number
  handleChangePage: (agr: number) => void
  handleChangeFontSize: (agr: boolean) => void
}): JSX.Element {
  const handlePageChange = (p: number) => {
    if (p <= 0) p = 1
    if (p > totalPage) p = totalPage
    handleChangePage(p)
  }

  return (
    <TableFlowbite.Row>
      <TableFlowbite.Cell colSpan={colSpan} className="p-2">
        <div className="flex justify-between ">
          <div className="flex item-center">
            <div
              onClick={() => {
                handleChangeFontSize(false)
              }}
              className="flex items-center justify-center h-10 cursor-pointer  w-10 border rounded-l-base hover:bg-second-lower"
            >
              <AiOutlineMinus></AiOutlineMinus>
            </div>
            <div
              onClick={() => {
                handleChangeFontSize(true)
              }}
              className="flex items-center justify-center h-10 cursor-pointer w-10 border rounded-r-base hover:bg-second-lower"
            >
              <AiOutlinePlus></AiOutlinePlus>
            </div>
          </div>
          <div>
            <Pagination
              currentPage={page}
              totalPages={totalPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </TableFlowbite.Cell>
    </TableFlowbite.Row>
  )
}
