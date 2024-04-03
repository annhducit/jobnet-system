import BusinessInfo from '../components/BusinessInfo'
import type BusinessType from '../types/business'

export default function BusinessDetails({
  business,
}: {
  business: BusinessType
}): JSX.Element {
  return (
    <div className="flex justify-center">
      <BusinessInfo
        className="business-mainLayout"
        mode="view"
        business={business}
      />
    </div>
  )
}
