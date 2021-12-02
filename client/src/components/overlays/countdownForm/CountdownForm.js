//#region IMPORTS
// react hooks
import { useState, useEffect } from 'react';

// components
import Form from '../../forms/Form';

// images
import closeIcon from '../../../images/close-icon.svg'
import deleteIcon from '../../../images/icon-delete.svg'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { addCountdown, editCountdown } from '../../../redux/features/countdownListSlice';
import { closeOverlay, setOverlayView } from '../../../redux/features/overlayViewSlice';
import { setLiveCountdown } from '../../../redux/features/liveCountdownSlice';

// utils
import { apiRequest } from '../../../utils/apiRequests';
import { countdownIsValid } from '../../../utils/countdownValidation';
//#endregion IMPORTS


export default function CountdownForm({type}) {
  const dispatch = useDispatch();
  const countdown = useSelector(state => state.countdownList.editing); //countdown if editing
  
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

      document.getElementById('countdown-name').value = countdown.name;
      document.getElementById('countdown-date').value = countdown.date;
      document.getElementById('countdown-time').value = countdown.time;
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
          // if editing existing countdown, the id needs to be attached to the object
          newCountdownObject.id = countdown.id;
          
          const res = await apiRequest.updateCountdown(newCountdownObject);
          if (res) {
            dispatch(editCountdown(newCountdownObject)); 
            dispatch(setLiveCountdown(newCountdownObject));
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
    dispatch(setOverlayView('confirmDeletePrompt'))
  }
  
  return (
    <div id="edit-countdown-overlay" className="overlay-card flex column">
      <img src={closeIcon} className="closeIcon" onClick={close} alt="close icon" />
      <h2><strong>{type.toUpperCase()}</strong> COUNTDOWN</h2>
      
      <Form 
        inputs={[
          {
            label: "COUNTDOWN NAME",
            id: 'countdown-name',
            inputClasses: 'rounded',
            required: true,
            onChange: e => setName(e.target.value)
          },
          {
            label: "COUNTDOWN DATE",
            id: 'countdown-date',
            inputClasses: 'rounded',
            required: true,
            onChange: e => setDate(e.target.value),
            type: 'date'
          },
          {
            label: "COUNTDOWN TIME",
            id: 'countdown-time',
            inputClasses: 'rounded',
            required: true,
            onChange: e => setTime(e.target.value),
            type: 'time'
          },
        ]}

        buttons={{
          className: 'flex row',
          buttons: [
            {
              text: 'CANCEL',
              classes: 'secondary',
              onClick: close
            },
            {
              text: 'SAVE',
              classes: 'primary',
              onClick: handleSubmit
            }
          ]
        }}

        id="countdown-form"
        className="flex column"
      />
      {
        type === 'edit' && (
          <div 
            className="deleteIcon" 
            onClick={handleDeleteCountdown}
          >
            <img src={deleteIcon} />
            <p>delete</p>
          </div>
        )}
    </div>
  )
}
