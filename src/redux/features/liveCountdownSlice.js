import { createSlice } from '@reduxjs/toolkit';

export const liveCountdownSlice = createSlice({
  name: 'liveCountdown',
  initialState: {id: 1},
  reducers: {
    setLiveCountdown: (state, newLiveCountdown) => {
      state.id = newLiveCountdown.payload;
    },
  },
})

export const { setLiveCountdown } = liveCountdownSlice.actions;

export default liveCountdownSlice.reducer