import React, { FC, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { cls } from 'common/utils/utils'
import { showDecimal } from 'common/utils/number.utils'
import { IIngredientSelector, ISelectorIngredient } from './ingredient-selector.types'
import styles from './ingredient-selector.module.scss'
import { IngredientState } from './ingredient-selector.constants'

export const IngredientSelector: FC<IIngredientSelector> = ({ data, onUpdate }) => {
  const [state, setState] = useState<ISelectorIngredient[]>(data)

  const generateIngredientsCost = (): void => {
    let ingredientsList = [...state]

    ingredientsList.forEach((ingredient) => {
      let cost = 0
      if (ingredient.is_extra && ingredient.state == IngredientState.Extra) {
        cost = ingredient.price
      }
      if (ingredient.is_addon) {
        if (ingredient.state == IngredientState.Regular) {
          cost = ingredient.price
        } else if (ingredient.state == IngredientState.Extra) {
          cost = ingredient.price * 2
        }
      }
      ingredient.cost = cost
    })

    setState(ingredientsList)
  }

  const handleClick = (ingredientId: string, updatedState: IngredientState) => {
    let ingredientsList = [...state]

    ingredientsList.forEach((ingredient) => {
      if (ingredient.id == ingredientId) {
        ingredient.state = updatedState
      }
    })

    setState(ingredientsList)
    generateIngredientsCost()
  }

  useEffect(() => setState(data), [data])
  useEffect(() => onUpdate(state), [state])

  return (
    <div className={styles.ingredientSelectorContainer}>
      {state.map((ingredient, index) => {
        if (ingredient.is_optional || ingredient.is_extra || ingredient.is_addon) {
          return (
            <div className={styles.ingredient} key={`ingredient-${index}`}>
              <div className={styles.ingredientDetails}>
                <img src={ingredient.thumbnail_url} alt={ingredient.name} className={styles.thumbnail} />
                <p className={styles.name}>
                  {ingredient.name} {ingredient.cost > 0 ? `(+$${showDecimal(ingredient.cost)})` : ''}
                </p>
              </div>
              <ButtonGroup variant="outlined" aria-label="Basic button group" className={styles.buttons}>
                <Button
                  onClick={() => handleClick(ingredient.id!, IngredientState.None)}
                  disabled={ingredient.disabled.includes(IngredientState.None)}
                  className={cls(styles.button, ingredient.state == IngredientState.None ? styles.activeButton : '')}
                >
                  None
                </Button>
                <Button
                  onClick={() => handleClick(ingredient.id!, IngredientState.Regular)}
                  disabled={ingredient.disabled.includes(IngredientState.Regular)}
                  className={cls(styles.button, ingredient.state == IngredientState.Regular ? styles.activeButton : '')}
                >
                  Regular
                </Button>
                <Button
                  onClick={() => handleClick(ingredient.id!, IngredientState.Extra)}
                  disabled={ingredient.disabled.includes(IngredientState.Extra)}
                  className={cls(styles.button, ingredient.state == IngredientState.Extra ? styles.activeButton : '')}
                >
                  Extra
                </Button>
              </ButtonGroup>
            </div>
          )
        }
      })}
    </div>
  )
}
