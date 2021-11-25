// componenets
import Clock from "./clock/Clock";

// styles
import '../styles/main.css'

// redux
import { useSelector } from "react-redux";
import LandingPage from "./sidebars/LandingPage";

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
          ? <Clock /> 
          : <h2>CREATE YOUR FIRST COUNTDOWN TO START THE CLOCK</h2>
        }
      </div>
    </main>
  )
}
