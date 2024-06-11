'use client'

import { FC } from 'react'
import { Bebas_Neue } from 'next/font/google' 
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import StarOutlineIcon from '@mui/icons-material/StarOutline'
import PlaceIcon from '@mui/icons-material/Place'
import { cls } from 'common/utils/utils'
import { IMobileNav } from './mobile-nav.types'
import styles from './mobile-nav.module.scss'

const bebas_neue = Bebas_Neue({
  variable: '--font-bebas-neue',
  subsets: ['latin'],
  weight: "400"
})

export const MobileNav: FC<IMobileNav> = ({ onOpenLocations }) => {
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0 }} className={cls(styles.mobileNavBar, bebas_neue.variable)}>
      <Toolbar className={styles.mobileNavToolbar}>
        <IconButton aria-label="open drawer" className={styles.mobileNavButton}>
          <SearchIcon className={styles.navIcon} />
          Search
        </IconButton>
        <IconButton aria-label="open drawer" className={styles.mobileNavButton}>
          <MenuBookIcon className={styles.navIcon} />
          Menus
        </IconButton>
        <IconButton aria-label="open drawer" className={styles.mobileNavButton}>
          <StarOutlineIcon className={styles.navIcon} />
          Popular
        </IconButton>
        <IconButton aria-label="open drawer" className={styles.mobileNavButton} onClick={onOpenLocations}>
          <PlaceIcon className={styles.navIcon} />
          Locations
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}