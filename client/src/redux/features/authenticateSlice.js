import { createSlice } from '@reduxjs/toolkit';

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