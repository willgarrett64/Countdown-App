import { configureStore } from '@reduxjs/toolkit'
import sidebarViewReducer from './features/sidebarViewSlice';
import liveCountdownReducer from './features/liveCountdownSlice';
import countdownListReducer from './features/countdownListSlice';



export default configureStore({
  reducer: {  
    sidebarView: sidebarViewReducer,
    liveCountdown: liveCountdownReducer,
    countdownList: countdownListReducer,
  }
})