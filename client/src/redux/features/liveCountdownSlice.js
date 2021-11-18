import { createSlice } from '@reduxjs/toolkit';

export const liveCountdownSlice = createSlice({
  name: 'liveCountdown',
  initialState: {countdown: null},
  reducers: {
    setLiveCountdown: (state, newLiveCountdown) => {
      state.countdown = newLiveCountdown.payload;
    },
    removeLiveCountdown: (state) => {
      state.countdown = null;
    }
  },
})

export const { setLiveCountdown, resetLiveCountdown, removeLiveCountdown } = liveCountdownSlice.actions;

export default liveCountdownSlice.reducer