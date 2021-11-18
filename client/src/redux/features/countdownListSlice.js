import { createSlice } from '@reduxjs/toolkit';

export const countdownListSlice = createSlice({
  name: 'countdownList',
  initialState: {
    list: null,
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
    editCountdown: (state, newCountdown) => {
       state.list = state.list.map(el => {
         if (el.id == newCountdown.payload.id) {
           el = newCountdown.payload;
         }
         return el;
       })
    },
    resetCountdownList: (state) => {
      state.list = [];
    }
  },
})

export const { setCountdownList, setEditCountdown,  addCountdown, deleteCountdown, editCountdown, resetCountdownList } = countdownListSlice.actions;

export default countdownListSlice.reducer