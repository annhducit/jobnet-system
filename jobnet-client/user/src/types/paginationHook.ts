import PaginationType from "./pagination"
import { RefObject } from "react"
import { Dispatch,SetStateAction } from "react"
export default interface PaginationHook<T> {
  pagination: PaginationType<T>
  setPagination: Dispatch<SetStateAction<PaginationType<T>>>
  scrollIntoView: () => void
  scrollIntoViewRef:  RefObject<HTMLDivElement>
}
