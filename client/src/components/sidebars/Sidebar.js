//#region IMPORTS
// react hooks
import { useEffect } from "react";

// components
import SignIn from "./signIn/SignIn";
import SignUp from "./signUp/SignUp";
import SelectCountdown from "./selectCountdown/SelectCountdown";

// styles
import './Sidebar.css'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarView } from '../../redux/features/sidebarViewSlice';
import { signIn } from '../../redux/features/authenticateSlice';
import { setCountdownList } from '../../redux/features/countdownListSlice';
import { setLiveCountdown } from "../../redux/features/liveCountdownSlice";

// utils
import { apiRequest } from "../../utils/apiRequests";
//#endregion IMPORTS


export default function Sidebar({toggleSidebarOpen}) {
  const dispatch = useDispatch();
  const sidebarView = useSelector((state) => state.sidebarView.value);
    
  // check if user already has a valid token
  useEffect(() => { 
    const autoLogIn = async () => {
      const userData = await apiRequest.getUserData();
      if (userData) {
        const countdowns = await apiRequest.getCountdowns('mycountdowns');
        dispatch(signIn(userData));
        if (countdowns) {
          dispatch(setCountdownList(countdowns));
          dispatch(setLiveCountdown(countdowns[0]));
        }
        dispatch(setSidebarView('selectCountdown'));
      } else {
        dispatch(setSidebarView('signIn'));
      }
    }
    autoLogIn()
  }, [])

  return (
    <aside className="open" id="sidebar">
      {
        sidebarView === 'signIn'
        ? <SignIn/>
        : sidebarView === 'signUp'
        ? <SignUp />
        : sidebarView === 'selectCountdown'
        ? <SelectCountdown toggleSidebarOpen={toggleSidebarOpen} />
        : null
      }
    </aside>
  )
  
}
