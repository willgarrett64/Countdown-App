import { configureStore } from '@reduxjs/toolkit'
import sidebarViewReducer from './features/sidebarViewSlice';
import liveCountdownReducer from './features/liveCountdownSlice';


export default configureStore({
  reducer: {  
    sidebarView: sidebarViewReducer,
    liveCountdown: liveCountdownReducer,
  }
})