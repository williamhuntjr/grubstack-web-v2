import type { Metadata } from 'next'
import { getCurrentLocation } from 'common/actions/locations'
import { getCart } from 'common/actions/cart'
import { Cart } from 'modules/cart/cart'
import { defaultCartState } from 'modules/cart/cart.constants'

export const metadata: Metadata = {
  title: 'GrubStack',
  description: 'Food CRM and Order Processing',
}

export default async function Page() {
  const location = await getCurrentLocation()
  const state = location ? await getCart(location.id) : defaultCartState

  return <Cart data={state} locationId={location.id ?? ''} />
}
