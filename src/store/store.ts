import {configureStore} from '@reduxjs/toolkit'

import authReducer, {UserState} from './authSlice'
import cartReducer, {CartState} from './cartSlice'
import deviceReducer, {DeviceState} from './deviceSlice'

export interface RootState {
  cart: CartState;
  device: DeviceState;
  auth: UserState;
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    device: deviceReducer,
    auth: authReducer
  }
})
