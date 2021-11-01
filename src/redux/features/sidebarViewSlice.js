import { createSlice } from '@reduxjs/toolkit';

export const sidebarViewSlice = createSlice({
  name: 'sidebarView',
  initialState: {value: 'signIn'},
  reducers: {
    setSidebarView: (state, newSignIn) => {
      state.value = newSignIn.payload;
    },
  },
})

export const { setSidebarView } = sidebarViewSlice.actions;

export default sidebarViewSlice.reducer