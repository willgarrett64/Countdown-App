import react, {useState} from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarView } from '../../redux/features/sidebarViewSlice';

export default function SignUp() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [veryifyPassword, setVerifyPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username) {
      // handle blank username
    } else if (!password) {
      // handle blank password
    } else if (password != veryifyPassword) {
      // handle mis-matching passwords
    } else {
      const url = 'http://localhost:4001/api/users/signup';
      const headers = {
        "Content-Type": "application/json"
      };
      const body = JSON.stringify({
        "username": username,
        "password": password
      });
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: body, 
      }

      fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result);
          if (result.message == 'success') {
            dispatch(setSidebarView('signIn'));
          } 
        })
        .catch(error => console.log('error', error));
    }
  }

  return (
    <div className="content">
      <h2>Create a new account to access <strong>full features</strong></h2>
      <div className="input-label-pair">
        <label htmlFor="username-signup">USERNAME</label>
        <input id="username-signup" onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="input-label-pair">
        <label htmlFor="password-signup">PASSWORD</label>
        <input id="password-signup" type="password" onChange={e => setPassword(e.target.value)} />
      </div>
      <div className="input-label-pair">
        <label htmlFor="verify-password-signup">VERIFY PASSWORD</label>
        <input id="verify-password-signup" type="password" onChange={e => setVerifyPassword(e.target.value)} />
      </div>
      <button className="primary" onClick={handleSubmit} >SIGN UP</button>
      <button className="secondary" onClick={() => dispatch(setSidebarView('signIn'))} >CANCEL</button>
    </div>
  )
}
