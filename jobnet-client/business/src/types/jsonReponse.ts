export default interface JsonResponseProps<T> {
  message: string
  data: T | T[]
}
