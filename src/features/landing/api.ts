import {API_PATHS} from '../../api/apiRoutes'
import {requestWithoutAuthorizationResponseData} from '../../api/fetcher'
import {DataResponse} from '../../api/fetcherTypes'
import {Device} from './types'

export const getDevices = (): Promise<DataResponse<Device[]>> => {
  const url = API_PATHS.DEVICE_LIST
  return requestWithoutAuthorizationResponseData(url, 'GET')
}
