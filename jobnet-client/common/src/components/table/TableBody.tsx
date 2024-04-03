import ColumnsType from '../../types/ColumnsType'

import { Table as TableFlowbite } from 'flowbite-react'

export default function TableBody({
  data,
  numberList,
  columns,
  fontSize,
}: {
  data: any[]
  numberList: boolean
  columns: ColumnsType<any>[]
  fontSize: number
}): JSX.Element {
  const cellsRender = (data: object, index: number) =>
    columns.map((column: ColumnsType<any>, index2: number) => {
      if (!column.render) {
        const text =
          column.truncate && column.truncate > 0
            ? truncateString(column.dataIndex.getValue(data), column.truncate)
            : column.dataIndex.getValue(data)
        return (
          <DataCell
            data={text}
            key={`${index}-${index2}`}
            align={column.align || 'left'}
          />
        )
      } else {
        const alignElement: string =
          column.align === 'center' ? 'flex justify-center items-center' : ''
        return (
          <DataCellRender
            key={`${index}-${index2}`}
            align={alignElement}
            render={column.render(data)}
          />
        )
      }
    })
  return (
    <TableFlowbite.Body className={`text-[${fontSize}px] relative`}>
      {data.map((data: object, index: number) => (
        <TableFlowbite.Row
          key={index}
          style={{
            backgroundColor: index % 2 === 0 ? '#f1f5f9' : 'white',
          }}
        >
          {numberList && (
            <TableFlowbite.Cell className={`px-4 py-2 border-b w-[20px]`}>
              {index + 1}
            </TableFlowbite.Cell>
          )}
          {cellsRender(data, index)}
        </TableFlowbite.Row>
      ))}
      {data.length <= 0 && (
        <TableFlowbite.Row className="absolute inset-0 flex items-center justify-center mt-[25px] top-12">
          <TableFlowbite.Cell>
            <p className="text-base font-semibold">Không có dữ liệu</p>
          </TableFlowbite.Cell>
        </TableFlowbite.Row>
      )}
    </TableFlowbite.Body>
  )
}

function DataCell({ data, align }: { data: string; align: string }) {
  return (
    <TableFlowbite.Cell className={` px-2 py-1 border-b text-${align}`}>
      {`${data}`}
    </TableFlowbite.Cell>
  )
}

function DataCellRender({
  align,
  render,
}: {
  align: string
  render: React.ReactElement | null
}) {
  return (
    <TableFlowbite.Cell className={`px-4 py-2 border-b `}>
      <div className={`w-full h-full ${align}`}>{render}</div>
    </TableFlowbite.Cell>
  )
}

//string length > n => show ...
function truncateString(str: string, n: number): string {
  if (str.length > n) {
    return str.slice(0, n) + '...'
  } else {
    return str
  }
}
