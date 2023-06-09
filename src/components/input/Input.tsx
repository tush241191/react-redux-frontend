import React, {forwardRef, InputHTMLAttributes, useState} from 'react'

import TrailingComponent from './TrailingComponentProps'

export type InputTypes = 'text' | 'number' | 'email' | 'search' | 'password';

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  type?: InputTypes;
  label?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

const Input = forwardRef<HTMLInputElement, TextInputProps>(({
  value,
  label,
  type = 'text',
  fullWidth = true,
  disabled = false,
  ...rest
}, ref) => {

  const [showValue, setShowValue] = useState(false)
  const toggleShowPassword = () => setShowValue(!showValue)

  return (
    <div className={`relative rounded-md shadow-sm ${fullWidth ?? 'w-full'}`}>
      <input
        {...rest}
        id={label}
        type={`${showValue ? 'text' : type}`}
        value={value}
        disabled={disabled}
        ref={ref}
        className="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-inset sm:text-sm sm:leading-6"
      />
      <TrailingComponent
        type={type}
        showValue={showValue}
        disabled={disabled}
        toggleShowPassword={toggleShowPassword}
      />
    </div>
  )
})

export default Input
