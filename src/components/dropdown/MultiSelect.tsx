import React, {useRef, useState} from 'react'

import useOutsideAlerter from '../../hooks/useOutsideAlerter'
import ChevronIcon from '../icon/ChevronIcon'
import FilterIcon from '../icon/FilterIcon'
import CheckboxInput from '../input/CheckboxInput'
import {MultiSelectOption, MultiSelectOptionItem, SelectedMultiSelectOption} from './types'

export interface MultiSelectProps {
  options: MultiSelectOption[];
  selectedOptions: SelectedMultiSelectOption[];
  setSelectedOptions: (options: SelectedMultiSelectOption[]) => void;
  placeholder?: string;
  fullWidth?: boolean;
  maxHeight?: string;
}

const MultiSelect = (props: MultiSelectProps) => {
  const {
    options,
    placeholder = 'Filter by',
    selectedOptions,
    setSelectedOptions,
    fullWidth = false,
    maxHeight = '384px'
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdownOpen = () => setIsOpen(!isOpen)
  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef, isOpen, () => setIsOpen(false))

  const generateSelectedOption = (
    category: string,
    item: MultiSelectOptionItem
  ): SelectedMultiSelectOption => {
    return {
      ...item,
      category: category
    }
  }

  const hasObjectInList = (
    options: SelectedMultiSelectOption[],
    selectedOption: SelectedMultiSelectOption
  ) => {
    if (!options?.length || !selectedOption) return false
    return options?.some(data => data.value === selectedOption.value)
  }

  const isChecked = (
    category: string,
    item: MultiSelectOptionItem
  ): boolean => {
    const selectedOption: SelectedMultiSelectOption = generateSelectedOption(
      category,
      item
    )
    return hasObjectInList(selectedOptions, selectedOption)
  }

  const handleOnChange = (category: string, item: MultiSelectOptionItem) => {
    const selectedOption: SelectedMultiSelectOption = generateSelectedOption(
      category,
      item
    )

    if (!selectedOptions?.length) {
      setSelectedOptions([selectedOption])
      return
    }

    const isOptionSelected = hasObjectInList(selectedOptions, selectedOption)
    if (isOptionSelected) {
      const filteredSelectedOptions = selectedOptions.filter(
        option => option.value !== selectedOption.value
      )
      setSelectedOptions(filteredSelectedOptions)
    } else {
      setSelectedOptions([...selectedOptions, selectedOption])
    }
  }

  const displaySelectedOption = () => {
    if (selectedOptions?.length) {
      return selectedOptions.map(data => data.label).join(', ')
    }

    return placeholder
  }

  const getUniqueId = (...args: string[]) => {
    return args.join('_').replace(/\s/g, '')
  }

  const generateOptionList = (
    category: MultiSelectOption,
    item: MultiSelectOptionItem
  ) => {
    const categoryValue = category.value ?? ''
    const checked = isChecked(categoryValue, item)
    return (
      <li
        key={getUniqueId('category_option', categoryValue, item.value)}
        className="block px-4 py-1 text-sm text-gray-700"
        role="option"
        aria-selected={checked}
      >
        <div className="relative flex items-center">
          <div className="flex items-center">
            <CheckboxInput
              name={getUniqueId('option', categoryValue, item.value)}
              checked={checked}
              onChange={() => {
                handleOnChange(categoryValue, item)
              }}
            />
          </div>
          <div className="ml-2">
            <label
              htmlFor={getUniqueId('option', categoryValue, item.value)}
              className="block text-sm font-normal text-gray-800 truncate cursor-pointer font-titillium"
            >
              {item.label}
            </label>
          </div>
        </div>
      </li>
    )
  }

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      <div ref={wrapperRef} className="relative">
        <button
          onClick={toggleDropdownOpen}
          className="inline-flex w-full justify-between gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          aria-haspopup="listbox"
          aria-expanded="true"
        >
          <div className="flex items-center space-x-2 truncate">
            <FilterIcon />
            <span className="block truncate">{displaySelectedOption()}</span>
          </div>
          <span className="inset-y-0 flex items-center pointer-events-none">
            <ChevronIcon isOpen={isOpen} />
          </span>
        </button>
        {isOpen &&
          <ul
            className={`max-h-[${maxHeight}] absolute right-0 z-10 py-2 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            role="listbox"
          >
            {options.map((item, index) =>
              <li
                key={getUniqueId('item', `${index}`)}
                className="flex-col items-center px-4 space-y-2 cursor-pointer select-none"
              >
                {item.label &&
                  <div className="relative flex items-center">
                    <label className="block text-sm font-semibold text-gray-500 truncate">
                      {item.label}
                    </label>
                  </div>
                }
                <ul
                  key={getUniqueId('item_options', `${index}`)}
                  className="space-y-1"
                >
                  {item.options.map(option =>
                    generateOptionList(item, option)
                  )}
                </ul>
              </li>
            )}
          </ul>
        }
      </div>
    </div>
  )
}

export default MultiSelect
