import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {CartItem} from '../features/landing/types'

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      state.items.push(action.payload)
    },
    removeItem(state, action: PayloadAction<CartItem>) {
      state.items = state.items.filter(item => item.id !== action.payload.id)
    },
    updateItem(state, action: PayloadAction<CartItem>) {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    clearAllItems(state) {
      state.items = []
    }
  }
})

export const {addItem, removeItem, updateItem, clearAllItems} = cartSlice.actions

export default cartSlice.reducer
