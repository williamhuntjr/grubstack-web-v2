'use client'

import { FC } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button'
import { addToCart } from 'common/actions/cart'
import { IItem } from 'common/types'
import { useCart } from 'common/hooks/cart.hook'
import { menusRoutePath } from './menus.constants'
import { IMenus } from './menus.types'
import styles from './menus.module.scss'
import { CardList } from 'common/components/card-list/card-list'

export const Menus: FC<IMenus> = ({ data, featuredItem, locationId }) => {
  const router = useRouter()

  const { setCart } = useCart()

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
      menu_id: cartItem.menu_id ?? '',
      menu_slug: cartItem.menu_slug ?? '',
      quantity: 1,
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
    <>
      {featuredItem && (
        <div className={styles.featuredItemContainer}>
          <div className={styles.featuredItem}>
            <h1>Featured Item</h1>
            <div className={styles.featuredItemInfo}>
              <div className={styles.itemThumbnail}>
                <img src={featuredItem.thumbnail_url} alt="" />
              </div>
              <div className={styles.itemDetails}>
                <h3>{featuredItem.name}</h3>
                <p>{featuredItem.description}</p>
                <div className={styles.buttonContainer}>
                  <Button variant="contained" color="primary" size="large" onClick={() => void handleAddClick(featuredItem)}>
                    Add to Cart
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => router.push(`${menusRoutePath}/${featuredItem.menu_slug}/${featuredItem.slug}`)}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div className={styles.menusList}>
          <CardList title="Location Menus" route={menusRoutePath} data={data} />
        </div>
      )}
      {data.length <= 0 && (
        <div className={styles.warningContainer}>
          <h1>No menus to display</h1>
          <p>You should try to select a different location to view more results.</p>
        </div>
      )}
    </>
  )
}
