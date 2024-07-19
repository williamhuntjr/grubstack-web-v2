'use client'

import React, { FC, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import { IItem, IIngredient } from 'common/types'
import { instanceOfSelectorIngredient } from 'common/utils/cart.utils'
import { IngredientSelector } from './ingredient-selector/ingredient-selector'
import { IItemCustomizer } from './item-customizer.types'
import { ISelectorIngredient } from './ingredient-selector/ingredient-selector.types'
import styles from './item-customizer.module.scss'
import { IngredientState } from './ingredient-selector/ingredient-selector.constants'
import { ICartItem } from '../cart.types'

export const ItemCustomizer: FC<IItemCustomizer> = ({ data, onAddItemToCart, quantity, buttonLabel }) => {
  const [cartItem, setCartItem] = useState<ICartItem>()

  const formatIngredients = (ingredients: IIngredient[] | ISelectorIngredient[]): ISelectorIngredient[] => {
    return ingredients.map((ingredient) => {
      let disabled = []

      if (ingredient.is_optional && !ingredient.is_addon && !ingredient.is_extra) {
        disabled.push(IngredientState.Extra)
      }

      if (instanceOfSelectorIngredient(ingredient)) {
        return ingredient
      }

      return {
        ...ingredient,
        state: ingredient.is_addon ? IngredientState.None : IngredientState.Regular,
        disabled: disabled,
        cost: 0,
      }
    })
  }

  const formatItem = (cartItem: IItem): ICartItem => {
    const formattedItem: ICartItem = {
      id: cartItem.id ?? '',
      name: cartItem.name,
      description: cartItem.description,
      slug: cartItem.slug,
      thumbnail_url: cartItem.thumbnail_url,
      price: cartItem.price ?? 0,
      sale_price: cartItem.sale_price ?? 0,
      is_onsale: cartItem.is_onsale ?? false,
      menu_id: cartItem.menu_id ?? '',
      menu_slug: cartItem.menu_slug ?? '',
      quantity: quantity ?? 1,
      ingredients: formatIngredients(cartItem.ingredients ?? []) ?? [],
      varieties: cartItem.varieties ?? [],
    }

    return formattedItem
  }

  const init = () => {
    setCartItem(formatItem(data))
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
