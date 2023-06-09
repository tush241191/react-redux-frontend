import {API_PATHS} from '../../api/apiRoutes'
import {requestWithoutAuthorizationResponseData, requestWithResponseData} from '../../api/fetcher'
import {LoginForm, User} from './types'

export async function login(loginDto: LoginForm) {
  const url = API_PATHS.USER_LOGIN
  return requestWithoutAuthorizationResponseData<{
    user: User;
    token: string;
  }>(url, 'POST', JSON.stringify(loginDto))
}

export async function validate(){
  const url = API_PATHS.USER_VALIDATE
  return requestWithResponseData<{
    user: User;
    token: string;
  }>(url, 'GET')
}
