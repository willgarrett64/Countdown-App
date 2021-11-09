import { createSlice } from '@reduxjs/toolkit';

const defaultLiveCountdown = {
  name: 'Christmas',
  date: '2021-12-25',
  time: '00:00',
  complete: false,
  id: 1
};

export const liveCountdownSlice = createSlice({
  name: 'liveCountdown',
  initialState: {countdown: defaultLiveCountdown},
  reducers: {
    setLiveCountdown: (state, newLiveCountdown) => {
      state.countdown = newLiveCountdown.payload;
    },
    resetLiveCountdown: (state) => {
      state.countdown = defaultLiveCountdown;
    }
  },
})

export const { setLiveCountdown, resetLiveCountdown } = liveCountdownSlice.actions;

export default liveCountdownSlice.reducer