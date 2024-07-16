'use client'

import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { showDecimal } from 'common/utils/number.utils'
import { getPrice, generatePrice } from 'common/utils/cart.utils'
import { NumberInput } from 'common/components/number-input/number-input'
import { updateQuantity, removeFromCart, emptyCart } from 'common/actions/cart'
import { useCart } from 'common/hooks/cart.hook'
import { Loading } from 'common/components/loading/loading'
import { menusRoutePath } from 'modules/menus/menus.constants'
import { ICart } from './cart.types'
import styles from './cart.module.scss'

export const Cart: FC<ICart> = ({ data, locationId }) => {
  const [isLoading, setLoading] = useState<boolean>(false)

  const { cart, setCart } = useCart()

  const router = useRouter()

  const refreshCart = async () => {
    const resp = await fetch(`/api/locations/${locationId}/cart`)
    const json = await resp.json()

    if (json) {
      setCart(json.data)
    }
  }

  const handleQuantityChange = async (itemId: string, quantity: number): Promise<void> => {
    if (quantity > 0) {
      await updateQuantity(locationId, itemId, quantity)
      await refreshCart()
    }
  }

  const handleRemoveItem = async (itemId: string): Promise<void> => {
    await removeFromCart(locationId, itemId)
    await refreshCart()
  }

  const handleEmptyCart = async (): Promise<void> => {
    setLoading(true)
    await toast.promise(
      async () => {
        await emptyCart(locationId)
        await refreshCart()
      },
      {
        pending: 'Removing all items from your cart',
        success: 'Your cart has been cleared',
        error: 'Unable to clear your cart',
      }
    )
    setLoading(false)
  }

  useEffect(() => {
    setCart(data)
  }, [])

  return (
    <div className={styles.cartContainer}>
      {isLoading && <Loading />}
      {!isLoading && cart?.items.length > 0 && (
        <div className={styles.shoppingCartContent}>
          {cart?.items.length > 0 && (
            <ul className={styles.cartItemsList}>
              {cart.items.map((item, index) => (
                <li className={styles.cartItem} key={index}>
                  <div className={styles.cartItemContent}>
                    <div className={styles.itemThumbnail}>
                      <img src={item.thumbnail_url} alt={item.name} />
                    </div>
                    <p className={styles.itemName}>{item.name}</p>
                    <div className={styles.itemPrice}>
                      <p>${showDecimal((item.price ? getPrice(item) : 0.0) * item.quantity)}</p>
                    </div>
                  </div>
                  <div className={styles.itemActionContainer}>
                    <div className={styles.itemQuantityContainer}>
                      <NumberInput
                        noNegativeValues={true}
                        value={item.quantity}
                        onValueChange={(value) => void handleQuantityChange(item.id ?? '', value)}
                      />
                    </div>
                    <div className={styles.buttonContainer}>
                      <Button variant="contained" color="primary">
                        Customize
                      </Button>
                      <Button variant="contained" color="secondary" onClick={() => void handleRemoveItem(item.id)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cart?.items.length > 0 && (
            <div className={styles.subTotalContainer}>
              <div className={styles.subTotal}>
                <h4 className={styles.subTotalLabel}>Subtotal</h4>
                <h4 className={styles.subTotalPrice}>${cart ? showDecimal(generatePrice(cart)) : 0.0}</h4>
              </div>
              <Divider />
              <Button variant="contained" color="primary" className={styles.checkoutButton}>
                Proceed to Checkout
              </Button>
              <Button variant="contained" color="secondary" className={styles.checkoutButton} onClick={() => router.push(menusRoutePath)}>
                Back to Menus
              </Button>
              <Button variant="outlined" color="primary" className={styles.checkoutButton} onClick={() => void handleEmptyCart()}>
                Empty My Cart
              </Button>
            </div>
          )}
        </div>
      )}
      {!isLoading && cart?.items.length == 0 && (
        <div className={styles.cartItemWarning}>
          <h3>Your cart is empty</h3>
          <p>You have no items in your cart.</p>
        </div>
      )}
    </div>
  )
}
