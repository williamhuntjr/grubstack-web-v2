import { IItem } from 'common/types'
import { ICartItem } from '../cart.types'

export interface IItemCustomizer {
  data: IItem | ICartItem
  onAddItemToCart(data: ICartItem): void
  quantity?: number
  buttonLabel?: string
}
