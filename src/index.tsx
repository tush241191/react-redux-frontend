import './index.css'

import React, {useEffect} from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import {BrowserRouter as Router, useRoutes} from 'react-router-dom'

import {router} from './router'
import {store} from './store/store'
import {setBroadcastId} from './utils/broadcast'

const App = () => {
  const uniqueId = Math.floor(Math.random() * Date.now()).toString(36)
  useEffect(() => {
    setBroadcastId(uniqueId)
  }, [])
  return useRoutes(router)
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
