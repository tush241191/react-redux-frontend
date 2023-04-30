import React from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {addItem, removeItem} from '../../../store/cartSlice'
import {RootState} from '../../../store/store'
import {Device} from '../types'

interface DeviceTableProps {
  devices: Device[];
}

const DeviceTable = ({devices}: DeviceTableProps) => {
  const dispatch = useDispatch()
  const items = useSelector((state: RootState) => state.cart.items)

  const handleAdd = (device: Device) => {
    dispatch(addItem(device))
  }

  const handleRemove = (device: Device) => {
    dispatch(removeItem(device))
  }

  const isInCart = (device: Device) => {
    const isExist = items.some(item => item.id === device.id)
    if(isExist) {
      return (
        <button
          onClick={() => handleRemove(device)}
          type="button"
          className="px-2 py-1 text-sm font-semibold text-white bg-green-600 rounded shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500"
        >
          Remove from cart
        </button>
      )
    } else {
      return (
        <button
          onClick={() => handleAdd(device)}
          type="button"
          className="px-2 py-1 text-sm font-semibold text-white bg-blue-600 rounded shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
        >
        Add to cart
        </button>
      )
    }
  }

  return (
    <table className="min-w-full divide-y divide-gray-300">
      <thead>
        <tr>
          <th
            scope="col"
            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
          >
            Name
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
          >
            Brand
          </th>
          <th
            scope="col"
            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
          >
            Category
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            Price
          </th>
          <th
            scope="col"
            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
          >
            In stock
          </th>
          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
            <span className="sr-only">Add to cart</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {devices.map(device =>
          <tr key={device.id}>
            <td className="w-full py-4 pl-4 pr-3 text-sm font-medium text-gray-900 max-w-0 sm:w-auto sm:max-w-none sm:pl-0">
              {device.name}
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
              {device.brand}
            </td>
            <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
              {device.category}
            </td>
            <td className="px-3 py-4 text-sm text-gray-500">{`$${device.price}`}</td>
            <td className="px-3 py-4 text-sm text-gray-500">
              {device.inStock}
            </td>
            <td className="w-40">{isInCart(device)}</td>
          </tr>
        )}

        {devices.length === 0 &&
          <tr>
            <td
              colSpan={6}
              className="px-3 py-4 text-sm text-center text-gray-500"
            >
              No Result
            </td>
          </tr>
        }
      </tbody>
    </table>
  )
}

export default DeviceTable
