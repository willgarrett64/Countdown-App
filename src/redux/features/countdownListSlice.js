import { createSlice } from '@reduxjs/toolkit';

export const countdownListSlice = createSlice({
  name: 'countdownList',
  initialState: [
    {
      name: 'Christmas',
      date: '25 Dec 2021',
      time: '00:00',
      complete: false,
      id: 1
    },
    {
      name: 'My Birthday',
      date: '28 Mar 2022',
      time: '00:00',
      complete: false,
      id: 2
    },
    {
      name: 'Tati\'s Birthday',
      date: '28 Apr 2022',
      time: '00:00',
      complete: false,
      id: 3
    }
  ],
  reducers: {
    addCountdown: (state, newCountdown) => {
      state.append(newCountdown.payload);
    },
    deleteCountdown: (state, id) => {
      const i = state.findIndex(el => el.id === id.payload);
      state.splice(i, 1);
    }
  },
})

export const { addCountdown, deleteCountdown } = countdownListSlice.actions;

export default countdownListSlice.reducer