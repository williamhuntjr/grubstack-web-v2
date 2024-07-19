import { IIngredient } from 'common/types'
import { IngredientState } from './ingredient-selector.constants'

export interface ISelectorIngredient extends IIngredient {
  state: IngredientState
  disabled: IngredientState[]
  cost: number
}

export interface IIngredientSelector {
  data: ISelectorIngredient[]
  onUpdate(ingredients: ISelectorIngredient[]): void
}
