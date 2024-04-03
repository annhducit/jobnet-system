import { To } from 'react-router-dom'
import UserType from './user'

export type MenuItem = {
  id: number
  item: string
  icon?: React.ReactElement
  navigate?: To
  subItem?: MenuItem[]
  hidden?: UserType | boolean
  onClick?: () => void
}
