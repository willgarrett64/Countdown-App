// images
import closeIcon from '../../images/close-icon.svg'

// redux
import { useDispatch } from 'react-redux';
import { addCountdown, deleteCountdown, editCountdown, setCountdownList } from '../../redux/features/countdownListSlice';
import { closeOverlay } from '../../redux/features/overlayViewSlice';
import { setLiveCountdown } from '../../redux/features/liveCountdownSlice';

// utils
import { apiRequest } from '../../utils/apiRequests';

export default function CreateCountdown() {
  const dispatch = useDispatch();
  
  const close = () => {
    dispatch(closeOverlay());
  }

  const handleAddNewCountdown = async () => {
    let name = document.getElementById('new-countdown-name').value;
    let date = document.getElementById('new-countdown-date').value;
    let time = document.getElementById('new-countdown-time').value;

    // NEED TO IMPROVE FORM VALIDATION
    if (!name || !date || !time) {
      alert('Please enter a name, date and time');
      return
    }

    const newCountdownObject = {name, date, time};

    const newCountdownResponse = await apiRequest.createNewCountdown(newCountdownObject);

    dispatch(addCountdown(newCountdownResponse));
    dispatch(setLiveCountdown(newCountdownResponse));
    close();
  }
  
  return (
    <div id="edit-countdown-overlay">
      <img src={closeIcon} className="closeIcon" onClick={close} />
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
        <button className="secondary" onClick={close} >CANCEL</button>
        <button className="primary" onClick={handleAddNewCountdown}>SAVE</button>
      </div>
    </div>
  )
}
