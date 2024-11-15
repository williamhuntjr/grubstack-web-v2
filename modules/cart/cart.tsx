'use client'

import React, { FC, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { showDecimal } from 'common/utils/number.utils'
import { NumberInput } from 'common/components/number-input/number-input'
import { useCart } from 'common/hooks/cart.hook'
import { Loading } from 'common/components/loading/loading'
import { menusRoutePath } from 'modules/menus/menus.constants'
import { useDialog } from 'common/hooks/dialog.hook'
import { GrubDialog } from 'common/components/grub-dialog/grub-dialog'
import { checkoutRoutePath } from 'modules/checkout/checkout.constants'
import { 
  getCart,
  updateQuantity,
  removeFromCart,
  emptyCart,
  updateItem,
  checkItemForOptionalIngredients,
  getPrice,
  generatePrice,
  generateChips
} from './cart.utils'
import { ICart, ICartItem } from './cart.types'
import { defaultCartState, defaultCartItem } from './cart.constants'
import { ItemCustomizer } from './item-customizer/item-customizer'
import styles from './cart.module.scss'
import { OrderTypePicker } from './order-type-picker/order-type-picker'

export const Cart: FC<ICart> = ({ locationId }) => {
  const [isLoading, setLoading] = useState<boolean>(false)

  const { cart, setCart } = useCart()

  const router = useRouter()

  const refreshCart = () => {
    const cartData = getCart(locationId)

    if (cartData) {
      setCart(cartData)
    }
  }

  const {
    open: itemCustomizerOpen,
    openDialog: openItemCustomizer,
    closeDialog: closeItemCustomizer,
    data: itemCustomizerData,
  } = useDialog<ICartItem>(defaultCartItem)

  const handleUpdateClick = async (cartItem: ICartItem): Promise<void> => {
    try {
      updateItem(locationId, cartItem.id, cartItem)
      refreshCart()
      toast.success('Item successfully updated in your cart')
      closeItemCustomizer()
    } catch (e) {
      console.error(e)
    }
  }

  const handleQuantityChange = async (itemId: string, quantity: number): Promise<void> => {
    if (quantity > 0) {
      updateQuantity(locationId, itemId, quantity)
      refreshCart()
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
    const cartData = getCart(locationId)
    setCart(cartData ?? defaultCartState)
  }, [])

  return (
    <>
      <GrubDialog open={itemCustomizerOpen} onClose={closeItemCustomizer} title={'Customize Item'}>
        <ItemCustomizer
          data={itemCustomizerData}
          onAddItemToCart={(cartItem: ICartItem) => handleUpdateClick(cartItem)}
          quantity={itemCustomizerData.quantity ?? 1}
          buttonLabel={'Update Item'}
        />
      </GrubDialog>
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
                      <div>
                        <p className={styles.itemName}>{item.name}</p>
                        {generateChips(item)}
                      </div>
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
                        {checkItemForOptionalIngredients(item) &&
                        <Button variant="contained" color="primary" size="large" onClick={() => openItemCustomizer(item)}>
                          Customize
                        </Button>
                        }
                        <Button variant="contained" color="secondary" size="large" onClick={() => handleRemoveItem(item.id)}>
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
                <OrderTypePicker locationId={locationId!} />
                <Divider />
                <Button variant="contained" color="primary" className={styles.checkoutButton} onClick={() => router.push(checkoutRoutePath)}>
                  Checkout
                </Button>
                <Button variant="contained" color="secondary" className={styles.menusButton} onClick={() => router.push(menusRoutePath)}>
                  Back to Menus
                </Button>
                <Button variant="outlined" color="primary" className={styles.emptyCartButton} onClick={() => void handleEmptyCart()}>
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
    </>
  )
}
