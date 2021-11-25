import {useState} from 'react';

// redux
import { useDispatch } from 'react-redux';
import { setOverlayView } from '../../redux/features/overlayViewSlice';
import { setSidebarView } from '../../redux/features/sidebarViewSlice';

// utils
import { apiRequest } from '../../utils/apiRequests';
import { setErrorTooltip, handleError } from '../../utils/errorHandling';

export default function SignUp() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [veryifyPassword, setVerifyPassword] = useState('');

  // error message elements 
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');
  const verifyPasswordError = document.getElementById('verify-password-error');


  const handleSubmit =  async e => {
    e.preventDefault();

    // reset any error messages on attempt to submit new form data
    usernameError.innerText = '';
    passwordError.innerText = '';
    verifyPasswordError.innerText = '';

    let errors = false;
    if (!username) {
      setErrorTooltip('Please enter a username', usernameError);
      errors = true;
    } else if (username.length < 4 || username.length > 20) {
      setErrorTooltip('Must be between 4 and 20 characters', usernameError);
      errors = true;
    } 
    
    if (!password) {
      // handle blank password
      setErrorTooltip('Please enter a password', passwordError);
      errors = true;
    } else if (password.length < 4 || password.length > 30) {
      setErrorTooltip('Must be between 4 and 30 characters', passwordError);
      errors = true;
    } else if (password != veryifyPassword) {
      // handle mis-matching passwords
      setErrorTooltip('Passwords don\'t match', verifyPasswordError);
      errors = true;
    } 
    
    if (!errors) {
      const response = await apiRequest.signUp(username, password);
      if (response === 'ok') {
        dispatch(setSidebarView('signIn'));
        setOverlayView('accountCreated');
        dispatch(setOverlayView('accountCreated'));
      } else {
        handleError(response)
      }
    }
  }

  return (
    <div className="content">
      <h2>Create a new account to access <strong>full features</strong></h2>
      <div className="input-label-pair">
        <label htmlFor="username-signup">USERNAME</label>
        <input id="username-signup" required onChange={e => setUsername(e.target.value)} />
        <span id="username-error" className="error-message"></span>
      </div>
      <div className="input-label-pair">
        <label htmlFor="password-signup">PASSWORD</label>
        <input id="password-signup" type="password" required onChange={e => setPassword(e.target.value)} />
        <span id="password-error" className="error-message"></span>
      </div>
      <div className="input-label-pair">
        <label htmlFor="verify-password-signup">VERIFY PASSWORD</label>
        <input id="verify-password-signup" required type="password" onChange={e => setVerifyPassword(e.target.value)} />
        <span id="verify-password-error" className="error-message"></span>
      </div>
      <button className="primary" onClick={handleSubmit} >SIGN UP</button>
      <button className="secondary" onClick={() => dispatch(setSidebarView('signIn'))} >CANCEL</button>
    </div>
  )
}
