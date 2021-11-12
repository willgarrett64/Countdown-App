import { useEffect } from 'react';

// import images
import closeIcon from '../../images/close-icon.svg'
import deleteIcon from '../../images/icon-delete.svg'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { addCountdown, deleteCountdown, editCountdown, setCountdownList } from '../../redux/features/countdownListSlice';

export default function EditCountdown({toggleOverlayHidden}) {
  const dispatch = useDispatch();
  const countdown = useSelector(state => state.countdownList.editing);

  useEffect(() => {
    document.getElementById('edit-countdown-name').value = countdown.name;
    document.getElementById('edit-countdown-date').value = countdown.date;
    document.getElementById('edit-countdown-time').value = countdown.time;
  }, [countdown])
  

  const handleCancel = () => {
    toggleOverlayHidden();
  }
  
  return (
    <div id="edit-countdown-overlay">
      <img src={closeIcon} className="closeIcon" onClick={toggleOverlayHidden} />
      <h2><strong>EDIT</strong> COUNTDOWN</h2>
      <div className="input-label-pair">
        <label htmlFor="edit-countdown-name">COUNTDOWN NAME</label>
        <input className="rounded" id="edit-countdown-name" />
      </div>
      <div className="input-label-pair">
        <label htmlFor="edit-countdown-date">COUNTDOWN DATE</label>
        <input className="rounded" id="edit-countdown-date" type="date" />
      </div>
      <div className="input-label-pair">
        <label htmlFor="edit-countdown-time">COUNTDOWN TIME</label>
        <input className="rounded" id="edit-countdown-time" type="time" />
      </div>
      <div>
        <button className="secondary" onClick={handleCancel} >CANCEL</button>
        <button className="primary" onClick={(e) => e.target}>SAVE</button>
      </div>
      <div className="deleteIcon">
        <img src={deleteIcon} />
        <p>delete</p>
      </div>
    </div>
  )
}
