// images
import closeIcon from '../../images/close-icon.svg'

// redux
import { useDispatch } from 'react-redux';
import { addCountdown, deleteCountdown, editCountdown, setCountdownList } from '../../redux/features/countdownListSlice';
import { setLiveCountdown } from '../../redux/features/liveCountdownSlice';

// utils
import { apiRequest } from '../../utils/apiRequests';

export default function CreateCountdown({toggleOverlayHidden}) {
  const dispatch = useDispatch();
  
  // form elements
  const nameInput = document.getElementById('new-countdown-name')
  const dateInput = document.getElementById('new-countdown-date')
  const timeInput = document.getElementById('new-countdown-time')

  const resetInputs = () => {
    nameInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
  }

  const handleAddNewCountdown = async () => {
    let name = nameInput.value;
    let date = dateInput.value;
    let time = timeInput.value;

    // NEED TO IMPROVE FORM VALIDATION
    if (!name || !date || !time) {
      alert('Please enter a name, date and time');
      return
    }

    const newCountdownObject = {name, date, time};

    const newCountdownResponse = await apiRequest.createNewCountdown(newCountdownObject);

    dispatch(addCountdown(newCountdownResponse));
    dispatch(setLiveCountdown(newCountdownResponse));
    toggleOverlayHidden();
    resetInputs();
  }

  const handleCancel = () => {
    toggleOverlayHidden();
    resetInputs();
  }
  
  return (
    <div id="edit-countdown-overlay">
      <img src={closeIcon} className="closeIcon" onClick={toggleOverlayHidden} />
      <h2><strong>CREATE</strong> COUNTDOWN</h2>
      <div className="input-label-pair">
        <label htmlFor="new-countdown-name">COUNTDOWN NAME</label>
        <input className="rounded" id="new-countdown-name" />
      </div>
      <div className="input-label-pair">
        <label htmlFor="new-countdown-date">COUNTDOWN DATE</label>
        <input className="rounded" id="new-countdown-date" type="date" />
      </div>
      <div className="input-label-pair">
        <label htmlFor="new-countdown-time">COUNTDOWN TIME</label>
        <input className="rounded" id="new-countdown-time" type="time" />
      </div>
      <div>
        <button className="secondary" onClick={handleCancel} >CANCEL</button>
        <button className="primary" onClick={handleAddNewCountdown}>SAVE</button>
      </div>
    </div>
  )
}
