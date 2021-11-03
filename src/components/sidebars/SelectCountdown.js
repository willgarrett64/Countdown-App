import AddNewCountdownCard from "./AddNewCountdownCard";
import CountdownCard from "./CountdownCard";

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarView } from "../../redux/features/sidebarViewSlice";

export default function SelectCountdown({toggleOverlayHidden}) {
  const countdownList = useSelector((state) => state.countdownList.list);
  const signedIn = useSelector(state => state.authenticate.signedIn)
  const dispatch = useDispatch();

  return (
    <div className="content">
      <p>SELECT <strong>COUNTDOWN</strong></p>
      
      <div id="countdown-list">
        {countdownList.map(countdown => <CountdownCard countdown={countdown} key={countdown.id} />)}
        {signedIn && <AddNewCountdownCard toggleOverlayHidden={toggleOverlayHidden} />}
        {!signedIn && <p class="back-to-signIn" onClick={() => dispatch(setSidebarView('signIn'))}><strong>SIGN IN</strong> FOR MORE FEATURES</p>}
      </div>

    </div>
  )
}
