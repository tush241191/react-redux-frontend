import {createSlice, PayloadAction} from '@reduxjs/toolkit'

import {Device} from '../features/landing/types'

export interface DeviceState {
  items: Device[];
  modifiedItems: Device[];
}

const initialState: DeviceState = {
  items: [],
  modifiedItems: []
}

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    addDevices(state, action: PayloadAction<Device[]>) {
      state.items = action.payload
      state.modifiedItems = action.payload
    },
    updateDevice(state, action: PayloadAction<Device>) {
      const index = state.modifiedItems.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.modifiedItems[index] = action.payload
      }
    }
  }
})

export const {addDevices, updateDevice} = deviceSlice.actions

export default deviceSlice.reducer
