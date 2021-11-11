

const getCountdowns = async () => {
  const res = await fetch('http://localhost:3000/api/countdowns/mycountdowns')
  if (res.ok) {
    const jsonRes = await res.json();
    return jsonRes.data
  }
}

const getUserData = async () => {
  const res = await fetch('http://localhost:3000/api/users/userinfo')
  if(res.ok) {
    const jsonRes = await res.json();
    return jsonRes.data
  }
}


module.exports = {getUserData, getCountdowns}