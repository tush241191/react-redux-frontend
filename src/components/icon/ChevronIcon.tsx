import React from 'react'

export interface ChevronIconProps {
  isOpen: boolean;
}
const ChevronIcon = ({isOpen = false}: ChevronIconProps) => {
  return (
    <div>
      <svg
        className={`w-5 h-5 -mr-1 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

export default ChevronIcon
