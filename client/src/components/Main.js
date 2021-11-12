// import componenets
import Clock from "./clock/Clock";

// import styles
import '../styles/main.css'

//redux
import { useSelector } from "react-redux";

export default function Main () {
  const liveCountdown = useSelector(state => state.liveCountdown.countdown);

  return (
    <main className="open" id="main">
      <div className="content">
        {liveCountdown ? <Clock /> : <h2>Select a countdown to start the timer</h2>}
      </div>
    </main>
  )
}
