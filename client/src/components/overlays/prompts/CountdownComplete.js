//#region IMPORTS
// images
import closeIcon from '../../../images/close-icon.svg'

// redux
import { useDispatch } from 'react-redux';
import { closeOverlay, setOverlayView } from '../../../redux/features/overlayViewSlice';
//#endregion IMPORTS


export default function CountdownCompletePrompt() {
  const dispatch = useDispatch();

  // close the overlay
  const close = () => {
    dispatch(closeOverlay());
  }
  
  // delete the countdown
  const handleDeleteCountdown = async () => {
    dispatch(setOverlayView('confirmDeletePrompt'))
  }

  // redirect to edit countdown
  const handleEditCountdown = () => {
    dispatch(setOverlayView('editCountdown'))
  }

  return (
    <div id="edit-or-delete-prompt-overlay" className="prompt overlay-card flex column">
      <img src={closeIcon} className="closeIcon" onClick={close} alt="close icon" />
      <h2>COUNTDOWN<strong> COMPLETE</strong></h2>
      <h4>This countdown has already expired, so can no longer be selected</h4> 
      <h4>Please either delete it or edit the date and time</h4>
      <div>
        <button className="secondary" onClick={handleEditCountdown}>EDIT</button>
        <button className="primary" onClick={handleDeleteCountdown}>DELETE</button>
      </div>
    </div>
  )
}
