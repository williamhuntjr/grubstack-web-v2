import type { Metadata } from 'next'
import { getCurrentLocation } from 'common/actions/locations'
import { Checkout } from 'modules/checkout/checkout'

export const metadata: Metadata = {
  title: 'GrubStack',
  description: 'Food CRM and Order Processing',
}

export default async function Page() {
  const location = await getCurrentLocation()

  return <Checkout locationId={location?.id ?? ''} />
}
