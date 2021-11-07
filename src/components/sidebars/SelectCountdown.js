import AddNewCountdownCard from "./AddNewCountdownCard";
import CountdownCard from "./CountdownCard";

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarView } from "../../redux/features/sidebarViewSlice";

//import images
import dblLeftChevron from '../../images/icon-dbl-left.svg'

export default function SelectCountdown({toggleOverlayHidden, toggleSidebarOpen}) {
  const countdownList = useSelector((state) => state.countdownList.list);
  const signedIn = useSelector(state => state.authenticate.signedIn)
  const dispatch = useDispatch();

  return (
    <div className="content">
      <p>SELECT <strong>COUNTDOWN</strong></p>
      
      <div id="countdown-list">
        {countdownList.map(countdown => <CountdownCard countdown={countdown} key={countdown.id} toggleOverlayHidden={toggleOverlayHidden} />)}
        {signedIn && <AddNewCountdownCard toggleOverlayHidden={toggleOverlayHidden} />}
        {!signedIn && <p className="back-to-signIn" onClick={() => dispatch(setSidebarView('signIn'))}><strong>SIGN IN</strong> FOR MORE FEATURES</p>}
      </div>
      <img src={dblLeftChevron} id="close-sidebar-btn" className="open-close-btn" onClick={toggleSidebarOpen} />
    </div>
  )
}
