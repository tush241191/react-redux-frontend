import React, {useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {addItem, removeItem, updateItem} from '../../../store/cartSlice'
import {updateDevice} from '../../../store/deviceSlice'
import {RootState} from '../../../store/store'
import {CartItem, Device} from '../types'

interface DeviceInfoProps {
  device: Device;
  showModal: boolean;
  toggleModal: () => void;

}

type Action = 'INCREMENT' | 'DECREMENT'

const DeviceInfo = ({device, showModal, toggleModal}: DeviceInfoProps) => {
  const deviceData = useRef<Device>(device)
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const originalDeviceItems = useSelector((state: RootState) => state.device.items)
  const originalDeviceItem = originalDeviceItems.find(deviceItem => deviceItem.id === deviceData.current.id)

  const updateDeviceQuantity = (quantity: number) => {
    if (!originalDeviceItem) return
    const updatedDevice: Device = {...deviceData.current}
    updatedDevice.inStock = originalDeviceItem.inStock - quantity
    deviceData.current = updatedDevice
    dispatch(updateDevice(deviceData.current))
  }

  const handleAdd = () => {
    const cartItem: CartItem = {
      ...deviceData.current,
      quantity: 1
    }
    dispatch(addItem(cartItem))
    updateDeviceQuantity(1)
  }

  const handleRemove = () => {
    const cartItem = cartItems.find(item => item.id === deviceData.current.id)
    if (cartItem) dispatch(removeItem(cartItem))
    updateDeviceQuantity(0)
  }

  const updateQuantity = (action: Action) => {
    const cartItem = cartItems.find(item => item.id === deviceData.current.id)

    if (cartItem && originalDeviceItem) {
      let quantity = cartItem.quantity

      if (action === 'INCREMENT') {
        quantity++
      } else if (action === 'DECREMENT') {
        quantity--
      }

      if (quantity <= 0) {
        handleRemove()
        return
      }

      if (quantity >= originalDeviceItem.inStock) {
        quantity = originalDeviceItem.inStock
      }

      const updatedCartItem = {...cartItem}
      updatedCartItem.quantity = quantity
      dispatch(updateItem(updatedCartItem))
      updateDeviceQuantity(quantity)
    }
  }

  const showQuantity = () => {
    const cartItem = cartItems.find(item => item.id === deviceData.current.id)
    if(cartItem) return cartItem.quantity
  }

  const isInCart = () => {
    const isExist = cartItems.some(item => item.id === deviceData.current.id)
    if (isExist) {
      return (
        <>
          <span className="inline-flex rounded-md shadow-sm isolate">
            <button
              onClick={() => updateQuantity('INCREMENT')}
              type="button"
              className="relative inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              +
            </button>
            <button
              type="button"
              className="relative inline-flex items-center px-3 py-2 -ml-px text-sm font-semibold text-gray-900 bg-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              {showQuantity()}
            </button>
            <button
              onClick={() => updateQuantity('DECREMENT')}
              type="button"
              className="relative inline-flex items-center px-3 py-2 -ml-px text-sm font-semibold text-gray-900 bg-white rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              -
            </button>
          </span>
          <button
            onClick={() => handleRemove()}
            type="button"
            className="px-4 py-2 text-sm font-semibold text-white bg-green-600 rounded shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
          >
            Remove from cart
          </button>
        </>
      )
    } else {
      return (
        <button
          onClick={() => handleAdd()}
          type="button"
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
          Add to cart
        </button>
      )
    }
  }

  return (
    <div
      className={`relative z-10 ${!showModal && 'hidden'}`}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 transition-opacity bg-gray-800 bg-opacity-75"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
          <div className="min-h-[240px] relative px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
              <button
                onClick={() => toggleModal()}
                type="button"
                className="text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="sr-only">Close</span>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full h-full sm:flex sm:items-start">
              <div className="w-full mt-6 text-center sm:text-left">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h3
                      className="text-3xl font-semibold leading-6 text-gray-900"
                      id="modal-title"
                    >
                      {deviceData.current.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <h4
                      className="text-base font-semibold leading-6 text-gray-500"
                      id="modal-title"
                    >
                      ${deviceData.current.price}
                    </h4>
                    <div className="flex items-center justify-center px-2 py-1 bg-gray-700 rounded-sm">
                      <h4
                        className="text-sm font-semibold leading-6 text-gray-100"
                        id="modal-title"
                      >
                        {`In stock: ${deviceData.current.inStock}`}
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <p className="text-xl text-gray-500">{deviceData.current.description}</p>
                </div>
              </div>
            </div>
            <div className="absolute flex items-center gap-x-4 bottom-4 right-4">
              {isInCart()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DeviceInfo
