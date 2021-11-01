import AddNewCountdownCard from "./AddNewCountdownCard";
import CountdownCard from "./CountdownCard";

// redux
import { useSelector, useDispatch } from 'react-redux';
import { liveCountdown } from '../../redux/features/liveCountdownSlice';


export default function SelectCountdown({myCountdowns}) {
  const liveCountdown = useSelector((state) => state.liveCountdown.id)
  const dispatch = useDispatch();

  return (
    <div className="content">
      <p>SELECT <strong>COUNTDOWN</strong></p>
      
      <div id="countdown-list">
        {myCountdowns.map(countdown => <CountdownCard countdown={countdown} key={countdown.id} />)}
        <AddNewCountdownCard />
      </div>

    </div>
  )
}
