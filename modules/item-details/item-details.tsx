'use client'

import React, { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import { NumberInput } from 'common/components/number-input/number-input'
import { IItem } from 'common/types'
import { useDialog } from 'common/hooks/dialog.hook'
import { useCart } from 'common/hooks/cart.hook'
import { GrubDialog } from 'common/components/grub-dialog/grub-dialog'
import { ItemCustomizer } from 'modules/cart/item-customizer/item-customizer'
import { menusRoutePath } from 'modules/menus/menus.constants'
import { ICartItem } from 'modules/cart/cart.types'
import { getCart, addToCart, checkItemForOptionalIngredients, formatItem } from 'modules/cart/cart.utils'
import { IItemDetails } from './item-details.types'
import styles from './item-details.module.scss'

export const ItemDetails: FC<IItemDetails> = ({ data, menu, locationId }) => {
  const [quantity, setQuantity] = useState<number>(1)

  const { setCart } = useCart()

  const router = useRouter()

  const {
    open: itemCustomizerOpen,
    openDialog: openItemCustomizer,
    closeDialog: closeItemCustomizer,
    data: itemCustomizerData,
  } = useDialog<IItem>()

  const refreshCart = () => {
    const cartData = getCart(locationId)

    if (cartData) {
      setCart(cartData)
    }
  }

  const handleAddItemToCart = (cartItem: ICartItem): void => {
    try {
      addToCart(cartItem, locationId)
      refreshCart()
      toast.success('Item successfully added to your cart')
      closeItemCustomizer()
    } catch (e) {
      console.error(e)
    }
  }

  const handleAddClick = (item: IItem) => {
    if (checkItemForOptionalIngredients(item)) {
      openItemCustomizer({
        ...item,
        menu_id: menu!.id,
        menu_slug: menu!.slug,
      })
    }
    else {
      handleAddItemToCart(formatItem(item, quantity ?? 1))
    }
  }

  return (
    <>
      <GrubDialog open={itemCustomizerOpen} onClose={closeItemCustomizer} title={'Customize Item'}>
        <ItemCustomizer data={itemCustomizerData} onAddItemToCart={(cartItem: ICartItem) => handleAddItemToCart(cartItem)} quantity={quantity} />
      </GrubDialog>
      <div className={styles.itemDetailsContainer}>
        {data && menu && (
          <div className={styles.itemDetailsContent}>
            <img src={data.thumbnail_url} alt="" className={styles.thumbnailUrl} />
            <h1 className={styles.itemName}>{data.name}</h1>
            <p className={styles.itemDescription}>{data.description}</p>
            <div className={styles.quantity}>
              <NumberInput noNegativeValues={true} value={quantity} onValueChange={(value) => setQuantity(value)} />
            </div>
            <div className={styles.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() =>
                  handleAddClick({
                    ...data,
                    menu_id: menu.id,
                    menu_slug: menu.slug,
                  })
                }
              >
                Add to Cart
              </Button>
            </div>
          </div>
        )}
        {!data && menu && (
          <div className={styles.warningContainer}>
            <h1>No such item on the menu</h1>
            <p>You are trying to view an item that does not exist on this location's menu.</p>
            <Button variant="contained" size="large" color="primary" onClick={() => router.push(`${menusRoutePath}/${menu.slug}`)}>
              View Items
            </Button>
          </div>
        )}
        {!menu && (
          <div className={styles.warningContainer}>
            <h1>This menu does not exist</h1>
            <p>
              It seems the menu you are attempting to access does not exist for this location. Please check your URL or location and try
              again.
            </p>
            <Button variant="contained" size="large" color="primary" onClick={() => router.push(menusRoutePath)}>
              View Menus
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
