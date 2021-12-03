//#region IMPORTS
// componenets
import Clock from "./clock/Clock";
import LandingPage from "./landingPage/LandingPage";

// styles
import './Main.css'

// redux
import { useSelector } from "react-redux";
//#endregion IMPORTS


export default function Main () {
  const liveCountdown = useSelector(state => state.liveCountdown.countdown);
  const signedIn = useSelector(state => state.authenticate.signedIn);
  const sidebarView = useSelector(state => state.sidebarView.value);

  return (
    <main className="open" id="main">
      <div className="content flex column">
        {
          //if not signed in and haven't continued as guest, render the landing page otherwise render the clock (unless there is no live countdown to display)
          !signedIn && sidebarView !== 'selectCountdown' 
          ? <LandingPage /> 
          : liveCountdown 
          ? <Clock countdown={liveCountdown} /> 
          : <h2>CREATE YOUR FIRST COUNTDOWN TO START THE CLOCK</h2>
        }
      </div>
    </main>
  )
}
