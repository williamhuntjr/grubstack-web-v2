import { IItem, IMenu } from 'common/types'

export interface IItemDetails {
  data: IItem | undefined
  menu: IMenu | undefined
  locationId: string
}
