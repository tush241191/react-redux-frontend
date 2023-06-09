import classNames from 'classnames'
import React from 'react'

import Eye from '../icon/Eye'
import EyeSlash from '../icon/EyeSlash'
import SearchIcon from '../icon/SearchIcon'
import {InputTypes} from './Input'

interface TrailingComponentProps {
  type?: InputTypes;
  disabled?: boolean;
  showValue?: boolean;
  toggleShowPassword?: () => void;
}

const TrailingComponent = ({
  type,
  disabled,
  showValue,
  toggleShowPassword
}: TrailingComponentProps) => {
  const trailingIconWrapperClassNames = classNames(
    'absolute inset-y-0 flex items-center right-3',
    {
      'fill-gray-600': !disabled,
      'fill-gray-400': disabled
    }
  )

  if (type === 'search') {
    return (
      <div className={trailingIconWrapperClassNames}>
        <SearchIcon />
      </div>
    )
  }

  if (type === 'password') {
    return (
      <div
        className={trailingIconWrapperClassNames}
        onClick={toggleShowPassword}
      >
        {showValue ? <EyeSlash /> : <Eye />}
      </div>
    )
  }

  return null
}

export default TrailingComponent
