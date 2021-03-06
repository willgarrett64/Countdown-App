// redux
import { useSelector, useDispatch } from 'react-redux';
import { resetCountdownList } from '../../redux/features/countdownListSlice';
import { removeLiveCountdown } from '../../redux/features/liveCountdownSlice';
import { setSidebarView } from '../../redux/features/sidebarViewSlice';
import { signOut } from '../../redux/features/authenticateSlice';

// utils 
import { apiRequest } from '../../utils/apiRequests';

export default function SignOut() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authenticate.user)

  const handleSignOut = async () => {
    const signOutRes = await apiRequest.signOut(); 
    if (signOutRes === 'ok') {
      dispatch(signOut());      
      dispatch(resetCountdownList());
      dispatch(removeLiveCountdown());
      dispatch(setSidebarView('signIn'));
    } 
  }

  return (
    <div className="signOut">
      <p className="username">{user.username}</p>
      <p className="btn" onClick={handleSignOut} >SIGN OUT</p>      
    </div>
  )
}
