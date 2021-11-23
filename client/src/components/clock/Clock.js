// components 
import ClockCard from "./ClockCard";

// react hooks
import { useState, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteCountdown } from '../../redux/features/countdownListSlice';
import { removeLiveCountdown, setLiveCountdown } from '../../redux/features/liveCountdownSlice';
import { setOverlayView } from '../../redux/features/overlayViewSlice';

// utils
import { apiRequest } from '../../utils/apiRequests'; 

// functions - will eventually be separated into utils modules
const calculateTimeUntil = (countdown) => {
  const currentDate = Date.now(); //get unix timestamp for current date/time)
  const countdownDate = Date.parse(countdown.date + ' ' + countdown.time) //get unix timestamp for countdown date/time
  const timeUntil = Math.floor((countdownDate - currentDate) / 1000); //calculate time (in seconds) until countdown date
  return timeUntil
}

export default function Clock() {
  const dispatch = useDispatch();
  const countdown = useSelector(state => state.countdownList.editing);
  const liveCountdown = useSelector(state => state.liveCountdown.countdown);
  const countdownList = useSelector(state => state.countdownList.list);

  const [totalSecondsRemaining, setTotalSecondsRemaining] = useState();

  // count down one second
  const tickSecond = () => {
    setTotalSecondsRemaining(totalSecondsRemaining => totalSecondsRemaining - 1);
  }
  
  // initiate the clock and start counting down each second
  useEffect(() => {
    setTotalSecondsRemaining(calculateTimeUntil(liveCountdown));
    const myClock = setInterval(tickSecond, 1000);
    return () => {
      clearInterval(myClock);
    }
  }, [liveCountdown])


  // delete the countdown
  const handleDeleteCountdown = async () => {
    dispatch(setOverlayView('confirmDeletePrompt'))
  }

  // redirect to edit countdown
  const handleEditCountdown = () => {
    dispatch(setOverlayView('editCountdown'))
  }

  
  if (totalSecondsRemaining >= 0) {
    return (
      <div className="clock-wrapper">
        <h1>DAYS UNTIL {liveCountdown.name.toUpperCase()}</h1>
        <div className="clock">
          <ClockCard type={'days'} totalSeconds={totalSecondsRemaining} />
          <ClockCard type={'hours'} totalSeconds={totalSecondsRemaining} />
          <ClockCard type={'minutes'} totalSeconds={totalSecondsRemaining} />
          <ClockCard type={'seconds'} totalSeconds={totalSecondsRemaining} />
        </div>
      </div>
    )
  } else {
    return (
      <div className="clock-wrapper">
        <h1>{liveCountdown.name.toUpperCase()} COUNTDOWN COMPLETE</h1>
        <div>
          <button className="secondary" onClick={handleEditCountdown}>EDIT</button>
          <button className="primary" onClick={handleDeleteCountdown}>DELETE</button>
      </div>
      </div>
    )
  }
  
}
