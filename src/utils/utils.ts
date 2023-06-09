export type GenericObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
}

export const filterList = <T extends GenericObject>(list: T[], filters: { [key: string]: string[]; }): T[] => {
  return list.filter(item => {
    return Object.entries(filters).every(([key, values]) => {
      return values.includes(item[key])
    })
  })
}

export const searchList = <T extends GenericObject>(objectArray: T[], searchKey: string, excludeKeys?: string[]) => {
  return objectArray?.filter(data =>
    // eslint-disable-next-line array-callback-return
    Object.keys(data).some(obj => {
      if(excludeKeys && !excludeKeys.includes(obj)) {
        return data[obj as keyof T]?.toString().toLowerCase().includes(searchKey.toLowerCase())
      }
    })
  )
}

export const calculatePrice = (quantity: number, price: number) => {
  const totalPrice = price * quantity
  return Math.round(totalPrice * 100) / 100
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message
  }
  return String(error)
}
