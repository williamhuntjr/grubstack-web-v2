'use client'

import React, { FC } from 'react'
import { useRouter } from 'next/navigation'
import { ICardList } from './card-list.types'
import styles from './card-list.module.scss'

export const CardList: FC<ICardList> = ({ data, title, route }) => {
  const router = useRouter()

  return (
    <div className={styles.cardList}>
      <h1>{title}</h1>
      <div className={styles.listContainer}>
        <ul className={styles.itemList}>
          {data.map((item, index) => (
            <li key={index} onClick={() => router.push(`${route}/${item.slug}`)}>
              <div className={styles.itemCard}>
                <img src={item.thumbnail_url} alt={item.name} />
                <div className={styles.itemDetails}>
                  <h3>{item.name}</h3>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
