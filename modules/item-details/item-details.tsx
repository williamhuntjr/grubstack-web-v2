'use client'

import React, { FC, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import Button from '@mui/material/Button'
import { NumberInput } from 'common/components/number-input/number-input'
import { IItem } from 'common/types'
import { addToCart } from 'common/actions/cart'
import { useCart } from 'common/hooks/cart.hook'
import { menusRoutePath } from 'modules/menus/menus.constants'
import { IItemDetails } from './item-details.types'
import styles from './item-details.module.scss'

export const ItemDetails: FC<IItemDetails> = ({ data, menu, locationId }) => {
  const [quantity, setQuantity] = useState<number>(1)

  const { setCart } = useCart()

  const router = useRouter()

  const refreshCart = async () => {
    const resp = await fetch(`/api/locations/${locationId}/cart`)
    const json = await resp.json()

    if (json) {
      setCart(json.data)
    }
  }

  const handleAddClick = async (cartItem: IItem): Promise<void> => {
    const formattedItem = {
      id: cartItem.id ?? '',
      name: cartItem.name,
      slug: cartItem.slug,
      thumbnail_url: cartItem.thumbnail_url,
      price: cartItem.price ?? 0,
      sale_price: cartItem.sale_price ?? 0,
      is_onsale: cartItem.is_onsale ?? false,
      menu_id: menu?.id ?? '',
      menu_slug: menu?.slug ?? '',
      quantity: quantity ?? 1,
    }

    await toast.promise(
      async () => {
        await addToCart(formattedItem, locationId)
        await refreshCart()
      },
      {
        pending: 'Adding item to your cart',
        success: 'Item successfully added to your cart',
        error: 'Unable to add item to your cart',
      }
    )
  }

  return (
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
            <Button variant="contained" color="primary" size="large" onClick={() => handleAddClick(data)}>
              Add to Cart
            </Button>
          </div>
        </div>
      )}
      {!data && menu && (
        <div className={styles.warningContainer}>
          <h1>No such item on the menu</h1>
          <p>You are trying to view an item that does not exist on this menu.</p>
          <Button variant="contained" size="large" color="primary" onClick={() => router.push(`${menusRoutePath}/${menu.slug}`)}>
            View Items
          </Button>
        </div>
      )}
      {!menu && (
        <div className={styles.warningContainer}>
          <h1>This menu does not exist</h1>
          <p>It seems the menu you are attempting to access does not exist. Please check your URL and try again.</p>
          <Button variant="contained" size="large" color="primary" onClick={() => router.push(menusRoutePath)}>
            View Menus
          </Button>
        </div>
      )}
    </div>
  )
}
