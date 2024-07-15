'use client'

import { FC } from 'react'
import Button from '@mui/material/Button'
import { IMenus } from './menus.types'
import styles from './menus.module.scss'

export const Menus: FC<IMenus> = ({ data, featuredItem }) => {
  return (
    <>
      {featuredItem &&
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
                <Button variant="contained" color="primary" size="large">Add to Cart</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {data.length > 0 &&
      <div className={styles.menusContainer}>
        <h1>Location Menus</h1>
        <div className={styles.menusInfo}>
          <ul className={styles.listContainer}>
            {data.map((menu, index) => 
            <li key={index}>
              <div className={styles.cardContainer}>
                <img src={menu.thumbnail_url} alt={menu.name} />
                <div className={styles.menuDetails}>
                  <h3>{menu.name}</h3>
                </div>
              </div>
            </li>
            )}
          </ul>
        </div>
      </div>
      }
      {data.length <= 0 &&
      <div className={styles.warningContainer}>
        <h1>No menus to display</h1>
        <p>You should try to select a different location to view more results.</p>
      </div>
      }
    </>
  )
}