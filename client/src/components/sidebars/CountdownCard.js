// redux
import { useSelector, useDispatch } from 'react-redux';
import { setLiveCountdown } from '../../redux/features/liveCountdownSlice';
import { deleteCountdown } from '../../redux/features/countdownListSlice';


// import images
import deleteIcon from '../../images/icon-delete.svg';
import editIcon from '../../images/icon-edit.svg';



export default function CountdownCard({countdown, toggleOverlayHidden}) {  
  const dispatch = useDispatch();
  const liveCountdown = useSelector(state => state.liveCountdown.countdown)
  const countdownList = useSelector(state => state.countdownList.list);

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

  const handleDelete = (e) => {
    let id;
    let target = e.target;
    id = target.id;
    while (id.slice(0, 9) != 'countdown') {
      target = target.parentNode;
      id = target.id;
    }
    id = id.slice(10);

    const url = `http://localhost:3000/api/countdowns/?id=${id}`;
    const headers = {
      "Content-Type": "application/json"
    };
    const body = JSON.stringify({id: id});
    const requestOptions = {
      method: 'DELETE',
      credentials: 'include',
      headers: headers,
      body: body, 
    }

    fetch(url, requestOptions)
    .then(res => {
      if (res.status === (200)) {
        console.log('Countdown deleted successfully');
        return res.json();
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .then(res => {
      dispatch(deleteCountdown(res.data));      
      // if countdown being deleted was set as liveCountdown, update liveCountdown
      if(liveCountdown.id == id) {
        dispatch(setLiveCountdown(countdownList[0]))
      }
    })
    .catch(error => console.log('error', error)) 

  }

  const reorderDate = (date) => {
    const dateArray = date.split('-');
    return dateArray[2] + '/' + dateArray[1] +'/' + dateArray[0].substring(2);
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
      <img src={editIcon} className="edit-delete" id="edit-icon" onClick={toggleOverlayHidden} />
      <img src={deleteIcon} className="edit-delete" id="delete-icon" onClick={handleDelete} />
    </div>
  )
}
