// redux
import { useSelector, useDispatch } from 'react-redux';
import { setCountdownList } from '../redux/features/countdownListSlice';
import { setLiveCountdown } from '../redux/features/liveCountdownSlice';
import { setSidebarView } from '../redux/features/sidebarViewSlice';
import { signOut } from '../redux/features/authenticateSlice';
import { getCountdowns } from '../utils/utils';

export default function SignOut() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.authenticate.user)

  const handleSignOut = () => {
    const url = 'http://localhost:3000/api/users/signout';
    fetch(url)
    .then(res => {
      if (res.status === (202)) {
        console.log('Signed out successfully');
        dispatch(signOut())
        dispatch(setSidebarView('signIn'))
        return getCountdowns('guest');
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
    .then(res => {
        dispatch(setCountdownList(res))
        dispatch(setLiveCountdown(res[0]))
    })
    .catch(error => console.log('error', error))
    
  }

  return (
    <div className="signOut">
      <p className="username">{user.username}</p>
      <p className="btn" onClick={handleSignOut} >SIGN OUT</p>      
    </div>
  )
}
