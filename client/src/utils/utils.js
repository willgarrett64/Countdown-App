
// endpoints can either be:
//"guest" for list of guest user countdowns
//"mycountdowns" for list of user countdowns, authenticated by token
const getCountdowns = async (endpoint) => {
  const res = await fetch(`http://localhost:3000/api/countdowns/${endpoint}`)
  if (res.ok) {
    const jsonRes = await res.json();
    return jsonRes.data
  }
}

// if user has a valid token, this will return their username and id in the response
const getUserData = async () => {
  const res = await fetch('http://localhost:3000/api/users/userinfo')
  if(res.ok) {
    const jsonRes = await res.json();
    return jsonRes.data
  }
}

// delete a countdown by ID
const deleteCountdownRequest = async (id) => {
  const url = `http://localhost:3000/api/countdowns/`;
    const headers = {
      "Content-Type": "application/json"
    };
    const body = JSON.stringify({id});
    const requestOptions = {
      method: 'DELETE',
      headers: headers,
      body: body, 
    }

    const res = await fetch(url, requestOptions);
    if(res.ok) {
      console.log('Countdown deleted successfully');
      const jsonRes = await res.json();
      return jsonRes.data
    }
}

// update a countdown by ID
const updateCountdownRequest = async (newCountdown) => {
  const url = `http://localhost:3000/api/countdowns/`;
    const headers = {
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(newCountdown);
    const requestOptions = {
      method: 'PUT',
      headers: headers,
      body: body, 
    }

    const res = await fetch(url, requestOptions);
    if(res.ok) {
      console.log('Countdown updated successfully');
      const jsonRes = await res.json();
      return jsonRes.data
    }
}

module.exports = {getUserData, getCountdowns, deleteCountdownRequest, updateCountdownRequest}