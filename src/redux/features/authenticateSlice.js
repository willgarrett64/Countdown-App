import { createSlice } from '@reduxjs/toolkit';

// guest user profile and countdowns
const guestUser = {
  id: 0, 
  username: null,
  password: null,
  countdownList: [
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
    {
      name: 'Easter',
      date: '17 Apr 2022',
      time: '00:00',
      complete: false,
      id: 3
    },
  ]
}

export const authenticateSlice = createSlice({
  name: 'authenticate',
  initialState: {
    signedIn: false,
    user: {}
  },
  reducers: {
    signIn: (state, user) => {
      state.signedIn = true;
      state.user = user.payload;
    },
    signOut: (state) => {
      state.signedIn = false;
      state.user = {};
    },
  },
})

export const { signIn, signOut } = authenticateSlice.actions;

export default authenticateSlice.reducer