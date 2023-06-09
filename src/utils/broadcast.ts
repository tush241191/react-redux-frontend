import {APP_VARIABLES} from './constants'

const KEY_TOKEN = APP_VARIABLES.LOCAL_STORAGE_BROADCAST_KEY

export const getBroadcastId = (): string => {
  return sessionStorage.getItem(KEY_TOKEN) || ''
}

export const setBroadcastId = (id: string): void => {
  sessionStorage.setItem(KEY_TOKEN, id)
}

export const removeBroadcastId = (): void => {
  sessionStorage.removeItem(KEY_TOKEN)
  sessionStorage.clear()
}
