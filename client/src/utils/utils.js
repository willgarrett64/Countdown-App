
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


module.exports = {getUserData, getCountdowns}