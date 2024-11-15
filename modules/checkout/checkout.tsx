'use client'

import React, { FC, useEffect, useState } from 'react'
import { CreditCard, PaymentForm } from 'react-square-web-payments-sdk'
import { useRouter } from 'next/navigation'
import { ILocation } from 'common/types'
import { appConfig } from 'common/config'
import { validateOrder } from 'common/actions/orders'
import { getCart } from 'modules/cart/cart.utils'
import { cartRoutePath } from 'modules/cart/cart.constants'
import { ICheckout } from './checkout.types'
import styles from './checkout.module.scss'
import { ICartState } from 'modules/cart/cart.types'

export const Checkout: FC<ICheckout> = ({ locationId }) => {
  const [token, setToken] = useState<string>()
  const [currentLocation, setCurrentLocation] = useState<ILocation>()
  const [cart, setCart] = useState<ICartState>()

  const router = useRouter()

  const init = async () => {
    const cart = getCart(locationId)
    setCart(cart)

    if (cart.items.length <= 0 || cart.order_type == null) {
      router.push(cartRoutePath)
    }

    validateOrder(locationId, cart)

    let resp = await fetch('/api/locations/get-current-location')
    let json = await resp.json()

    if (json.data) {
      setCurrentLocation(json.data as ILocation)
    }
  }

  useEffect(() => void init(), [])

  return (
    <div className={styles.checkoutContainer}>
      <h2>Enter your card information</h2>
      {currentLocation?.merchant_location_id &&
      <div className={styles.paymentFormContainer}>
        <PaymentForm
          applicationId={appConfig.squareAppId}
          locationId={currentLocation.merchant_location_id}
          cardTokenizeResponseReceived={async (resp) => {
            if (resp.status == 'OK' && cart) {
              setToken(resp.token)
            }
          }}
        >
          <CreditCard />
        </PaymentForm>
      </div>
      }
    </div>
  )
}