import React, {useEffect, useState} from 'react'

import {filterList, GenericObject} from '../../utils/utils'
import MultiSelect from '../dropdown/MultiSelect'
import {MultiSelectOption, SelectedMultiSelectOption} from '../dropdown/types'
import {DeviceFilterOptions} from './types'

interface FilterProps<T extends GenericObject> {
  list: T[];
  options: MultiSelectOption[];
  fullWidth?: boolean;
  onFilter: (list: T[]) => void;
}

const Filter = <T extends GenericObject>({
  list,
  options,
  fullWidth = true,
  onFilter
}: FilterProps<T>) => {
  const [filterBy, setFilterBy] = useState<SelectedMultiSelectOption[]>([])

  useEffect(() => {
    filterData()
  }, [filterBy])

  const applyFilter = (
    filter: SelectedMultiSelectOption,
    conditions: GenericObject
  ) => {

    switch (filter.category) {
      case DeviceFilterOptions.CATEGORY:
        conditions.category = conditions.category
          ? [...conditions.category, filter.value]
          : [filter.value]
        break
      case DeviceFilterOptions.BRAND:
        conditions.brand = conditions.brand
          ? [...conditions.brand, filter.value]
          : [filter.value]
        break
      default:
        break
    }

    return conditions
  }

  const filterData = () => {
    if (list.length) {
      let conditions: GenericObject = {}

      filterBy.forEach(filter => {
        conditions = applyFilter(filter, conditions)
      })

      const filteredList = filterList(list, conditions)
      onFilter(filteredList)
    }
  }

  const handleOnSelectOption = (
    selectedOptions: SelectedMultiSelectOption[]
  ) => {
    setFilterBy(selectedOptions)
  }

  return (
    <MultiSelect
      options={options}
      selectedOptions={filterBy}
      setSelectedOptions={handleOnSelectOption}
      fullWidth={fullWidth}
      placeholder="Filter by"
    />
  )
}

export default Filter
