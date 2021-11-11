// redux
import { useSelector, useDispatch } from 'react-redux';
import { resetToGuest } from '../redux/features/countdownListSlice';
import { resetLiveCountdown } from '../redux/features/liveCountdownSlice';
import { setSidebarView } from '../redux/features/sidebarViewSlice';
import { signOut } from '../redux/features/authenticateSlice';

export default function SignOut() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authenticate.user)

  const handleSignOut = () => {
    const url = 'http://localhost:3000/api/users/signout';
    fetch(url)
    .then(res => {
      if (res.status === (202)) {
        console.log('Logged out successfully');
        dispatch(signOut())
        dispatch(setSidebarView('signIn'))
        dispatch(resetToGuest())
        dispatch(resetLiveCountdown())
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .catch(error => console.log('error', error))
    
  }

  return (
    <div className="signOut">
      <p className="username">{user}</p>
      <p className="btn" onClick={handleSignOut} >SIGN OUT</p>      
    </div>
  )
}
