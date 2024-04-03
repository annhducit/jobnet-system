//business
declare module 'Business/components/Businesses'
declare module 'Business/components/Business'
declare module 'Business/components/BusinessesSlider'

declare module 'Business/types' {
  export default BusinessType
}
declare module 'Business/services' {
  export function getBusinessById(businessId: string): Promise<BusinessType>
  export function updateBusinessFollowers(
    id: string,
    req: object
  ): Promise<BusinessType>
  export function getBusinessBackgroundImage(id: string): string
  export function getBusinessProfileImage(id: string): string
}

interface LocationType {
  provinceCode: string
  provinceName: string
  specificAddress: string
}

interface BusinessType {
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
