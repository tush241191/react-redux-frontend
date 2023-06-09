import React, {SyntheticEvent, useState} from 'react'

import ErrorIcon from '../../../components/icon/ErrorIcon'
import Input from '../../../components/input/Input'
import {useAuth} from '../../../hooks/useAuth'
import {APP_STATUS, APP_VARIABLES, ASSETS} from '../../../utils/constants'
import {LoginForm} from '../types'

const defaultLoginFormValue: LoginForm = {
  username: '',
  password: '',
  authOrigin: APP_VARIABLES.AUTH_ORIGIN
}

const Login = () => {
  const {login} = useAuth()
  const [loginForm, setLoginForm] = useState<LoginForm>(defaultLoginFormValue)
  const [hasError, setHasError] = useState<boolean>(false)

  const handleInputChange = (key: string, value: string) => {
    setLoginForm({
      ...loginForm,
      [key]: value
    })
  }

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault()
    if (loginForm.username !== '' && loginForm.password !== '') {
      login(loginForm).then(response => {
        setHasError(false)

        if (response?.status === APP_STATUS.ERROR) {
          setHasError(true)
        }
      })
    }
  }

  const ErrorMessage = () => {
    return (
      <div className="flex items-center min-w-full min-h-[40px] rounded-lg px-[18px] py-[10px] space-x-[10px] bg-[#FDE6E6] text-base">
        <ErrorIcon />
        <span className="font-titillium text-[#D81C1C]">
          Authorization failed.
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col justify-center min-h-full px-6 py-12 bg-white rounded-lg w-96 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="w-auto h-10 mx-auto"
          src={ASSETS.LOGO}
          alt="Your Company"
        />
        <h2 className="mt-10 text-2xl font-bold leading-9 tracking-tight text-center text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <Input
                value={loginForm?.username}
                onChange={event =>
                  handleInputChange('username', event.target.value)
                }
                label="Email"
                type="email"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <Input
                value={loginForm?.password}
                onChange={event =>
                  handleInputChange('password', event.target.value)
                }
                type="password"
                label="Password"
                fullWidth={true}
              />
            </div>
            {hasError &&
              <div className="mt-4">
                <ErrorMessage />
              </div>
            }
          </div>

          <div className={`${hasError ? 'mt-4' : 'mt-10'}`}>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Sign in
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login
