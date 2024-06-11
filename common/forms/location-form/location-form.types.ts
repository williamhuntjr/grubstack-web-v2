import { ILocation } from "common/types"

export interface ILocationForm {
  onSelect(id: string): void
  location?: ILocation
}