import { createSlice } from '@reduxjs/toolkit';
import users from '../../clientSideLogin/users';

const guestCountdowns = [{
  name: 'Christmas',
  date: '2021-12-25',
  time: '00:00',
  complete: false,
  id: 1
},
{
  name: 'New Year',
  date: '2022-01-01',
  time: '00:00',
  complete: false,
  id: 2
},
{
  name: 'Easter',
  date: '2022-04-17',
  time: '00:00',
  complete: false,
  id: 3
},]

export const countdownListSlice = createSlice({
  name: 'countdownList',
  initialState: {list: guestCountdowns},
  reducers: {
    setCountdownList: (state, newList) => {
      state.list = newList.payload;
    },
    resetToGuest: (state) => {
      state.list = guestCountdowns
    },
    addCountdown: (state, newCountdown) => {
      const countdown = newCountdown.payload;
      countdown.id = (state.list[state.list.length - 1].id) + 1;
      state.list = [...state.list, countdown];
    },
    deleteCountdown: (state, id) => {
      const i = state.list.findIndex(el => el.id === id.payload);
      state.list.splice(i, 1);
    }, 
    editCountdown: (state, id) => {

    }
  },
})

export const { setCountdownList, resetToGuest, addCountdown, deleteCountdown } = countdownListSlice.actions;

export default countdownListSlice.reducer