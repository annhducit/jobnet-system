export type EBusinessType = 'Product' | 'Outsource'

export type EBusinessStatus = 'Pending' | 'Approved' | 'Rejected'

export default interface BusinessType {
  id: string
  name: string
  type: EBusinessType
  country: string
  employeeQuantity: string
  foundedYear: number
  description: string
  emailDomain: string
  phone: string
  website: string
  locations: Array<LocationType>
  profileImageId: string
  backgroundImageId: string
  followers: Array<string>
  totalFollowers: number
  createdAt: string
  status: EBusinessStatus
  isDeleted: boolean
}
export interface BusinessTypeMF {
  id: string
  name: string
  type: EBusinessType
  country: string
  employeeQuantity: string
  foundedYear: number
  description: string
  emailDomain: string
  phone: string
  website: string
  locations: Array<string>
  profileImageId: string
  backgroundImageId: string
  followers: Array<string>
  totalFollowers: number
  createdAt: string
  status: EBusinessStatus
  isDeleted: boolean
}

export interface BusinessPostType {
  locations: Array<string>
  id: string
  name: string
  profileImageId: string
}