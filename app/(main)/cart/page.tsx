import type { Metadata } from 'next'
import { getCurrentLocation } from 'common/actions/locations'
import { Cart } from 'modules/cart/cart'

export const metadata: Metadata = {
  title: 'GrubStack',
  description: 'Food CRM and Order Processing',
}

export default async function Page() {
  const location = await getCurrentLocation()

  return <Cart locationId={location.id ?? ''} />
}
