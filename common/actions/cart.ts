'use server'

import { cookies } from 'next/headers'
import { nanoid } from 'nanoid'
import { defaultCartState } from 'modules/cart/cart.constants'
import { ICartItem, ICartState } from 'modules/cart/cart.types'

async function setCart(locationId: string, cart: ICartState) {
  const cartCookie = `cart-${locationId}`
  cookies().set({
    name: cartCookie,
    value: JSON.stringify(cart),
    httpOnly: true,
    path: '/',
  })
}

export async function getCart(locationId: string) {
  const cartCookie = `cart-${locationId}`

  const hasCookie = cookies().has(cartCookie)
  if (hasCookie) {
    const cookie = cookies().get(cartCookie)
    return JSON.parse(cookie?.value ?? '') as ICartState
  } else {
    return defaultCartState
  }
}

export async function addToCart(item: ICartItem, locationId: string) {
  item.id = nanoid()

  const parsedCart = await getCart(locationId)

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
  const parsedCart = await getCart(locationId)
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
  const parsedCart = await getCart(locationId)
  let finalCart = { ...parsedCart }

  finalCart.items = parsedCart.items.filter((item) => item.id != itemId)

  setCart(locationId, finalCart)
}

export async function emptyCart(locationId: string) {
  setCart(locationId, defaultCartState)
}
