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
  
  const resetInputs = () => {
    document.getElementById('new-countdown-name').value = '';
    document.getElementById('new-countdown-date').value = '';
    document.getElementById('new-countdown-time').value = '';
  }

  const handleAddNewCountdown = () => {
    let name = document.getElementById('new-countdown-name').value;
    let date = document.getElementById('new-countdown-date').value;
    let time = document.getElementById('new-countdown-time').value;

    if (!name || !date || !time) {
      alert('Please enter a name, date and time');
      return
    }

    const newCountdown = {
      name: name,
      date: date,
      time: time,
    }

    const url = 'http://localhost:3000/api/countdowns';
    const headers = {
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(newCountdown);
    const requestOptions = {
      method: 'POST',
      credentials: 'include',
      headers: headers,
      body: body, 
    }

    fetch(url, requestOptions)
    .then(res => {
      if (res.status === (200)) {
        console.log('New countdown created successfully');
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .then(res => {
      dispatch(addCountdown({...res.data, id: res.id}));
      toggleOverlayHidden();
      resetInputs();
    })
    .catch(error => console.log('error', error))      
    
  }

  const handleCancel = () => {
    toggleOverlayHidden();
    resetInputs();
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
        <button className="secondary" onClick={handleCancel} >CANCEL</button>
        <button className="primary" onClick={handleAddNewCountdown}>SAVE</button>
      </div>
      <div className="deleteIcon">
        <img src={deleteIcon} />
        <p>delete</p>
      </div>
    </div>
  )
}
