import React, { FC, useEffect, useState } from 'react'
import { IOrderType } from 'common/types'
import { useCart } from 'common/hooks/cart.hook'
import { getLocationOrderTypes } from 'common/actions/locations'
import { getCart, setCart as setLocalCart } from '../cart.utils'
import { IOrderTypePicker } from './order-type-picker.types'
import { OrderType } from '../cart.constants'
import styles from './order-type-picker.module.scss'

export const OrderTypePicker: FC<IOrderTypePicker> = ({ locationId }) => {
  const [ currentOrderType, setCurrentOrderType ] = useState<OrderType>()
  const [ orderTypes, setOrderTypes ] = useState<IOrderType[]>([])

  const { setCart } = useCart()

  const setCartOrderType = (orderType: OrderType) => {
    const cartData = getCart(locationId)

    const updatedCart = {
      ...cartData,
      order_type: orderType
    }

    setLocalCart(locationId, updatedCart)
    setCart(updatedCart)
    setCurrentOrderType(orderType)
  }

  const init = async() => {
    const orderTypesList = await getLocationOrderTypes(locationId)
    setOrderTypes(orderTypesList)
  
    const cart = getCart(locationId)
    if (cart.order_type != null) {
      setCurrentOrderType(cart.order_type)
    } else {
      if (orderTypesList.length > 0) {
        setCartOrderType(orderTypesList[0].name)
      }
    }
  }

  useEffect(() => void init(), [])

  return (
    <div className={styles.orderTypePicker}>
      <ul className={styles.orderTypesList}>
        {orderTypes.map((orderType, index) => 
          <li
            className={currentOrderType == orderType.name ? styles.activeOrderType : ''}
            role="menuitem"
            key={index}
            onClick={() => setCartOrderType(orderType.name)}
          >{orderType.name}</li>
        )}
      </ul>
    </div>
  )
}