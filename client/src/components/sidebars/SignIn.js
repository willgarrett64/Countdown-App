import {useState} from 'react';

// redux
import { useDispatch } from 'react-redux';
import { setSidebarView } from '../../redux/features/sidebarViewSlice';
import { signIn } from '../../redux/features/authenticateSlice';
import { setCountdownList } from '../../redux/features/countdownListSlice';
import { setLiveCountdown } from '../../redux/features/liveCountdownSlice';

// utils
import { apiRequest } from '../../utils/apiRequests';
import { handleError, setErrorTooltip } from '../../utils/errorHandling';


export default function SignIn() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // error message elements 
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');


  const handleSignIn = async e => {
    e.preventDefault();

    // reset any error messages on attempt to submit new form data
    usernameError.innerText = '';
    passwordError.innerText = '';

    let errors = false;
    if (!username) {
      setErrorTooltip('Please enter a username', usernameError);
      errors = true;
    } 
    if (!password) {
      // handle blank password
      setErrorTooltip('Please enter a password', passwordError);
      errors = true;
    } 

    if (!errors) {
      const response = await apiRequest.signIn(username, password); 
      if (response === 'ok') {
        const userData = await apiRequest.getUserData();
        const countdowns = await apiRequest.getCountdowns('myCountdowns');

        dispatch(signIn(userData));
        if (countdowns) {
          dispatch(setCountdownList(countdowns));
          dispatch(setLiveCountdown(countdowns[0]));
        }
        dispatch(setSidebarView('selectCountdown'));
      } else {
        handleError(response);
      }
    }
  }

  const handleContAsGuest = async () => {
    const countdowns = await apiRequest.getCountdowns('guest');
    dispatch(setCountdownList(countdowns));
    dispatch(setLiveCountdown(countdowns[0]));
    dispatch(setSidebarView('selectCountdown'));
  }

  return (
    <div className="content">
      <h2>Sign in to your account to access <strong>full features</strong></h2>
      <div className="input-label-pair">
        <label htmlFor="username-signin">USERNAME</label>
        <input id="username-signin" required onChange={e => setUsername(e.target.value)} />
        <span id="username-error" className="error-message"></span>
      </div>
      <div className="input-label-pair">
        <label htmlFor="password-signin">PASSWORD</label>
        <input id="password-signin" type="password" required onChange={e => setPassword(e.target.value)} />
        <span id="password-error" className="error-message"></span>
      </div>

      <button className="primary" onClick={handleSignIn}>SIGN IN</button>
      <button className="secondary" onClick={() => dispatch(setSidebarView('signUp'))}>SIGN UP</button>
      <p className="guest-btn" onClick={handleContAsGuest} >CONTINUE AS GUEST</p>
    </div>
  )
}
