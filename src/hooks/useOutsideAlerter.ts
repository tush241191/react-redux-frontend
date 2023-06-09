import {RefObject, useEffect} from 'react'

const useOutsideAlerter = (ref: RefObject<HTMLDivElement>, active: boolean, callbackFunction: () => void) => {
  useEffect(() => {
    function handleClickOutside (event: MouseEvent) {
      if (active && ref.current && !ref.current.contains(event.target as Node)) {
        callbackFunction()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [active, ref])
}

export default useOutsideAlerter
