// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarView } from '../../redux/features/sidebarViewSlice';

export default function SignUp() {
  const dispatch = useDispatch();

  return (
    <div className="content">
      <h2>Create a new account to access <strong>full features</strong></h2>
      <div className="input-label-pair">
        <label htmlFor="username-signup">USERNAME</label>
        <input id="username-signup" />
      </div>
      <div className="input-label-pair">
        <label htmlFor="password-signup">PASSWORD</label>
        <input id="password-signup" type="password" />
      </div>
      <div className="input-label-pair">
        <label htmlFor="verify-password-signup">VERIFY PASSWORD</label>
        <input id="verify-password-signup" type="password" />
      </div>
      <button className="primary" onClick={() => dispatch(setSidebarView('selectCountdown'))} >SIGN UP</button>
      <button className="secondary" onClick={() => dispatch(setSidebarView('signIn'))} >CANCEL</button>
    </div>
  )
}
