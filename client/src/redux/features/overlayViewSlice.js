import { createSlice } from '@reduxjs/toolkit';

export const overlayViewSlice = createSlice({
  name: 'overlayView',
  initialState: {value: ''},
  reducers: {
    setOverlayView: (state, newOverlayView) => {
      state.value = newOverlayView.payload;
    },
    closeOverlay: (state) => {
      state.value = '';
    }
  },
})

export const { setOverlayView, closeOverlay } = overlayViewSlice.actions;

export default overlayViewSlice.reducer