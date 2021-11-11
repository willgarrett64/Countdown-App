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



export default function Sidebar({toggleSidebarOpen, toggleOverlayHidden}) {
  //TESTING
  const getCountdowns = () => {
    fetch('http://localhost:3000/api/countdowns/mycountdowns')
    .then(res => res.json())
    .then(res => {
      const countdowns = res.data;
      dispatch(setCountdownList(countdowns));
      dispatch(setLiveCountdown(countdowns[0]));
      dispatch(setSidebarView('selectCountdown'));
    })
  }

  const getUserData = async () => {
    fetch('http://localhost:3000/api/users/checktoken')
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .then(res => {
      dispatch(signIn(res.data));
      getCountdowns();
    })
    .catch(error => console.log('error', error))
  }
  
  
  const dispatch = useDispatch();
  const sidebarView = useSelector((state) => state.sidebarView.value);
    
  // check if user already has a valid token
  useEffect(() => {
    getUserData()
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
