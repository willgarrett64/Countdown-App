// redux
import { useSelector, useDispatch } from 'react-redux';
import { removeLiveCountdown, setLiveCountdown } from '../../redux/features/liveCountdownSlice';
import { deleteCountdown, setEditCountdown } from '../../redux/features/countdownListSlice';
import { setOverlayView } from '../../redux/features/overlayViewSlice';

// images
import deleteIcon from '../../images/icon-delete.svg';
import editIcon from '../../images/icon-edit.svg';

// utils
import { apiRequest } from '../../utils/apiRequests';
import { checkDateInFuture } from '../../utils/formValidation';


export default function CountdownCard({countdown}) {  
  const dispatch = useDispatch();
  const liveCountdown = useSelector(state => state.liveCountdown.countdown)
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

    if (!checkDateInFuture(newLiveCountdown.date, newLiveCountdown.time)) {
      dispatch(setOverlayView('editOrDeletePrompt'))
      dispatch(setEditCountdown(newLiveCountdown))
    } else {
      dispatch(setLiveCountdown(newLiveCountdown));
    }
  }

  const handleDeleteCountdown = async (e) => {
    let id;
    let target = e.target;
    id = target.id;
    while (id.slice(0, 9) != 'countdown') {
      target = target.parentNode;
      id = target.id;
    }
    id = id.slice(10);

    const deletedId = await apiRequest.deleteCountdown(id);
    if (deletedId) {
      dispatch(deleteCountdown(deletedId));  
      // if deleting only countdown, set liveCountdown to empty object
      // if deleting current live countdown, change to first in list
      if (countdownList.length === 1) {
        dispatch(removeLiveCountdown())
      } else if (liveCountdown.id == id) {
        dispatch(setLiveCountdown(countdownList[0]));
      }
    }
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
