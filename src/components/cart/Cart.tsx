import React from 'react'
import {useDispatch} from 'react-redux'

import {CartItem} from '../../features/landing/types'
import {removeItem} from '../../store/cartSlice'
import {updateDevice} from '../../store/deviceSlice'
import {calculatePrice} from '../../utils/utils'

interface CartProps {
  items: CartItem[];
}
const Cart = ({items}: CartProps) => {
  const dispatch = useDispatch()

  //Static default images for category
  const getCategoryImage = (category: string) => {
    switch (category) {
      case 'Phone':
        return 'phone.png'
      case 'Computer':
        return 'computer.png'
      case 'Tablet':
        return 'tablet.png'
      default:
        break
    }
  }

  const handleRemove = (cartItem: CartItem) => {
    if (cartItem) {
      dispatch(removeItem(cartItem))
      dispatch(updateDevice(cartItem))
    }
  }
  return (
    <ul className="flex-1 overflow-y-auto divide-y divide-gray-200">
      {items.map(item =>
        <li key={item.id} className="flex py-6">
          <div className="flex-shrink-0 w-20 h-20 overflow-hidden border border-gray-200 rounded-md">
            <img
              src={getCategoryImage(item.category)}
              alt=""
              className="object-contain object-center w-full h-full p-3"
            />
          </div>
          <div className="flex flex-col flex-1 min-h-[96px] ml-4">
            <div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <h3>
                  <p>{item.name}</p>
                </h3>
                <p className="ml-4">{`$${calculatePrice(
                  item.quantity,
                  item.price
                )}`}</p>
              </div>
              <p className="mt-1 text-sm text-gray-500 truncate">
                {item.description}
              </p>
            </div>
            <div className="flex items-end justify-between flex-1 text-sm">
              <p className="text-gray-500">Qty {item.quantity}</p>

              <div className="flex">
                <button
                  onClick={() => handleRemove(item)}
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </li>
      )}
    </ul>
  )
}

export default Cart
