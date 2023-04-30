export const ASSETS = {
  LOGO: 'https://coderbyteorgbranding.s3.amazonaws.com/cus_free_malwarebytes_c0j71.png'
}

export const APP_VARIABLES = {
  LOCAL_STORAGE_KEY: '__auth_provider_token__',
  AUTH_ORIGIN: 'app'
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