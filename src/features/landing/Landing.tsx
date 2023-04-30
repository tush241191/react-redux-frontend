import React, {useEffect, useRef, useState} from 'react'

import {MultiSelectOption} from '../../components/dropdown/types'
import Filter from '../../components/filter/Filter'
import Search from '../../components/filter/Search'
import {DeviceFilterOptions} from '../../components/filter/types'
import {APP_STATUS} from '../../utils/constants'
import {getDevices} from './api'
import {Device, DeviceFilter} from './types'

const options: MultiSelectOption[] = [
  {
    value: DeviceFilterOptions.CATEGORY,
    label: 'Category',
    options: [
      {
        value: 'Phone',
        label: 'Phone'
      },
      {
        value: 'Tablet',
        label: 'Tablet'
      },
      {
        value: 'Computer',
        label: 'Computer'
      }
    ]
  },
  {
    value: DeviceFilterOptions.BRAND,
    label: 'Brand',
    options: [
      {
        value: 'Apple',
        label: 'Apple'
      },
      {
        value: 'Google',
        label: 'Google'
      },
      {
        value: 'Samsung',
        label: 'Samsung'
      },
      {
        value: 'Nokia',
        label: 'Nokia'
      },
      {
        value: 'Microsoft',
        label: 'Microsoft'
      },
      {
        value: 'Redmi',
        label: 'Redmi'
      }
    ]
  }
]

const Landing = () => {
  const [filteredFinalData, setFilteredData] = useState<Device[]>([])
  const devicesData = useRef<DeviceFilter>({
    devices: [],
    filteredData: [],
    searchedData: []
  })

  useEffect(() => {
    fetchDeviceList()
  }, [])

  const fetchDeviceList = () => {
    getDevices()
      .then(response => {
        if(response.status === APP_STATUS.SUCCESS) {
          setFilteredData(response.data)
          devicesData.current = {
            devices: response.data,
            filteredData: response.data,
            searchedData: response.data
          }
        }
      })
  }

  const mergeFiltering = () => {
    const finalFilteredData = devicesData.current.searchedData.filter(value => devicesData.current.filteredData.includes(value))
    setFilteredData(finalFilteredData)
  }

  const handleOnSearch = (list: Device[]) => {
    devicesData.current.searchedData = list || devicesData.current.devices
    mergeFiltering()
  }

  const handleOnFilter = (list: Device[]) => {
    devicesData.current.filteredData = list || devicesData.current.devices
    mergeFiltering()
  }

  return (
    <div className="p-4 lg:p-8">
      <div>
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Device
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the devices which includes phone, tablets and
              computers.
            </p>
          </div>
        </div>
        <div className="flex items-center mt-6 space-x-4">
          <div className="max-w-xs w-60">
            <Search
              list={devicesData.current.devices || []}
              onSearch={handleOnSearch}
              excludeKeys={['description']}
            />
          </div>
          <div className="max-w-xs w-60">
            <Filter
              list={devicesData.current.devices || []}
              options={options}
              onFilter={handleOnFilter}
            />
          </div>
        </div>
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
            {filteredFinalData?.map(device =>
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
                  {device.quantity}
                </td>
                <td>
                  <button
                    type="button"
                    className="px-2 py-1 text-sm font-semibold text-white bg-blue-600 rounded shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Add to cart
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Landing
