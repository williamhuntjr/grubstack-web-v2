'use server'

import { callApi } from 'common/api'
import { ApiMethod } from 'common/constants'
import { ICartState } from 'modules/cart/cart.types'

export async function validateOrder(locationId: string, cart: ICartState) {
  const resp = await callApi(`/orders/validate/${locationId}`, ApiMethod.POST, JSON.stringify(cart))
}