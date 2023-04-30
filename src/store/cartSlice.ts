import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {Device} from '../features/landing/types'

export interface CartState {
  items: Device[];
}

const initialState: CartState = {
  items: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Device>) {
      state.items.push(action.payload)
    },
    removeItem(state, action: PayloadAction<Device>) {
      state.items = state.items.filter(item => item.id !== action.payload.id)
    },
    updateItem(state, action: PayloadAction<Device>) {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    }
  }
})

export const {addItem, removeItem, updateItem} = cartSlice.actions

export default cartSlice.reducer
