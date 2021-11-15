// redux
import { useSelector, useDispatch } from 'react-redux';
import { setLiveCountdown } from '../../redux/features/liveCountdownSlice';
import { deleteCountdown, setEditCountdown } from '../../redux/features/countdownListSlice';
import { setOverlayView } from '../../redux/features/overlayViewSlice';

// import images
import deleteIcon from '../../images/icon-delete.svg';
import editIcon from '../../images/icon-edit.svg';


import { apiRequest } from '../../utils/apiRequests';


export default function CountdownCard({countdown, toggleOverlayHidden}) {  
  const dispatch = useDispatch();
  const liveCountdown = useSelector(state => state.liveCountdown.countdown)
  const countdownList = useSelector(state => state.countdownList.list);
  const signedIn = useSelector(state => state.authenticate.signedIn)

  const changeCountdown = (e) => {
    let id;
    let target = e.target;
    id = target.id;
    while (id.slice(0, 9) != 'countdown') {
      target = target.parentNode;
      id = target.id;
    }
    
    const newLiveCountdown = countdownList.find(countdown => countdown.id == id.slice(10));

    dispatch(setLiveCountdown(newLiveCountdown));
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
      // if countdown being deleted was set as liveCountdown, update liveCountdown
      if(liveCountdown.id == id) {
        dispatch(setLiveCountdown(countdownList[0]))
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
    toggleOverlayHidden();
  }

  return (
    <div className="card countdown" onClick={changeCountdown} id={`countdown-${countdown.id}`}>
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
      {signedIn && <img src={editIcon} className="edit-delete" id="edit-icon" onClick={openEditCountdown} />}
      {signedIn && <img src={deleteIcon} className="edit-delete" id="delete-icon" onClick={handleDeleteCountdown} />}
    </div>
  )
}
