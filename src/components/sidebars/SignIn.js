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

  const handleSignIn = () => {
    const username = document.getElementById('username-signin').value;
    const password = document.getElementById('password-signin').value;
    
    if (!username || !password) {
      alert('Please enter both a username and a password to log in')
      return
    }

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      dispatch(signIn(user));
      dispatch(setCountdownList(user.countdowns));
      dispatch(setLiveCountdown(user.countdowns[0]))
      dispatch(setSidebarView('selectCountdown'))
    } else {
      alert('No username and password match found')
    }
  }

  return (
    <div className="content">
      <h2>Sign in to your account to access <strong>full features</strong></h2>
      <div className="input-label-pair">
        <label htmlFor="username-signin">USERNAME</label>
        <input id="username-signin" />
      </div>
      <div className="input-label-pair">
        <label htmlFor="password-signin">PASSWORD</label>
        <input id="password-signin" type="password" />
      </div>

      <button className="primary" onClick={handleSignIn}>SIGN IN</button>
      <button className="secondary" onClick={() => dispatch(setSidebarView('signUp'))}>SIGN UP</button>
      <p className="guest-btn" onClick={() => dispatch(setSidebarView('selectCountdown'))} >CONTINUE AS GUEST</p>
    </div>
  )
}
