const { setErrorTooltip } = require("./errorHandling");


// form validation for users (sign in / sign up)
// this does NOT include handing any errors from server side validation (such as wrong username/password, username already in use, etc)
const userIsValid = (username, password, verifyPassword) => {  
  // error message elements
  const usernameError = document.getElementById('username-error');
  const passwordError = document.getElementById('password-error');
  const verifyPasswordError = document.getElementById('verify-password-error');


  // reset error messages each time form is submitted
  usernameError.innerText = '';
  passwordError.innerText = '';

  // only do this for verify password if signing up (verify password will only be present if signing up, but not when signing in)
  if (verifyPassword) {
    verifyPasswordError.innerText = '';
  }


  let errors = false;
  // verify countdown name is filled in and correct length
  if (!username) {
    setErrorTooltip('Please enter a username', usernameError)
    errors = true
  }
  else if (username.length > 20 || username.length < 4) {
    setErrorTooltip('Must be between 4 and 20 characters', usernameError)
    errors = true
  }

  // verify password is filled in and correct length
  if (!password) {
    setErrorTooltip('Please enter a password', passwordError)
    errors = true
  }
  else if (password.length > 30 || password.length < 4) {
    setErrorTooltip('Must be between 4 and 30 characters', passwordError)
    errors = true
  }

  // if attempting to create a new account (sign up), the verify password must match the password
  if (verifyPassword) {
    if ( password !== verifyPassword) {
      setErrorTooltip('Passwords don\'t match', verifyPasswordError)
      errors = true;
    }
  }

  
  if (!errors) return true
  else return false
}

module.exports = {userIsValid}