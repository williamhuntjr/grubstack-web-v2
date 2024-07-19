import { ICartState, ICartItem } from 'modules/cart/cart.types'
import { ISelectorIngredient } from 'modules/cart/item-customizer/ingredient-selector/ingredient-selector.types'

export function getPrice(item: ICartItem): number {
  let price = 0

  if (item.is_onsale && item.sale_price) {
    price = item.sale_price
  }
  if (item.price) {
    price = item.price
  }

  item.ingredients.forEach((ingredient) => {
    if (ingredient.cost > 0) {
      price += ingredient.cost
    }
  })
  return price
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

export function instanceOfSelectorIngredient(data: any): data is ISelectorIngredient {
  return 'state' in data
}
