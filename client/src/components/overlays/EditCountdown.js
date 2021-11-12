import { useEffect } from 'react';

// import images
import closeIcon from '../../images/close-icon.svg'
import deleteIcon from '../../images/icon-delete.svg'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteCountdown, editCountdown, setCountdownList } from '../../redux/features/countdownListSlice';
import { setLiveCountdown } from '../../redux/features/liveCountdownSlice';

import { deleteCountdownRequest } from '../../utils/utils'; 

export default function EditCountdown({toggleOverlayHidden}) {
  const dispatch = useDispatch();
  const countdown = useSelector(state => state.countdownList.editing);
  const liveCountdown = useSelector(state => state.liveCountdown.countdown);
  const countdownList = useSelector(state => state.countdownList.list);

  useEffect(() => {
    document.getElementById('edit-countdown-name').value = countdown.name;
    document.getElementById('edit-countdown-date').value = countdown.date;
    document.getElementById('edit-countdown-time').value = countdown.time;
  }, [countdown])
  

  const handleCancel = () => {
    toggleOverlayHidden();
  }

  const handleDeleteCountdown = async (e) => {
    const deletedId = await deleteCountdownRequest(countdown.id);
    if (deletedId) {
      dispatch(deleteCountdown(deletedId));      
      // if countdown being deleted was set as liveCountdown, update liveCountdown
      if(liveCountdown.id == countdown.id) {
        dispatch(setLiveCountdown(countdownList[0]));
        toggleOverlayHidden();
      }
    }
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
      <div className="deleteIcon" onClick={handleDeleteCountdown}>
        <img src={deleteIcon} />
        <p>delete</p>
      </div>
    </div>
  )
}
