import React, {useEffect, useRef, useState} from 'react'

import {MultiSelectOption} from '../../components/dropdown/types'
import Filter from '../../components/filter/Filter'
import Search from '../../components/filter/Search'
import {DeviceFilterOptions} from '../../components/filter/types'
import {APP_STATUS} from '../../utils/constants'
import {getDevices} from './api'
import DeviceTable from './components/DeviceTable'
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
      <div className="space-y-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Devices
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
        <div>
          <DeviceTable devices={filteredFinalData} />
        </div>
      </div>
    </div>
  )
}

export default Landing
