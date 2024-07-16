'use client'

import { FC } from 'react'
import Link from 'next/link'
import Divider from '@mui/material/Divider'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PlaceIcon from '@mui/icons-material/Place'
import { cls, getProperty } from 'common/utils/utils'
import { appConfig } from 'common/config'
import { generateQuantity } from 'common/utils/cart.utils'
import { useCart } from 'common/hooks/cart.hook'
import { menusRoutePath } from 'modules/menus/menus.constants'
import { IHeader } from './header.types'
import styles from './header.module.scss'

export const Header: FC<IHeader> = ({ onOpenLocations, properties }): JSX.Element => {
  const { cart } = useCart()

  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <Link href="/">
            <img src={getProperty(properties, 'logo_image_url') ?? `${appConfig.productionUrl}/img/grubstack-logo-dark.png`} alt="" />
          </Link>
        </div>
        <Divider className={styles.divider} />
        <div className={styles.searchField}>
          <Input
            placeholder="What are you craving?"
            className={styles.searchInput}
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon className={styles.searchIcon} />
              </InputAdornment>
            }
          />
        </div>
        <div className={styles.navLinks}>
          <Link href="/" className={cls(styles.iconLink, styles.searchLink)}>
            <SearchIcon className={styles.icon} /> Search
          </Link>
          <Link href={menusRoutePath} className={cls(styles.iconLink, styles.menuLink)}>
            <MenuBookIcon className={styles.icon} /> Menus
          </Link>
          <Link href="/" className={cls(styles.iconLink, styles.popularLink)}>
            <StarOutlineIcon className={styles.icon} /> Popular
          </Link>
          <Link href="#" onClick={onOpenLocations} className={cls(styles.iconLink, styles.locationsLink)}>
            <PlaceIcon className={styles.icon} /> Locations
          </Link>
          <Link href={`/cart`} className={cls(styles.iconLink, styles.cartLink)}>
            <Badge badgeContent={generateQuantity(cart)} color="secondary" className={styles.badge}>
              <ShoppingCartIcon className={styles.cartIcon} fontSize="large" />
            </Badge>
            My Cart
          </Link>
        </div>
      </div>
    </div>
  )
}
