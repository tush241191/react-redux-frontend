import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import Modal from '../../../components/modal/Modal'
import useBroadcastChannel from '../../../hooks/useBroadcastChannel'
import {addItem, removeItem, updateItem} from '../../../store/cartSlice'
import {updateDevice} from '../../../store/deviceSlice'
import {RootState} from '../../../store/store'
import {getBroadcastId} from '../../../utils/broadcast'
import {APP_VARIABLES} from '../../../utils/constants'
import {CartItem, Device} from '../types'

interface DeviceInfoProps {
  device: Device;
  showModal: boolean;
  toggleModal: () => void;
}

type Action = 'INCREMENT' | 'DECREMENT'

const DeviceInfo = ({device, showModal, toggleModal}: DeviceInfoProps) => {
  const [deviceData, setDeviceData] = useState<Device>(device)
  const dispatch = useDispatch()
  const cartItems = useSelector((state: RootState) => state.cart.items)
  const originalDeviceItems = useSelector((state: RootState) => state.device.items)

  useEffect(() => {
    setDeviceData(device)
  }, [device])

  if(!deviceData) return null

  const originalDeviceItem = originalDeviceItems.find(
    deviceItem => deviceItem.id === deviceData.id
  )

  const updateDeviceQuantity = (quantity: number) => {
    if (!originalDeviceItem) return
    const updatedDevice: Device = {...deviceData}
    updatedDevice.inStock = originalDeviceItem.inStock - quantity
    setDeviceData(updatedDevice)
    dispatch(updateDevice(updatedDevice))
  }

  const channel = useBroadcastChannel(APP_VARIABLES.DEVICE_CHANNEL_NAME)
  const notifyDataChanged = (message: string) => {
    const broadcastId = getBroadcastId()
    const payload = {
      broadcastId: broadcastId,
      message: message
    }
    if(channel) {
      channel.postMessage({
        type: 'data-changed',
        payload: JSON.stringify(payload)
      })
    }
  }

  const handleAdd = () => {
    const cartItem: CartItem = {
      ...deviceData,
      quantity: 1
    }
    dispatch(addItem(cartItem))
    updateDeviceQuantity(1)
    notifyDataChanged(`${originalDeviceItem?.name} has decreased by 1`)
  }

  const handleRemove = () => {
    const cartItem = cartItems.find(item => item.id === deviceData.id)
    if (cartItem) dispatch(removeItem(cartItem))
    updateDeviceQuantity(0)
  }

  const updateQuantity = (action: Action) => {
    const cartItem = cartItems.find(item => item.id === deviceData.id)

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
    const cartItem = cartItems.find(item => item.id === deviceData.id)
    if(cartItem) return cartItem.quantity
  }

  const isInCart = () => {
    const isExist = cartItems.some(item => item.id === deviceData.id)
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
    <Modal
      onClose={toggleModal}
      visible={showModal}
      className="w-4/5 max-w-[600px] rounded-xl bg-white px-8 py-6"
    >
      <Modal.Header headerText="" onClose={toggleModal} />
      <div className="min-h-[240px] relative">
        <div className="w-full h-full sm:flex sm:items-start">
          <div className="w-full text-left">
            <div className="flex items-center justify-between w-full">
              <div>
                <h3
                  className="text-3xl font-semibold leading-6 text-gray-900"
                  id="modal-title"
                >
                  {deviceData.name}
                </h3>
              </div>
              <div className="flex items-center space-x-4">
                <h4
                  className="text-base font-semibold leading-6 text-gray-500"
                  id="modal-title"
                >
                  ${deviceData.price}
                </h4>
                <div className="flex items-center justify-center px-2 py-1 bg-gray-700 rounded-sm">
                  <h4
                    className="text-sm font-semibold leading-6 text-gray-100"
                    id="modal-title"
                  >
                    {`In stock: ${deviceData.inStock}`}
                  </h4>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-xl text-gray-500">{deviceData.description}</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 flex items-center gap-x-4">
          {isInCart()}
          <button
            onClick={toggleModal}
            type="button"
            className="justify-center hidden w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm sm:inline-flex ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default DeviceInfo
