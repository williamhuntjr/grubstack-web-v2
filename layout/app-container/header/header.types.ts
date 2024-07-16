import { IProperty } from 'common/types'
import { ICartState } from 'modules/cart/cart.types'

export interface IHeader {
  onOpenLocations: () => void
  properties: IProperty[]
}
