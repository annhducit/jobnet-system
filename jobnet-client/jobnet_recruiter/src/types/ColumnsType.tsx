export class DataField {
  field: string[]

  constructor(field: string[]) {
    this.field = field
  }

  getValue<T>(data: T): string {
    console.log(data)
    if (typeof data === 'object') {
      let dataTemp = data as T & Record<string, unknown>

      for (let i = 0; i < this.field.length; i++) {
        try {
          dataTemp = dataTemp[this.field[i]] as never
        } catch (error) {
          return 'No data'
        }
      }

      if (typeof dataTemp === 'string') {
        return dataTemp
      } else {
        return String(dataTemp) || 'No data'
      }
    } else if (typeof data === 'string' || typeof data === 'number') {
      return 'No data'
    } else {
      throw new Error('Invalid data type for DataField.getValue')
    }
  }

  getNameField(): string {
    return this.field[this.field.length - 1]
  }
}

export default interface ColumnsType<T> {
  title: string
  dataIndex: DataField
  width: number
  sort?: boolean
  filter?: { text: string; value: string }[]
  filterKey: string
  render?: (record: T) => React.ReactElement | null
  truncate?: number
  align?: string
}
