// react hooks
import { useState, useEffect } from 'react';

// images
import closeIcon from '../../images/close-icon.svg'
import deleteIcon from '../../images/icon-delete.svg'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { addCountdown, deleteCountdown, editCountdown } from '../../redux/features/countdownListSlice';
import { closeOverlay } from '../../redux/features/overlayViewSlice';
import { removeLiveCountdown, setLiveCountdown } from '../../redux/features/liveCountdownSlice';

// utils
import { apiRequest } from '../../utils/apiRequests';
import { countdownIsValid } from '../../utils/formValidation';

export default function CountdownForm({type}) {
  const dispatch = useDispatch();
  const countdown = useSelector(state => state.countdownList.editing); //countdown if editing
  const liveCountdown = useSelector(state => state.liveCountdown.countdown);
  const countdownList = useSelector(state => state.countdownList.list);
  
  // state of input fields
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // pre-fill the input fields with current countdown date if editing an existing countdown
  useEffect(() => {
    if (type === 'edit') {
      setName(countdown.name);
      setDate(countdown.date);
      setTime(countdown.time);

      document.getElementById('countdown-form-name').value = countdown.name;
      document.getElementById('countdown-form-date').value = countdown.date;
      document.getElementById('countdown-form-time').value = countdown.time;
    }
  }, [])

  // function to close the overlay
  const close = () => {
    dispatch(closeOverlay());
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCountdownObject = {name, date, time};

    // verify all data is valid
    if (countdownIsValid(newCountdownObject)) {
      switch (type) {
        case 'edit':
          // if editing, the countdown id needs to be attached to the object
          newCountdownObject.id = countdown.id;
          
          const res = await apiRequest.updateCountdown(newCountdownObject);
          if (res) {
            dispatch(editCountdown(newCountdownObject));  
            // CURRENTLY AN ONCLICK ISSUE - clicking the edit button on the CountdownCard also fires the changeCountdown onclick event, so sets the liveCountdown to the countdown being edited, meaning liveCountdown.id always == res.id
            // if countdown being updated was set as liveCountdown, update liveCountdown
            if(liveCountdown.id == res.id) {
              dispatch(setLiveCountdown(newCountdownObject));
            }
            close();
          }
          break;
        case 'create':
          const newCountdownResponse = await apiRequest.createNewCountdown(newCountdownObject);

          dispatch(addCountdown(newCountdownResponse));
          dispatch(setLiveCountdown(newCountdownResponse));
          close();
          break;
        default:
          break;
      }
    }
  }

  // function to delete a countdown (only used in the edit countdown overlay)
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
    <div id="edit-countdown-overlay" className="overlay-card flex column">
      <img src={closeIcon} className="closeIcon" onClick={close} alt="close icon" />
      <h2><strong>{type.toUpperCase()}</strong> COUNTDOWN</h2>
      <form id="countdown-form" className="flex column">
        <div className="input-label-pair">
          <label htmlFor="countdown-form-name">COUNTDOWN NAME</label>
          <input onChange={e => setName(e.target.value)}className="rounded" id="countdown-form-name" />
        </div>
        <div className="input-label-pair">
          <label htmlFor="countdown-form-date">COUNTDOWN DATE</label>
          <input onChange={e => setDate(e.target.value)}className="rounded" id="countdown-form-date" type="date" />
        </div>
        <div className="input-label-pair">
          <label htmlFor="countdown-form-time">COUNTDOWN TIME</label>
          <input onChange={e => setTime(e.target.value)}className="rounded" id="countdown-form-time" type="time" />
        </div>
        <div>
          <button className="secondary" onClick={close} >CANCEL</button>
          <button type="submit" className="primary" onClick={handleSubmit}>SAVE</button>
        </div>
        {type === 'edit' && (<div className="deleteIcon" onClick={handleDeleteCountdown}>
          <img src={deleteIcon} />
          <p>delete</p>
        </div>)}
      </form>
    </div>
  )
}
