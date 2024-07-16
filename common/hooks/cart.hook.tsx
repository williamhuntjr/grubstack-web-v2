import { defaultCartState } from 'modules/cart/cart.constants'
import { ICartState } from 'modules/cart/cart.types'
import { createContext, useContext, useEffect, useMemo, useState, Dispatch, SetStateAction } from 'react'

interface CartContextProps {
  cart: ICartState
  setCart: Dispatch<SetStateAction<ICartState>>
}

const CartContext = createContext<CartContextProps>({
  cart: defaultCartState,
  setCart: (prevState: SetStateAction<ICartState>) => prevState,
})

interface CartProviderProps {
  children: React.ReactNode
  initialValue: ICartState
}

function CartProvider({ initialValue, children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<ICartState>(initialValue ?? defaultCartState)

  const value = useMemo(() => ({ cart, setCart }), [cart, setCart])

  useEffect(() => setCart(initialValue), [initialValue])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

const CartConsumer = CartContext.Consumer

const useCart = () => useContext(CartContext)

export { CartProvider, CartConsumer, useCart }
