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
  initialState: {
    list: guestCountdowns,
    editing: {}
  },
  reducers: {
    setCountdownList: (state, newList) => {
      state.list = newList.payload;
    },
    setEditCountdown: (state, countdown) => {
      state.editing = countdown.payload;
    },
    addCountdown: (state, newCountdown) => {
      const countdown = newCountdown.payload;
      state.list = [...state.list, countdown];
    },
    deleteCountdown: (state, id) => {
      const countdownId = id.payload;
      state.list = state.list.filter(el => el.id != countdownId)
    }, 
    editCountdown: (state, id) => {

    }
  },
})

export const { setCountdownList, setEditCountdown, resetToGuest, addCountdown, deleteCountdown } = countdownListSlice.actions;

export default countdownListSlice.reducer