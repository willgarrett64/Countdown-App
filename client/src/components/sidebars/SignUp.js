import react, {useState} from 'react';

// redux
import { useDispatch } from 'react-redux';
import { setOverlayView } from '../../redux/features/overlayViewSlice';
import { setSidebarView } from '../../redux/features/sidebarViewSlice';

// utils
import { apiRequest } from '../../utils/apiRequests';

export default function SignUp() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [veryifyPassword, setVerifyPassword] = useState('');

  const handleSubmit =  async e => {
    e.preventDefault();

    if (!username) {
      // handle blank username
      alert('Please enter a username');
      return;
    } else if (!password) {
      // handle blank password
      alert('Please enter a password');
      return;
    } else if (password != veryifyPassword) {
      // handle mis-matching passwords
      alert('Passwords don\'t match');
      return;
    } else {

      const signUpOk = await apiRequest.signUp(username, password);
      if (signUpOk) {
        dispatch(setSidebarView('signIn'));
        setOverlayView('accountCreated');
        dispatch(setOverlayView('accountCreated'));
      } 
    }
  }

  return (
    <div className="content">
      <h2>Create a new account to access <strong>full features</strong></h2>
      <div className="input-label-pair">
        <label htmlFor="username-signup">USERNAME</label>
        <input id="username-signup" required onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="input-label-pair">
        <label htmlFor="password-signup">PASSWORD</label>
        <input id="password-signup" type="password" required onChange={e => setPassword(e.target.value)} />
      </div>
      <div className="input-label-pair">
        <label htmlFor="verify-password-signup">VERIFY PASSWORD</label>
        <input id="verify-password-signup" required type="password" onChange={e => setVerifyPassword(e.target.value)} />
      </div>
      <button className="primary" onClick={handleSubmit} >SIGN UP</button>
      <button className="secondary" onClick={() => dispatch(setSidebarView('signIn'))} >CANCEL</button>
    </div>
  )
}
