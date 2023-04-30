import {configureStore} from '@reduxjs/toolkit'

import cartReducer, {CartState} from './cartSlice'
import deviceReducer, {DeviceState} from './deviceSlice'

export interface RootState {
  cart: CartState;
  device: DeviceState;
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    device: deviceReducer
  }
})
