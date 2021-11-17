const apiUrl = "http://localhost:3000/api";

const apiFetchRequest = async (method, endpoint, headers, body) => {
  const requestOptions = {
    method: method, 
  }
  // set headers and body if present
  if (headers) {
    requestOptions.headers = headers
  }
  if (body) {
    requestOptions.body = body
  }

  try {
    const response = await fetch(apiUrl+endpoint, requestOptions);
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.data;
    }
  } catch (err) {
    console.log(err);
  }
}


// sign the user in (and issue token) - return true if successful
const signIn = async (username, password) => {
  const headers = {"Content-Type": "application/json"};
  const body = JSON.stringify({username, password});
  
  try {
    const response = await fetch(apiUrl+'/users/signin', {method: 'POST', headers, body});
    if (response.status === 200) {
      console.log('Signed in successfully');
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

// sign the user out (and clear token) - return true if successful
const signOut = async () => {
  try {
  const response = await fetch(apiUrl+'/users/signout');
    if (response.status === 200) {
      console.log('Signed out succesfully');
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

// create a new user account - return true if successful
const signUp = async (username, password) => {
  const headers = {"Content-Type": "application/json"};
  const body = JSON.stringify({username, password});
  try {
    const response = await fetch(apiUrl+'/users/signup', {method: 'POST', headers, body});
    if (response.status === 201) {
      console.log('New account created succesfully');
      return true;
    } else {
      const jsonResponse = await response.json();
      alert(jsonResponse.error);
    }
  } catch (err) {
    console.log(err);
  } 
}

// if user has a valid token, this will return their username and id in the response
const getUserData = async () => {
  const data = await apiFetchRequest('GET', '/users/userinfo');
  return data;
}

// get countdowns from database - endpoints can either be:
//- "guest" for list of guest user countdowns
//- "mycountdowns" for list of user countdowns, authenticated by token
const getCountdowns = async (endpoint) => {
  const finalEndpoint = `/countdowns/${endpoint}`;
  const data = await apiFetchRequest('GET', finalEndpoint);
  return data;
}

// create a new countdown - return the newly created countdown
const createNewCountdown = async (newCountdownObject) => {
  const headers = {"Content-Type": "application/json"};
  const body = JSON.stringify(newCountdownObject);
  const data = await apiFetchRequest('POST', '/countdowns', headers, body);
  console.log('Countdown created successfully');
  return data;
}

// delete a countdown by ID - return deleted countdown id
const deleteCountdown = async (countdownId) => {
  const headers = {"Content-Type": "application/json"};
  const body = JSON.stringify({id: countdownId});
  const data = await apiFetchRequest('DELETE', '/countdowns', headers, body);
  console.log('Countdown deleted successfully');
  return data;
}

// update a countdown - return the updated countdown
const updateCountdown = async (updatedCountdownObject) => {
  const headers = {"Content-Type": "application/json"};
  const body = JSON.stringify(updatedCountdownObject);
  const data = await apiFetchRequest('PUT', '/countdowns', headers, body);
  console.log('Countdown updated successfully');
  return data;
}

const apiRequest = {
  signIn, 
  signOut,
  signUp,
  getUserData, 
  getCountdowns, 
  createNewCountdown,
  deleteCountdown,
  updateCountdown
}

module.exports = {apiRequest}



