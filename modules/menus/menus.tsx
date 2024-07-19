'use client'

import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button'
import { IItem } from 'common/types'
import { useCart } from 'common/hooks/cart.hook'
import { useDialog } from 'common/hooks/dialog.hook'
import { CardList } from 'common/components/card-list/card-list'
import { IMenu } from 'common/types'
import { GrubDialog } from 'common/components/grub-dialog/grub-dialog'
import { ICartItem } from 'modules/cart/cart.types'
import { ItemCustomizer } from 'modules/cart/item-customizer/item-customizer'
import { getCart, addToCart } from 'modules/cart/cart.utils'
import { menusRoutePath } from './menus.constants'
import { IMenus } from './menus.types'
import styles from './menus.module.scss'

export const Menus: FC<IMenus> = ({ data, featuredItem, locationId }) => {
  const [menus, setMenus] = useState<IMenu[]>([])

  const router = useRouter()

  const {
    open: itemCustomizerOpen,
    openDialog: openItemCustomizer,
    closeDialog: closeItemCustomizer,
    data: itemCustomizerData,
  } = useDialog<IItem>()

  const { setCart } = useCart()

  const refreshCart = () => {
    const cartData = getCart(locationId)

    if (cartData) {
      setCart(cartData)
    }
  }

  const handleAddClick = async (cartItem: ICartItem): Promise<void> => {
    try {
      addToCart(cartItem, locationId)
      refreshCart()
      toast.success('Item successfully added to your cart')
      closeItemCustomizer()
    } catch (e) {
      console.error(e)
    }
  }

  const init = () => {
    let menusList: IMenu[] = []

    data?.forEach((menu) => {
      if (menu.items && menu.items.length > 0) {
        menusList.push(menu)
      }
    })

    setMenus(menusList)
  }

  useEffect(() => init(), [])

  return (
    <>
      <GrubDialog open={itemCustomizerOpen} onClose={closeItemCustomizer} title={'Customize Item'}>
        <ItemCustomizer data={itemCustomizerData} onAddItemToCart={(cartItem: ICartItem) => handleAddClick(cartItem)} />
      </GrubDialog>
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
                  <Button variant="contained" color="primary" size="large" onClick={() => openItemCustomizer(featuredItem)}>
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
      {menus.length > 0 && (
        <div className={styles.menusList}>
          <CardList title="Location Menus" route={menusRoutePath} data={menus} />
        </div>
      )}
      {menus.length <= 0 && (
        <div className={styles.warningContainer}>
          <h1>No menus to display</h1>
          <p>You should try to select a different location to view more results.</p>
        </div>
      )}
    </>
  )
}
