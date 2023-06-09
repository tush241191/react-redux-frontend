import axios, {type AxiosError, type AxiosResponse} from 'axios'

import {APP_ROUTES} from '../router/routes'
import {getAuthToken, removeAuthToken} from '../utils/auth'
import {APP_ERRORS} from '../utils/constants'
import {
  type ApiErrorResponse,
  type AppError,
  type DataResponse,
  type HttpError,
  type HttpMethod,
  type HttpNoContent,
  type HttpSuccess,
  type NoContentResponse
} from './fetcherTypes'

export const requestWithFile = async (
  url: string,
  method: HttpMethod,
  file: File
): Promise<NoContentResponse> => {
  const token = getAuthToken()
  return await fetchWithAuthorizationWithFile(url, token, method, file)
    .then(handleNoContentResponse)
    .catch(handleAxiosError)
}

export const requestWithFileWithResponseData = async <T>(
  url: string,
  method: HttpMethod,
  file: File,
  body?: string
): Promise<DataResponse<T>> => {
  const token = getAuthToken()
  return await fetchWithAuthorizationWithFile(url, token, method, file, body)
    .then(data => handleAxiosResponse<T>(data))
    .catch(handleAxiosError)
}

export const requestWithResponseData = async <T>(
  url: string,
  method: HttpMethod,
  body?: string
): Promise<DataResponse<T>> => {
  const token = getAuthToken()
  return await fetchWithAuthorization(url, token, method, body)
    .then(data => handleAxiosResponse<T>(data))
    .catch(handleAxiosError)
}

export const requestWithoutResponseData = async (
  url: string,
  method: HttpMethod,
  body?: string
): Promise<NoContentResponse> => {
  const token = getAuthToken()
  return await fetchWithAuthorization(url, token, method, body)
    .then(handleNoContentResponse)
    .catch(handleAxiosError)
}

export const requestWithoutAuthorizationResponseData = async <T>(
  url: string,
  method: HttpMethod,
  body?: string
): Promise<DataResponse<T>> => {
  return await fetchWithoutAuthorization(url, method, body)
    .then(data => handleAxiosResponse<T>(data))
    .catch(handleAxiosError)
}

export const requestWithoutAuthorizationWithoutResponseData = async (
  url: string,
  method: HttpMethod,
  body?: string
): Promise<NoContentResponse> => {
  return await fetchWithoutAuthorization(url, method, body)
    .then(handleNoContentResponse)
    .catch(handleAxiosError)
}

const handleNoContentResponse = (): HttpNoContent => {
  return {
    status: 'OK'
  }
}

export const handleAxiosResponse = <T>(response: AxiosResponse) => {
  const success: HttpSuccess<T> = {
    status: 'SUCCESS',
    data: response.data
  }
  return success
}

export const handleAxiosError = (errorResponse: AxiosError) => {
  const responseData = errorResponse.response?.data as ApiErrorResponse ?? {}

  if (errorResponse.response?.status === 401 && responseData?.error === APP_ERRORS.INVALID_TOKEN) {
    removeAuthToken()
    window.location.href = APP_ROUTES.ROOT
  }

  const error: AppError = {
    status: errorResponse.response?.status,
    code: responseData?.error,
    message: responseData?.message || 'Unexpected Error!',
    fieldErrors: responseData?.fieldErrors
  }

  const httpErrorResponse: HttpError = {
    status: 'ERROR',
    error
  }

  return httpErrorResponse
}

export const fetchWithAuthorization = async (
  url: string,
  authToken: string,
  method: HttpMethod,
  body?: string
): Promise<AxiosResponse> => {
  return await apiClient().request({
    url,
    headers: {
      Authorization: 'Bearer ' + authToken,
      ...body && {'content-type': 'application/json'}
    },
    method,
    data: body
  })
}

export const fetchWithAuthorizationWithFile = async (
  url: string,
  authToken: string,
  method: HttpMethod,
  file: File,
  body?: string
): Promise<AxiosResponse> => {
  const formData = new FormData()
  formData.append('file', file)
  if (body) {
    formData.append('data', body)
  }
  return await apiClient().request({
    url,
    headers: {
      Authorization: 'Bearer ' + authToken,
      'Content-Type': 'multipart/form-data'
    },
    method,
    data: formData
  })
}

const fetchWithoutAuthorization = async (
  url: string,
  method: HttpMethod,
  body?: string
): Promise<AxiosResponse> => {
  return await apiClient().request({
    url,
    headers: {
      ...body && {'content-type': 'application/json'}
    },
    method,
    data: body
  })
}

const apiClient = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
}
