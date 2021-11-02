// import componenets
import Clock from "./clock/Clock";

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarView } from '../redux/features/liveCountdownSlice';

// import styles
import '../styles/main.css'

export default function Main ({myCountdowns}) {
  const liveCountdown = useSelector(state => state.liveCountdown);

  // const countdownToDisplay = myCountdowns.find(countdown => countdown.id == activeCountdown);

  return (
    <main className="open" id="main">
      <div className="content">
        <Clock myCountdowns={myCountdowns} />
        
      </div>
    </main>
  )
}
