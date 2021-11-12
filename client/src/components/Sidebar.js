import { useEffect } from "react";

//import components
import SignIn from "./sidebars/SignIn";
import SignUp from "./sidebars/SignUp";
import SelectCountdown from "./sidebars/SelectCountdown";

//import styles
import '../styles/sidebar.css'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarView } from '../redux/features/sidebarViewSlice';
import { signIn } from '../redux/features/authenticateSlice';
import { setCountdownList } from '../redux/features/countdownListSlice';
import { setLiveCountdown } from "../redux/features/liveCountdownSlice";


import { getUserData, getCountdowns } from "../utils/utils";


export default function Sidebar({toggleSidebarOpen, toggleOverlayHidden}) {
  const dispatch = useDispatch();
  const sidebarView = useSelector((state) => state.sidebarView.value);
    
  // check if user already has a valid token
  useEffect(async () => {
    const userData = await getUserData();
    if (userData) {
      const countdowns = await getCountdowns('mycountdowns');
      dispatch(signIn(userData));
      dispatch(setSidebarView('selectCountdown'));
      if (countdowns) {
        dispatch(setCountdownList(countdowns));
        dispatch(setLiveCountdown(countdowns[0]));
      }
    } else {
      const countdowns = await getCountdowns('guest');
      dispatch(setSidebarView('signIn'));
      dispatch(setCountdownList(countdowns));
      dispatch(setLiveCountdown(countdowns[0]));
    }
  }, [])

  return (
    <aside className="open" id="sidebar">
      {
        sidebarView === 'signIn'
        ? <SignIn/>
        : sidebarView === 'signUp'
        ? <SignUp/>
        : sidebarView === 'selectCountdown'
        ? <SelectCountdown toggleOverlayHidden={toggleOverlayHidden} toggleSidebarOpen={toggleSidebarOpen} />
        : null
      }
    </aside>
  )
  
}
