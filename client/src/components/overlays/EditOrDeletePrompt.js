// images
import closeIcon from '../../images/close-icon.svg'

// redux
import { useSelector, useDispatch } from 'react-redux';
import { deleteCountdown } from '../../redux/features/countdownListSlice';
import { removeLiveCountdown, setLiveCountdown } from '../../redux/features/liveCountdownSlice';
import { closeOverlay, setOverlayView } from '../../redux/features/overlayViewSlice';

// utils
import { apiRequest } from '../../utils/apiRequests'; 

export default function EditOrDeletePrompt() {
  const dispatch = useDispatch();
  const countdown = useSelector(state => state.countdownList.editing);
  const liveCountdown = useSelector(state => state.liveCountdown.countdown);
  const countdownList = useSelector(state => state.countdownList.list);

  // close the overlay
  const close = () => {
    dispatch(closeOverlay());
  }

  // delete the countdown
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

  // redirect to edit countdown
  const handleEditCountdown = () => {
    dispatch(setOverlayView('editCountdown'))
  }

  return (
    <div id="edit-or-delete-prompt-overlay" className="overlay-card flex column">
      <img src={closeIcon} className="closeIcon" onClick={close} alt="close icon" />
      <h2>COUNTDOWN<strong> COMPLETE</strong></h2>
      <p>This countdown has already expired, so can no longer be selected</p> 
      <p>Please either delete it or edit the date and time</p>
      <div>
        <button className="secondary" onClick={handleEditCountdown}>EDIT</button>
        <button className="primary" onClick={handleDeleteCountdown}>DELETE</button>
      </div>
    </div>
  )
}
