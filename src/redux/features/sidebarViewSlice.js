import { createSlice } from '@reduxjs/toolkit';

export const sidebarViewSlice = createSlice({
  name: 'sidebarView',
  initialState: {value: 'signIn'},
  reducers: {
    setSidebarView: (state, newSidebarView) => {
      state.value = newSidebarView.payload;
    },
  },
})

export const { setSidebarView } = sidebarViewSlice.actions;

export default sidebarViewSlice.reducer