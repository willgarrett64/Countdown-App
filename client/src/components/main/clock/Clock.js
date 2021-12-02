//#region IMPORTS
// styles
import './Clock.css'

// components 
import ClockCard from "./ClockCard";
import Button from '../../forms/Button';

// react hooks
import { useState, useEffect } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setOverlayView } from '../../../redux/features/overlayViewSlice';

// utils
import { calculateSecondsUntil } from "../../../utils/clockFunctions";
//#endregion IMPORTS


export default function Clock() {
  const dispatch = useDispatch();
  const liveCountdown = useSelector(state => state.liveCountdown.countdown);

  const [totalSecondsRemaining, setTotalSecondsRemaining] = useState();

  // count down one second
  const tickSecond = () => {
    setTotalSecondsRemaining(totalSecondsRemaining => totalSecondsRemaining - 1);
  }
  
  // initiate the clock and start counting down each second
  useEffect(() => {
    setTotalSecondsRemaining(calculateSecondsUntil(liveCountdown));
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
          <Button 
            classes='secondary'
            onClick={handleEditCountdown}
            text="EDIT"
          />
          <Button 
            classes='primary'
            onClick={handleDeleteCountdown}
            text="DELETE"
          />
        </div>
      </div>
    )
  }
  
}
