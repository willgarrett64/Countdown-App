//#region IMPORTS
import {useState} from 'react';

// components
import Form from '../../forms/Form'

// redux
import { useDispatch } from 'react-redux';
import { setSidebarView } from '../../../redux/features/sidebarViewSlice';
import { signIn } from '../../../redux/features/authenticateSlice';
import { setCountdownList } from '../../../redux/features/countdownListSlice';
import { setLiveCountdown } from '../../../redux/features/liveCountdownSlice';

// utils
import { apiRequest } from '../../../utils/apiRequests';
import { handleNetworkError, setErrorTooltip } from '../../../utils/errorHandling';
import { userIsValid } from '../../../utils/userValidation';
//#endregion IMPORTS


export default function SignIn() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async e => {
    e.preventDefault();

    // if no validation errors, continue to make sign in request
    if (userIsValid(username, password)) {
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
        handleNetworkError(response);
      }
    } else {
      // NEED TO PROPERLY HANDLE THIS ISSUE IF USER IS NOT VALID, BUT NOT CAUGHT IN userIsValid FUNCTION
      console.log('Error in userIsValid');
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
      <Form 
        inputs={[
          {
            id: "username",
            onChange: e => setUsername(e.target.value),
            required: true,
            label: "USERNAME"
          },
          {
            id: "password",
            onChange: e => setPassword(e.target.value),
            required: true,
            type: "password",
            label: "PASSWORD"
          }
        ]}

        buttons={{
          className: "flex column",
          buttons: [
            {
              classes: "primary",
              text: "SIGN IN",
              onClick: handleSignIn
            },
            {
              classes: "secondary",
              text: "SIGN UP",
              onClick: () => dispatch(setSidebarView('signUp'))
            }
          ]}
        }

        id="sign-in-form"
        className="sidebar-form flex column"
      />
      <p className="guest-btn" onClick={handleContAsGuest} >CONTINUE AS GUEST</p>
    </div>
  )
}
