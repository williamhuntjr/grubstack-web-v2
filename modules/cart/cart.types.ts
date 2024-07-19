import { IVariety } from 'common/types'
import { ISelectorIngredient } from './item-customizer/ingredient-selector/ingredient-selector.types'

export interface ICartItem {
  id: string
  slug: string
  name: string
  description: string
  quantity: number
  price: number
  thumbnail_url: string
  menu_id: string
  menu_slug: string
  sale_price: number
  is_onsale: boolean
  ingredients: ISelectorIngredient[]
  varieties: IVariety[]
}

export interface ICartState {
  items: ICartItem[]
}

export interface ICart {
  locationId: string
}
