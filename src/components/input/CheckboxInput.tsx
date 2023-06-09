import React from 'react'

//import CheckIcon from '../icon/CheckIcon'

export interface CheckboxInputProps {
  label?: string;
  name: string;
  value?: string;
  checked: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  className?: string;
}

const CheckboxInput = ({
  label,
  onChange,
  name,
  value,
  disabled = false,
  className,
  checked
}: CheckboxInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
  }
  const checkedClassnames =
    'checked:border-blue-600  checked:bg-blue-600 checked:disabled:border-gray-300'

  return (
    <div className={`relative flex items-center group ${className}`}>
      <input
        type="checkbox"
        id={name}
        checked={checked}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={`w-5 h-5 mr-1 border-2 rounded-md appearance-none cursor-pointer border-gray-300 focus:outline-none disabled:checked:bg-gray-300 disabled:cursor-auto hover:enabled:indeterminate:bg-gray-300 focus:ring-0 ${
          checked ? checkedClassnames : ''
        }`}
      />
      {label &&
        <label
          htmlFor={name}
          className={`ml-2 font-medium font-titillium ${
            disabled ? 'cursor-auto' : 'cursor-pointer'
          }`}
        >
          {label}
        </label>
      }
    </div>
  )
}

export default CheckboxInput
