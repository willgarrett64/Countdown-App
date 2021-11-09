import { configureStore } from '@reduxjs/toolkit'
import sidebarViewReducer from './features/sidebarViewSlice';
import liveCountdownReducer from './features/liveCountdownSlice';
import countdownListReducer from './features/countdownListSlice';
import authenticateReducer from './features/authenticateSlice';



export default configureStore({
  reducer: {  
    sidebarView: sidebarViewReducer,
    liveCountdown: liveCountdownReducer,
    countdownList: countdownListReducer,
    authenticate: authenticateReducer,
  }
})