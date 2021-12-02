//#region IMPORTS
import {useState} from 'react';

// components
import Form from '../../forms/Form';

// redux
import { useDispatch } from 'react-redux';
import { setOverlayView } from '../../../redux/features/overlayViewSlice';
import { setSidebarView } from '../../../redux/features/sidebarViewSlice';

// utils
import { apiRequest } from '../../../utils/apiRequests';
import { setErrorTooltip, handleNetworkError } from '../../../utils/errorHandling';
import { userIsValid } from '../../../utils/userValidation';
//#endregion IMPORTS


export default function SignUp() {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleSubmit =  async e => {
    e.preventDefault();

    // if no validation errors, continue to make sign up request
    if (userIsValid(username, password, verifyPassword)) {
      const response = await apiRequest.signUp(username, password);
      if (response === 'ok') {
        dispatch(setSidebarView('signIn'));
        setOverlayView('accountCreated');
        dispatch(setOverlayView('accountCreated'));
      } else {
        handleNetworkError(response)
      }
    } else {
      // NEED TO PROPERLY HANDLE THIS ISSUE IF USER IS NOT VALID, BUT NOT CAUGHT IN userIsValid FUNCTION
      console.log('Error in userIsValid');
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
