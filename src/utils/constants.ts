export const ASSETS = {
  LOGO: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80'
}

export const APP_VARIABLES = {
  LOCAL_STORAGE_KEY: '__auth_provider_token__',
  AUTH_ORIGIN: 'app',
  DEVICE_CHANNEL_NAME: 'deviceChannel',
  LOCAL_STORAGE_BROADCAST_KEY: '__broadcast_provider_token__'
}

export enum APP_STATUS {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  LOADING = 'LOADING',
  OK = 'OK'
}

export enum APP_ERRORS {
  INVALID_TOKEN = 'Invalid token',
  AUTHENTICATION_FAILED = 'Authentication failed'
}
