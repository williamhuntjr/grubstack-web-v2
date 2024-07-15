import { IProperty } from 'common/types'

export interface IHeader {
  onOpenLocations: () => void
  properties: IProperty[]
}