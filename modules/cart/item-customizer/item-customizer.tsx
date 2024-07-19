'use client'

import React, { FC, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { formatItem } from '../cart.utils'
import { IngredientSelector } from './ingredient-selector/ingredient-selector'
import { IItemCustomizer } from './item-customizer.types'
import { ISelectorIngredient } from './ingredient-selector/ingredient-selector.types'
import styles from './item-customizer.module.scss'
import { ICartItem } from '../cart.types'

export const ItemCustomizer: FC<IItemCustomizer> = ({ data, onAddItemToCart, quantity, buttonLabel }) => {
  const [cartItem, setCartItem] = useState<ICartItem>()

  const init = () => {
    setCartItem(formatItem(data, quantity ?? 1))
  }

  const handleUpdateIngredients = (ingredients: ISelectorIngredient[]) => {
    if (cartItem) {
      setCartItem({
        ...cartItem,
        ingredients: ingredients,
      })
    }
  }

  useEffect(() => init(), [])

  return (
    <div className={styles.itemCustomizerContainer}>
      <div className={styles.itemDetails}>
        <img src={data.thumbnail_url} alt={data.name} />
        <h2>{data.name}</h2>
        <p>{data.description}</p>
        <div className={styles.optionalIngredients}>
          <IngredientSelector data={cartItem?.ingredients ?? []} onUpdate={(ingredients) => handleUpdateIngredients(ingredients)} />
        </div>
      </div>
      <Divider />
      <div className={styles.buttonContainer}>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          className={styles.addButton}
          onClick={() => {
            if (cartItem) {
              onAddItemToCart(cartItem)
            }
          }}
        >
          {buttonLabel ?? 'Add to Cart'}
        </Button>
      </div>
    </div>
  )
}
