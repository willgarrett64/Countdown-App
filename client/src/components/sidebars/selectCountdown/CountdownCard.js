//#region IMPORTS
// redux
import { useSelector, useDispatch } from 'react-redux';
import { setLiveCountdown } from '../../../redux/features/liveCountdownSlice';
import { setEditCountdown } from '../../../redux/features/countdownListSlice';
import { setOverlayView } from '../../../redux/features/overlayViewSlice';

// images
import deleteIcon from '../../../images/icon-delete.svg';
import editIcon from '../../../images/icon-edit.svg';

// utils
import { checkDateInFuture } from '../../../utils/countdownValidation';
//#endregion IMPORTS


export default function CountdownCard({countdown}) {  
  const dispatch = useDispatch();
  const countdownList = useSelector(state => state.countdownList.list);
  const signedIn = useSelector(state => state.authenticate.signedIn)

  const changeLiveCountdown = (e) => {
    let id;
    let target = e.target;
    id = target.id;
    while (id.slice(0, 9) != 'countdown') {
      target = target.parentNode;
      id = target.id;
    }
    
    const newLiveCountdown = countdownList.find(countdown => countdown.id == id.slice(10));

    dispatch(setEditCountdown(newLiveCountdown))

    if (!checkDateInFuture(newLiveCountdown.date, newLiveCountdown.time)) {
      dispatch(setOverlayView('countdownCompletePrompt'))
    } else {
      dispatch(setLiveCountdown(newLiveCountdown));
    }
  }

  const handleDeleteCountdown = async (e) => {
    dispatch(setOverlayView('confirmDeletePrompt'))
  }

  const reorderDate = (date) => {
    const dateArray = date.split('-');
    return dateArray[2] + '/' + dateArray[1] +'/' + dateArray[0].substring(2);
  }

  const openEditCountdown = () => {
    dispatch(setOverlayView('editCountdown'));
    dispatch(setEditCountdown(countdown));
  }

  return (
    <div className="card countdown" onClick={changeLiveCountdown} id={`countdown-${countdown.id}`}>
      <div className="info name">
        <p>{countdown.name}</p>
      </div>
      <div className="info date">
        <h3>DATE</h3>
        <p>{reorderDate(countdown.date)}</p>
      </div>
      <div className="info time">
        <h3>TIME</h3>
        <p>{countdown.time}</p>
      </div>
      {signedIn && <img src={editIcon} className="edit-delete" id="edit-icon" onClick={openEditCountdown} alt="edit icon" />}
      {signedIn && <img src={deleteIcon} className="edit-delete" id="delete-icon" onClick={handleDeleteCountdown} alt="delete icon" />}
    </div>
  )
}
