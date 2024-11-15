export const cartRoutePath = '/cart'

export enum OrderType {
  Pickup = 'Pick-up',
  Delivery = 'Delivery'
}

export const defaultCartState = {
  items: [],
  order_type: null,
}

export const defaultCartItem = {
  id: '',
  name: '',
  slug: '',
  description: '',
  quantity: 1,
  price: 0,
  thumbnail_url: '',
  item_id: '',
  menu_id: '',
  menu_slug: '',
  sale_price: 0,
  is_onsale: false,
  ingredients: [],
  varieties: [],
}
