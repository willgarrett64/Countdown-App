// redux
import { useSelector, useDispatch } from 'react-redux';
import { liveCountdown, setLiveCountdown } from '../../redux/features/liveCountdownSlice';


export default function CountdownCard({countdown}) {  
  const liveCountdown = useSelector((state) => state.liveCountdown.id)
  const dispatch = useDispatch();


  const changeCountdown = (e) => {
    let id;
    let target = e.target;
    id = target.id;
    while (!id) {
      target = target.parentNode;
      id = target.id;
    }
    const newLiveCountdown = parseInt(id.slice(10))
    dispatch(setLiveCountdown(newLiveCountdown));
  }

  return (
    <div className="card countdown" onClick={changeCountdown} id={`countdown-${countdown.id}`}>
      <div className="info name">
        <p>{countdown.name}</p>
      </div>
      <div className="info date">
        <h3>DATE</h3>
        <p>{countdown.date}</p>
      </div>
      <div className="info time">
        <h3>TIME</h3>
        <p>{countdown.time}</p>
      </div>
    </div>
  )
}
