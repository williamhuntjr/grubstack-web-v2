import { IVariety } from 'common/types'
import { OrderType } from './cart.constants'
import { ISelectorIngredient } from './item-customizer/ingredient-selector/ingredient-selector.types'

export interface ICartItem {
  id: string
  slug: string
  name: string
  description: string
  quantity: number
  price: number
  thumbnail_url: string
  item_id: string
  menu_id: string
  menu_slug: string
  sale_price: number
  is_onsale: boolean
  ingredients: ISelectorIngredient[]
  varieties: IVariety[]
}

export interface ICartState {
  items: ICartItem[]
  order_type: OrderType|null
}

export interface ICart {
  locationId: string
}