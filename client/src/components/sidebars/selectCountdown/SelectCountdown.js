//#region IMPORTS
//components
import AddNewCountdownCard from "./AddNewCountdownCard";
import CountdownCard from "./CountdownCard";

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarView } from "../../../redux/features/sidebarViewSlice";

// images
import dblLeftChevron from '../../../images/icon-dbl-left.svg'
//#endregion IMPORTS


export default function SelectCountdown({toggleSidebarOpen}) {
  const countdownList = useSelector((state) => state.countdownList.list);
  const signedIn = useSelector(state => state.authenticate.signedIn)
  const dispatch = useDispatch();

  return (
    <div className="content">
      <h2>SELECT <strong>COUNTDOWN</strong></h2>
      
      <div id="countdown-list">
        {countdownList.map(countdown => <CountdownCard countdown={countdown} key={countdown.id} />)}
        {
          signedIn 
          ? <AddNewCountdownCard /> 
          : <p className="back-to-signIn" onClick={() => dispatch(setSidebarView('signIn'))}><strong>SIGN IN</strong> FOR MORE FEATURES</p>
        }
      </div>
      <img src={dblLeftChevron} id="close-sidebar-btn" className="open-close-btn" onClick={toggleSidebarOpen} alt="close sidebar icon" />
    </div>
  )
}
