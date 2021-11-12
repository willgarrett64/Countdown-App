import { createSlice } from '@reduxjs/toolkit';

export const overlayViewSlice = createSlice({
  name: 'overlayView',
  initialState: {value: ''},
  reducers: {
    setOverlayView: (state, newOverlayView) => {
      state.value = newOverlayView.payload;
    },
  },
})

export const { setOverlayView } = overlayViewSlice.actions;

export default overlayViewSlice.reducer