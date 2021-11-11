import react, {useState} from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarView } from '../../redux/features/sidebarViewSlice';
import { signIn } from '../../redux/features/authenticateSlice';
import { setCountdownList } from '../../redux/features/countdownListSlice';
import { setLiveCountdown } from '../../redux/features/liveCountdownSlice';


import { getUserData, getCountdowns } from '../../utils/utils';


export default function SignIn() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');




  const handleSubmit = e => {
    e.preventDefault();

    if (!username) {
      // handle blank username
      return
    } else if (!password) {
      // handle blank password
      return
    } else {
      const url = 'http://localhost:3000/api/users/signin';
      const headers = {
        "Content-Type": "application/json"
      };
      const body = JSON.stringify({
        "username": username,
        "password": password
      });
      const requestOptions = {
        method: 'POST',
        credentials: 'include',
        headers: headers,
        body: body, 
      }

      // authenticate 
      fetch(url, requestOptions)
      .then(res => {
        if (res.status === (200)) {
          console.log('Logged in successfully');
          return res;
        } else {
          const error = new Error(res.error);
          throw error;
        }
      })
      .then(res => {
        Promise.all([getUserData(), getCountdowns('mycountdowns')])
        .then(([userData, countdowns]) => {
          if(userData) {
            dispatch(signIn(userData));
            dispatch(setSidebarView('selectCountdown'));
          }
          if (countdowns) {
            dispatch(setCountdownList(countdowns));
            dispatch(setLiveCountdown(countdowns[0]));
          }
        })
      })
      .catch(error => console.log('error', error))

      // after user has logged in, get countdown data
      
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
