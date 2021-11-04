// import images
import closeIcon from '../../images/close-icon.svg'
import deleteIcon from '../../images/icon-delete.svg'

// TEST - client side log in
import users from '../../clientSideLogin/users';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { addCountdown, deleteCountdown, editCountdown, setCountdownList } from '../../redux/features/countdownListSlice';

export default function EditCountdown({toggleOverlayHidden}) {
  const dispatch = useDispatch();
  
  const handleAddNewCountdown = () => {
    let name = document.getElementById('new-countdown-name').value;
    let date = document.getElementById('new-countdown-date').value;
    let time = document.getElementById('new-countdown-time').value;

    if (!name || !date || !time) {
      alert('Please enter a name, date and time')
    }

    const newCountdown = {
      name: name,
      date: date,
      time: time,
      complete: false,
    }

    dispatch(addCountdown(newCountdown));
  }
  
  return (
    <div id="edit-countdown-overlay">
      <img src={closeIcon} className="closeIcon" onClick={toggleOverlayHidden} />
      <h2><strong>EDIT</strong> COUNTDOWN</h2>
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
        <button className="secondary" onClick={toggleOverlayHidden} >CANCEL</button>
        <button className="primary" onClick={handleAddNewCountdown}>SAVE</button>
      </div>
      <div className="deleteIcon">
        <img src={deleteIcon} />
        <p>delete</p>
      </div>
    </div>
  )
}
