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
  export function deleteBusinessById(id: string | undefined): Promise<void>
}
