import { createSlice } from '@reduxjs/toolkit';

export const signInSlice = createSlice({
  name: 'signIn',
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

export const { signIn, signOut } = signInSlice.actions;

export default signInSlice.reducer