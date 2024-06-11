'use client'

import { FC } from 'react'
import Link from 'next/link'
import { Bebas_Neue } from 'next/font/google' 
import Divider from '@mui/material/Divider'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import PlaceIcon from '@mui/icons-material/Place';
import { cls } from 'common/utils/utils'
import { IHeader } from './header.types'
import styles from './header.module.scss'

const bebas_neue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: "400"
})

export const Header: FC<IHeader> = ({ onOpenLocations }): JSX.Element => {
  return (
    <div className={cls(styles.header, bebas_neue.variable)}>
      <div className={styles.headerContent}>
        <div className={styles.logo}>
          <img src="https://cdn.grubstack.app/9fa974f0-b13d-46ba-9a9e-227cb3c218f7/bobs-burgers-dark-06_05_2024_15:19:15.png" alt="" />
        </div>
        <Divider className={styles.divider}/>
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
            <SearchIcon className={styles.icon}/> Search
          </Link>
          <Link href="/" className={cls(styles.iconLink, styles.menuLink)}>
            <MenuBookIcon className={styles.icon}/> Menus
          </Link>
          <Link href="/" className={cls(styles.iconLink, styles.popularLink)}>
            <StarOutlineIcon className={styles.icon}/> Popular
          </Link>
          <Link href="#" onClick={onOpenLocations} className={cls(styles.iconLink, styles.locationsLink)}>
            <PlaceIcon className={styles.icon}/> Locations
          </Link>
          <Link href={`/cart`} className={cls(styles.iconLink, styles.cartLink)}>
            <Badge badgeContent={1} color="secondary" className={styles.badge}>
              <ShoppingCartIcon className={styles.cartIcon} fontSize="large"/>
            </Badge>
            My Cart
          </Link>
        </div>
      </div>
    </div>
  )
}