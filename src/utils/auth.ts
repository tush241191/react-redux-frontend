import {APP_VARIABLES} from './constants'

const KEY_TOKEN = APP_VARIABLES.LOCAL_STORAGE_KEY

export const getAuthToken = (): string => {
  return localStorage.getItem(KEY_TOKEN) || ''
}

export const setAuthToken = (jwtToken: string): void => {
  localStorage.setItem(KEY_TOKEN, jwtToken)
}

export const removeAuthToken = (): void => {
  localStorage.removeItem(KEY_TOKEN)
  localStorage.clear()
}
