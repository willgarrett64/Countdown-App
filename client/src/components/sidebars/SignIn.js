import react, {useState} from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarView } from '../../redux/features/sidebarViewSlice';
import { signIn } from '../../redux/features/authenticateSlice';
import { setCountdownList } from '../../redux/features/countdownListSlice';
import { setLiveCountdown } from '../../redux/features/liveCountdownSlice';


import { apiRequest } from '../../utils/apiRequests';


export default function SignIn() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async e => {
    e.preventDefault();

    if (!username) {
      // handle blank username
      return
    } else if (!password) {
      // handle blank password
      return
    } else {
      const signInOk = await apiRequest.signIn(username, password); 
      if (signInOk) {
        const userData = await apiRequest.getUserData();
        const countdowns = await apiRequest.getCountdowns('myCountdowns');

        dispatch(signIn(userData));
        if (countdowns) {
          dispatch(setCountdownList(countdowns));
          dispatch(setLiveCountdown(countdowns[0]));
        }
        dispatch(setSidebarView('selectCountdown'));
      }
    }
  }

  return (
    <div className="content">
      <h2>Sign in to your account to access <strong>full features</strong></h2>
      <div className="input-label-pair">
        <label htmlFor="username-signin">USERNAME</label>
        <input id="username-signin" onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="input-label-pair">
        <label htmlFor="password-signin">PASSWORD</label>
        <input id="password-signin" type="password" onChange={e => setPassword(e.target.value)} />
      </div>

      <button className="primary" onClick={handleSubmit}>SIGN IN</button>
      <button className="secondary" onClick={() => dispatch(setSidebarView('signUp'))}>SIGN UP</button>
      <p className="guest-btn" onClick={() => dispatch(setSidebarView('selectCountdown'))} >CONTINUE AS GUEST</p>
    </div>
  )
}
