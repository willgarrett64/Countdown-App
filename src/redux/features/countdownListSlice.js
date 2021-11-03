import { createSlice } from '@reduxjs/toolkit';

export const countdownListSlice = createSlice({
  name: 'countdownList',
  initialState: {list: [
    {
      name: 'Christmas',
      date: '25 Dec 2021',
      time: '00:00',
      complete: false,
      id: 1
    },
    {
      name: 'New Year',
      date: '01 Jan 2022',
      time: '00:00',
      complete: false,
      id: 2
    },

  ]},
  reducers: {
    setCountdownList: (state, newList) => {
      state.list = newList.payload;
    },
    resetToGuest: (state) => {
      state.list = [{
        name: 'Christmas',
        date: '25 Dec 2021',
        time: '00:00',
        complete: false,
        id: 1
      },
      {
        name: 'New Year',
        date: '01 Jan 2022',
        time: '00:00',
        complete: false,
        id: 2
      }]
    },
    addCountdown: (state, newCountdown) => {
      state = state.list.append(newCountdown.payload);
    },
    deleteCountdown: (state, id) => {
      const i = state.list.findIndex(el => el.id === id.payload);
      state.splice(i, 1);
    }
  },
})

export const { setCountdownList, resetToGuest, addCountdown, deleteCountdown } = countdownListSlice.actions;

export default countdownListSlice.reducer