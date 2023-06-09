import {useDispatch} from 'react-redux'

import {login as loginApi, validate} from '../features/auth/api'
import {LoginForm} from '../features/auth/types'
import {loginFailure, loginSuccess, logoutRequest} from '../store/authSlice'
import {getAuthToken, removeAuthToken, setAuthToken} from '../utils/auth'
import {APP_STATUS} from '../utils/constants'
import {getErrorMessage} from '../utils/utils'

export const useAuth = () => {
  const dispatch = useDispatch()

  const login = async(data: LoginForm) => {
    try {
      const loginRes = await loginApi(data)
      if(loginRes.status === APP_STATUS.SUCCESS) {
        dispatch(loginSuccess(loginRes.data.user))
        setAuthToken(loginRes.data.token)
      }
      return loginRes
    } catch (error) {
      let message = 'Something went wrong'
      const err = getErrorMessage(error)
      if (err) {
        message = err
      }
      dispatch(loginFailure(message))
    }
  }

  const logout = () => {
    dispatch(logoutRequest)
    removeAuthToken()
  }

  const validateUser = () => {
    async function isAuthTokenValid () {
      const validateResponse = await validate()
      if(validateResponse.status === APP_STATUS.SUCCESS) {
        dispatch(loginSuccess(validateResponse.data.user))
      } else {
        dispatch(loginFailure('Inavlid auth token'))
      }
    }

    try {
      if(getAuthToken()) {
        isAuthTokenValid()
      } else {
        dispatch(loginFailure('Token not found'))
      }
    } catch (error) {
      let message = 'Something went wrong'
      const err = getErrorMessage(error)
      if (err) {
        message = err
      }
      dispatch(loginFailure(message))
    }
  }

  return {login, logout, validateUser}
}
