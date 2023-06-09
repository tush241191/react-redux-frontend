import {useEffect, useState} from 'react'

import {GenericObject, searchList} from '../../utils/utils'
import Input from '../input/Input'

export interface SearchProps<T extends GenericObject> {
  list: T[];
  placeholder?: string;
  fullWidth?: boolean;
  onSearch: (list: T[]) => void;
  excludeKeys?: string[];
}
const Search = <T extends GenericObject>({
  list,
  placeholder = 'Search...',
  fullWidth = false,
  onSearch,
  excludeKeys = []
}: SearchProps<T>) => {
  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    searchData()
  }, [searchValue])

  const searchData = () => {
    if (list) {
      const data: T[] = searchList<T>(list, searchValue, excludeKeys)
      onSearch(data)
    }
  }

  return (
    <Input
      type="search"
      onChange={({target: {value}}) => setSearchValue(value.toLowerCase())}
      value={searchValue}
      fullWidth={fullWidth}
      placeholder={placeholder}
    />
  )
}

export default Search
