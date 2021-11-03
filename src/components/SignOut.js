// redux
import { useSelector, useDispatch } from 'react-redux';
import { resetToGuest } from '../redux/features/countdownListSlice';
import { setLiveCountdown } from '../redux/features/liveCountdownSlice';
import { setSidebarView } from '../redux/features/sidebarViewSlice';
import { signOut } from '../redux/features/authenticateSlice';

export default function SignOut() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authenticate.user)

  const handleSignOut = () => {
    dispatch(signOut())
    dispatch(setSidebarView('signIn'))
    dispatch(resetToGuest())
    dispatch(setLiveCountdown(1))
  }

  return (
    <div className="signOut">
      <p className="username">{user.username}</p>
      <p className="btn" onClick={handleSignOut} >SIGN OUT</p>      
    </div>
  )
}
