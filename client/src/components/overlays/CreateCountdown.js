// images
import closeIcon from '../../images/close-icon.svg'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { addCountdown, deleteCountdown, editCountdown, setCountdownList } from '../../redux/features/countdownListSlice';
import { setLiveCountdown } from '../../redux/features/liveCountdownSlice';

// utils
import { apiRequest } from '../../utils/apiRequests';

export default function CreateCountdown({toggleOverlayHidden}) {
  const dispatch = useDispatch();
  
  const resetInputs = () => {
    document.getElementById('new-countdown-name').value = '';
    document.getElementById('new-countdown-date').value = '';
    document.getElementById('new-countdown-time').value = '';
  }

  const handleAddNewCountdown = async () => {
    let name = document.getElementById('new-countdown-name').value;
    let date = document.getElementById('new-countdown-date').value;
    let time = document.getElementById('new-countdown-time').value;

    if (!name || !date || !time) {
      alert('Please enter a name, date and time');
      return
    }

    const newCountdownObject = {
      name: name,
      date: date,
      time: time,
    }

    const data = await apiRequest.createNewCountdown(newCountdownObject);

    dispatch(addCountdown(data));
    dispatch(setLiveCountdown(data));
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
