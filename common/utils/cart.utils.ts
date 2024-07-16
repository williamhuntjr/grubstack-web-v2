import { ICartState, ICartItem } from 'modules/cart/cart.types'

export function getPrice(item: ICartItem): number {
  if (item.is_onsale && item.sale_price) {
    return item.sale_price
  }
  if (item.price) {
    return item.price
  }
  return 0
}

export function getQuantity(item: ICartItem): number {
  if (item.quantity) {
    return item.quantity
  }
  return 1
}

export function generatePrice(data: ICartState): number {
  let price = 0

  data.items.forEach((item) => {
    price = price + getPrice(item) * getQuantity(item)
  })
  return price
}

export function generateQuantity(data: ICartState): number {
  let quantity = 0

  data.items.forEach((item) => {
    quantity = quantity + getQuantity(item)
  })
  return quantity
}
