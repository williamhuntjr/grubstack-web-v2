'use client'

import { nanoid } from 'nanoid'
import { defaultCartState } from './cart.constants'
import { ICartItem, ICartState } from './cart.types'

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

  const parsedCart = getCart(locationId)
  let finalCart = { ...parsedCart }

  parsedCart.items.forEach((item: ICartItem, index: number) => {
    if (JSON.stringify({ ...item, id: '', quantity: 0 }) == JSON.stringify({ ...cartItem, id: '', quantity: 0 }) && !addedToCart) {
      finalCart.items[index].quantity += cartItem.quantity
      addedToCart = true
    }
  })

  if (addedToCart) {
    finalCart = { ...parsedCart, items: finalCart.items.filter((item) => item.id != itemId) }
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
