import react, {useState} from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarView } from '../../redux/features/sidebarViewSlice';
import { signIn } from '../../redux/features/authenticateSlice';
import { setCountdownList } from '../../redux/features/countdownListSlice';



//TESTING CLIENT SIDE LOGIN
import users from '../../clientSideLogin/users';
import { setLiveCountdown } from '../../redux/features/liveCountdownSlice';

export default function SignIn() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const handleSignIn = () => {
  //   const username = document.getElementById('username-signin').value;
  //   const password = document.getElementById('password-signin').value;
    
  //   if (!username || !password) {
  //     alert('Please enter both a username and a password to log in');
  //     return
  //   }

  //   const user = users.find(user => user.username === username && user.password === password);

  //   if (user) {
  //     dispatch(signIn(user));
  //     dispatch(setCountdownList(user.countdowns));
  //     dispatch(setLiveCountdown(user.countdowns[0]))
  //     dispatch(setSidebarView('selectCountdown'))
  //   } else {
  //     alert('No username and password match found')
  //   }
  // }
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
        mode: 'cors',
        credentials: 'include',
        headers: headers,
        body: body, 
      }

      fetch(url, requestOptions)
        .then(res => {
          if (res.status === (200)) {
            console.log('Logged in successfully');
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(error => console.log('error', error));
    }

  }

  const checkToken = () => {
    const url = 'http://localhost:3000/api/users/userarea';
    fetch(url)
      .then(res => console.log("I'm in!!!!"))
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
      <p className="guest-btn" onClick={checkToken} >CONTINUE AS GUEST</p>
    </div>
  )
}
