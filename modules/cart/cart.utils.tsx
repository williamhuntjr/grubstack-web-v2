'use client'

import { nanoid } from 'nanoid'
import Chip from '@mui/material/Chip'
import { IItem, IIngredient } from 'common/types'
import { ISelectorIngredient } from './item-customizer/ingredient-selector/ingredient-selector.types'
import { IngredientState } from './item-customizer/ingredient-selector/ingredient-selector.constants'
import { defaultCartState } from './cart.constants'
import { ICartItem, ICartState } from './cart.types'
import styles from './cart.module.scss'

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

export function getCart(locationId: string): ICartState {
  const localStorageData = localStorage.getItem(`cart-${locationId}`)
  const parsedData = localStorageData != null ? JSON.parse(localStorageData) : defaultCartState

  return parsedData
}

export function setCart(locationId: string, cart: ICartState) {
  const cartName = `cart-${locationId}`
  localStorage.setItem(cartName, JSON.stringify(cart))
}

export function addToCart(item: ICartItem, locationId: string) {
  item.item_id = item.id
  item.id = nanoid()

  const parsedCart = getCart(locationId)

  let finalCart = { ...parsedCart }
  let addedToCart = false

  parsedCart.items.forEach((cartItem: ICartItem, index: number) => {
    if (JSON.stringify({ ...cartItem, id: '', quantity: 0 }) == JSON.stringify({ ...item, id: '', quantity: 0 }) && !addedToCart) {
      finalCart.items[index].quantity += item.quantity
      addedToCart = true
    }
  })

  if (!addedToCart) {
    finalCart = {
      ...parsedCart,
      items: [...parsedCart.items, item],
    }
  }
  setCart(locationId, finalCart)
}

export async function updateQuantity(locationId: string, itemId: string, quantity: number) {
  const parsedCart = getCart(locationId)
  const newItems = parsedCart.items.map((item) => {
    if (item.id == itemId) {
      return {
        ...item,
        quantity: quantity,
      }
    }
    return item
  })
  const finalCart = { ...parsedCart, items: newItems }

  setCart(locationId, finalCart)
}

export async function removeFromCart(locationId: string, itemId: string) {
  const parsedCart = getCart(locationId)
  let finalCart = { ...parsedCart }

  finalCart.items = parsedCart.items.filter((item) => item.id != itemId)

  setCart(locationId, finalCart)
}

export async function emptyCart(locationId: string) {
  setCart(locationId, defaultCartState)
}

export async function updateItem(locationId: string, itemId: string, cartItem: ICartItem) {
  let addedToCart = false
  let updatedId = undefined

  const parsedCart = getCart(locationId)
  let finalCart = { ...parsedCart }

  parsedCart.items.forEach((item: ICartItem, index: number) => {
    if (JSON.stringify({ ...item, id: '', quantity: 0 }) == JSON.stringify({ ...cartItem, id: '', quantity: 0 }) && !addedToCart) {
      if (item.id != itemId) { finalCart.items[index].quantity += cartItem.quantity }
      addedToCart = true
      updatedId = finalCart.items[index].id
    }
  })

  if (addedToCart) {
    if (updatedId != itemId) {
      finalCart = { ...parsedCart, items: finalCart.items.filter((item) => item.id != itemId) }
    } else {
      finalCart = { ...parsedCart, items: finalCart.items }
    }
  } else {
    const newItems = parsedCart.items.map((item) => {
      if (item.id == itemId) {
        return cartItem
      } else {
        return item
      }
    })

    finalCart = { ...parsedCart, items: newItems }
  }

  setCart(locationId, finalCart)
}

export function checkItemForOptionalIngredients(cartItem: IItem): boolean {
  let hasOptions:boolean = false
  cartItem.ingredients?.forEach((ingredient) => {
    if (ingredient.is_optional || ingredient.is_addon || ingredient.is_extra) {
      hasOptions = true
    }
  })
  
  return hasOptions
}

export function formatIngredients(ingredients: IIngredient[] | ISelectorIngredient[]): ISelectorIngredient[] {
  return ingredients.map((ingredient) => {
    let disabled = []

    if (!ingredient.is_optional) {
      disabled.push(IngredientState.None)
    }

    if (ingredient.is_optional && !ingredient.is_addon && !ingredient.is_extra) {
      disabled.push(IngredientState.Extra)
    }

    if (instanceOfSelectorIngredient(ingredient)) {
      return ingredient
    }

    return {
      ...ingredient,
      state: ingredient.is_addon ? IngredientState.None : IngredientState.Regular,
      disabled: disabled,
      cost: 0,
    }
  })
}

export function formatItem(cartItem: IItem, quantity: number): ICartItem {
  const formattedItem: ICartItem = {
    id: cartItem.id ?? '',
    name: cartItem.name,
    description: cartItem.description,
    slug: cartItem.slug,
    thumbnail_url: cartItem.thumbnail_url,
    price: cartItem.price ?? 0,
    sale_price: cartItem.sale_price ?? 0,
    is_onsale: cartItem.is_onsale ?? false,
    item_id: cartItem.item_id ?? '',
    menu_id: cartItem.menu_id ?? '',
    menu_slug: cartItem.menu_slug ?? '',
    quantity: quantity ?? 1,
    ingredients: formatIngredients(cartItem.ingredients ?? []) ?? [],
    varieties: cartItem.varieties ?? [],
  }

  return formattedItem
}

export function generateChips(item: ICartItem): JSX.Element {
  return (
    <ul className={styles.chipList}>
      {item.ingredients.map((ingredient, index) => {
        if (ingredient.is_optional || ingredient.is_extra || ingredient.is_addon) {
          if (ingredient.is_extra) {
            if (ingredient.state == IngredientState.Extra) {
              return (
                <li key={`chip-${index}`}>
                  <Chip color="secondary" label={`Extra ${ingredient.name}`} />
                </li>
              )
            }
          }

          if (ingredient.is_optional && ingredient.is_extra && !ingredient.is_addon) {
            if (ingredient.state == IngredientState.None) {
              return (
                <li key={`chip-${index}`}>
                  <Chip color="secondary" label={`No ${ingredient.name}`} />
                </li>
              )
            }
          }

          if (ingredient.is_addon && ingredient.state != IngredientState.None) {
            if (ingredient.state == IngredientState.Regular) {
              return (
                <li key={`chip-${index}`}>
                  <Chip color="secondary" label={`Add ${ingredient.name}`} />
                </li>
              )
            }
            if (ingredient.state == IngredientState.Extra) {
              return (
                <li key={`chip-${index}`}>
                  <Chip color="secondary" label={`Extra ${ingredient.name}`} />
                </li>
              )
            }
          }

          if (ingredient.is_optional && !ingredient.is_extra && !ingredient.is_addon) {
            if (ingredient.state == IngredientState.None) {
              return (
                <li key={`chip-${index}`}>
                  <Chip color="secondary" label={`No ${ingredient.name}`} />
                </li>
              )
            }
          }
        }
      })}
    </ul>
  )
}