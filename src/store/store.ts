import {configureStore} from '@reduxjs/toolkit'

import cartReducer, {CartState} from './cartSlice'

export interface RootState {
  cart: CartState;
}

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
})
