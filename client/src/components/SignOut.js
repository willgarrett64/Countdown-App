// redux
import { useSelector, useDispatch } from 'react-redux';
import { setCountdownList } from '../redux/features/countdownListSlice';
import { setLiveCountdown } from '../redux/features/liveCountdownSlice';
import { setSidebarView } from '../redux/features/sidebarViewSlice';
import { signOut } from '../redux/features/authenticateSlice';

// utils 
import { apiRequest } from '../utils/apiRequests';

export default function SignOut() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authenticate.user)

  const handleSignOut = async () => {
    const signOutOk = await apiRequest.signOut(); 
    if (signOutOk) {
      dispatch(signOut());
      dispatch(setSidebarView('signIn'));
      
      const guestCountdowns = await apiRequest.getCountdowns('guest');
      dispatch(setCountdownList(guestCountdowns))
      dispatch(setLiveCountdown(guestCountdowns[0]))
    } 
  }

  return (
    <div className="signOut">
      <p className="username">{user.username}</p>
      <p className="btn" onClick={handleSignOut} >SIGN OUT</p>      
    </div>
  )
}
