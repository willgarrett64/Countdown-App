// react hooks
import { useState, useEffect } from 'react';

// images
import closeIcon from '../../images/close-icon.svg'
import deleteIcon from '../../images/icon-delete.svg'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteCountdown, editCountdown } from '../../redux/features/countdownListSlice';
import { removeLiveCountdown, setLiveCountdown } from '../../redux/features/liveCountdownSlice';
import { closeOverlay } from '../../redux/features/overlayViewSlice';

// utils
import { apiRequest } from '../../utils/apiRequests'; 

export default function EditCountdown() {
  const dispatch = useDispatch();
  const countdown = useSelector(state => state.countdownList.editing);
  const liveCountdown = useSelector(state => state.liveCountdown.countdown);
  const countdownList = useSelector(state => state.countdownList.list);

  const close = () => {
    dispatch(closeOverlay());
  }

  const [name, setName] = useState(countdown.name);
  const [date, setDate] = useState(countdown.date);
  const [time, setTime] = useState(countdown.time);

  useEffect(() => {
    document.getElementById('edit-countdown-name').value = countdown.name;
    document.getElementById('edit-countdown-date').value = countdown.date;
    document.getElementById('edit-countdown-time').value = countdown.time;
  }, [countdown])

  const handleUpdateCountdown = async () => {
    const newCountdown = {
      id: countdown.id,
      name, date, time
    }
    const res = await apiRequest.updateCountdown(newCountdown);
    if (res) {
      dispatch(editCountdown(newCountdown));  
      console.log('Countdown updated successfully');
      // CURRENTLY AN ONCLICK ISSUE - clicking the edit button on the CountdownCard also fires the changeCountdown onclick event, so sets the liveCountdown to the countdown being edited, meaning liveCountdown.id always == res.id
      // if countdown being updated was set as liveCountdown, update liveCountdown
      if(liveCountdown.id == res.id) {
        dispatch(setLiveCountdown(newCountdown));
      }
      close();
    }

  }

  const handleDeleteCountdown = async () => {
    const deletedId = await apiRequest.deleteCountdown(countdown.id);
    if (deletedId) {
      dispatch(deleteCountdown(deletedId));     
      // if deleting only countdown, set liveCountdown to empty object
      // if deleting current live countdown, change to first in list
      if(countdownList.length === 1) {
        dispatch(removeLiveCountdown())
      } else if (liveCountdown.id == countdown.id) {
        dispatch(setLiveCountdown(countdownList[0]));
      }
      close();
    }
  }

  return (
    <div id="edit-countdown-overlay">
      <img src={closeIcon} className="closeIcon" onClick={close} alt="close icon" />
      <h2><strong>EDIT</strong> COUNTDOWN</h2>
      <div className="input-label-pair">
        <label htmlFor="edit-countdown-name">COUNTDOWN NAME</label>
        <input className="rounded" id="edit-countdown-name" onChange={e => setName(e.target.value)} />
      </div>
      <div className="input-label-pair">
        <label htmlFor="edit-countdown-date">COUNTDOWN DATE</label>
        <input className="rounded" id="edit-countdown-date" type="date" onChange={e => setDate(e.target.value)} />
      </div>
      <div className="input-label-pair">
        <label htmlFor="edit-countdown-time">COUNTDOWN TIME</label>
        <input className="rounded" id="edit-countdown-time" type="time" onChange={e => setTime(e.target.value)} />
      </div>
      <div>
        <button className="secondary" onClick={close} >CANCEL</button>
        <button className="primary" onClick={handleUpdateCountdown}>SAVE</button>
      </div>
      <div className="deleteIcon" onClick={handleDeleteCountdown}>
        <img src={deleteIcon} />
        <p>delete</p>
      </div>
    </div>
  )
}
