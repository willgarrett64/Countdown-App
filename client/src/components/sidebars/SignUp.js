import {useState} from 'react';

// components
import Form from '../forms/Form';

// redux
import { useDispatch } from 'react-redux';
import { setOverlayView } from '../../redux/features/overlayViewSlice';
import { setSidebarView } from '../../redux/features/sidebarViewSlice';

// utils
import { apiRequest } from '../../utils/apiRequests';
import { setErrorTooltip, handleNetworkError } from '../../utils/errorHandling';

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
        handleNetworkError(response)
      }
    }
  }

  return (
    <div className="content">
      <h2>Create a new account to access <strong>full features</strong></h2>
      <Form 
        inputs={[
          {id: "username",
            onChange: e => setUsername(e.target.value),
            required: true,
            label: "USERNAME"},
          {
            id: "password",
            onChange: e => setPassword(e.target.value),
            required: true,
            type: "password",
            label: "PASSWORD"
          },
          {
            id: "verify-password",
            onChange: e => setVerifyPassword(e.target.value),
            required: true,
            type: "password",
            label: "VERIFY PASSWORD"
          }
        ]}

        buttons={{
          className: "flex column",
          buttons: [
            {
              classes: "primary",
              text: "SIGN UP",
              onClick: handleSubmit
            },
            {
              classes: "secondary",
              text: "CANCEL",
              onClick: () => dispatch(setSidebarView('signIn'))
            }
          ]
        }}

        id="sign-up-form"
        className="sidebar-form flex column"
      />
    </div>
  )
}
