// redux
import { useSelector, useDispatch } from 'react-redux';
import { setLiveCountdown } from '../../redux/features/liveCountdownSlice';

// import images
import deleteIcon from '../../images/icon-delete.svg';
import editIcon from '../../images/icon-edit.svg';



export default function CountdownCard({countdown}) {  
  const dispatch = useDispatch();
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
      <img src={deleteIcon} class="edit-delete" id="delete-icon" />
      <img src={editIcon} class="edit-delete" id="edit-icon" />
    </div>
  )
}
