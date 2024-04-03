declare module 'Business/AD/AdminBusinesses'
declare module 'Business/AD/ADBusinessDetail'

declare module 'Business/types' {
  // export default BusinessType
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