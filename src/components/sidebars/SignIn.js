// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarView } from '../../redux/features/sidebarViewSlice';

export default function SignIn() {
  const dispatch = useDispatch();

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

      <button className="primary" onClick={() => dispatch(setSidebarView('selectCountdown'))}>SIGN IN</button>
      <button className="secondary" onClick={() => dispatch(setSidebarView('signUp'))}>SIGN UP</button>
      <p className="guest-btn" onClick={() => dispatch(setSidebarView('selectCountdown'))} >CONTINUE AS GUEST</p>
    </div>
  )
}
