import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {MultiSelectOption} from '../../components/dropdown/types'
import Filter from '../../components/filter/Filter'
import Search from '../../components/filter/Search'
import {DeviceFilterOptions} from '../../components/filter/types'
import {addDevices} from '../../store/deviceSlice'
import {RootState} from '../../store/store'
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
  const dispatch = useDispatch()
  const deviceItems = useSelector((state: RootState) => state.device.modifiedItems)

  const [filteredFinalData, setFilteredData] = useState<Device[]>([])
  const devicesData = useRef<DeviceFilter>({
    filteredData: [],
    searchedData: []
  })

  useEffect(() => {
    devicesData.current.searchedData = devicesData.current.searchedData.map(data => {
      const deviceItem = deviceItems.find(item => item.id === data.id)
      if(deviceItem) {
        return {
          ...data,
          inStock: deviceItem.inStock
        }
      }
      return data
    })

    devicesData.current.filteredData = devicesData.current.filteredData.map(
      data => {
        const deviceItem = deviceItems.find(item => item.id === data.id)
        if (deviceItem) {
          return {
            ...data,
            inStock: deviceItem.inStock
          }
        }
        return data
      }
    )

    mergeFiltering()

  }, [deviceItems])

  useEffect(() => {
    fetchDeviceList()
  }, [])

  const fetchDeviceList = () => {
    getDevices()
      .then(response => {
        if(response.status === APP_STATUS.SUCCESS) {
          devicesData.current = {
            filteredData: response.data,
            searchedData: response.data
          }
          dispatch(addDevices(response.data))
        }
      })
  }

  const mergeFiltering = () => {
    const finalFilteredData = devicesData.current.searchedData.filter(data =>
      devicesData.current.filteredData.some(item => item.id === data.id)
    )
    setFilteredData(finalFilteredData)
  }

  const handleOnSearch = (list: Device[]) => {
    devicesData.current.searchedData = list || deviceItems
    mergeFiltering()
  }

  const handleOnFilter = (list: Device[]) => {
    devicesData.current.filteredData = list || deviceItems
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
              list={deviceItems || []}
              onSearch={handleOnSearch}
              excludeKeys={['description']}
            />
          </div>
          <div className="max-w-xs w-60">
            <Filter
              list={deviceItems || []}
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
