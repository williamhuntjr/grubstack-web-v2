export interface ICartItem {
  id: string
  slug: string
  name: string
  quantity: number
  price: number
  thumbnail_url: string
  menu_id: string
  menu_slug: string
  sale_price: number
  is_onsale: boolean
}

export interface ICartState {
  items: ICartItem[]
}

export interface ICart {
  data: ICartState
  locationId: string
}
