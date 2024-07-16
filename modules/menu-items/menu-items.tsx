'use client'

import React, { FC } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@mui/material/Button'
import { CardList } from 'common/components/card-list/card-list'
import { menusRoutePath } from 'modules/menus/menus.constants'
import { IMenuItems } from './menu-items.types'
import styles from './menu-items.module.scss'

export const MenuItems: FC<IMenuItems> = ({ data }) => {
  const router = useRouter()

  return (
    <div className={styles.menuItemsContainer}>
      {!data && (
        <div className={styles.warningContainer}>
          <h1>This menu does not exist</h1>
          <p>It seems the menu you are attempting to access does not exist. Please check your URL and try again.</p>
          <Button variant="contained" size="large" color="primary" onClick={() => router.push(menusRoutePath)}>
            View Menus
          </Button>
        </div>
      )}
      {data && (
        <div className={styles.menuItemsList}>
          <CardList title="Menu Items" route={`${menusRoutePath}/${data.slug}`} data={data.items ?? []} />
        </div>
      )}
    </div>
  )
}
