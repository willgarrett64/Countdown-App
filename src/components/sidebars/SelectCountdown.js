import AddNewCountdownCard from "./AddNewCountdownCard";
import CountdownCard from "./CountdownCard";

// redux
import { useSelector, useDispatch } from 'react-redux';



export default function SelectCountdown() {
  const countdownList = useSelector((state) => state.countdownList)
  const liveCountdown = useSelector((state) => state.liveCountdown.id);
  const dispatch = useDispatch();

  return (
    <div className="content">
      <p>SELECT <strong>COUNTDOWN</strong></p>
      
      <div id="countdown-list">
        {countdownList.map(countdown => <CountdownCard countdown={countdown} key={countdown.id} />)}
        <AddNewCountdownCard />
      </div>

    </div>
  )
}
