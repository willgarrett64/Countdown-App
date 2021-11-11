

const getCountdowns = async () => {
  const res = await fetch('http://localhost:3000/api/countdowns/mycountdowns')
  if(res.ok) {
    const jsonRes = await res.json();
    return (jsonRes)
  }
}

const getUserData = async () => {
  const res = await fetch('http://localhost:3000/api/countdowns/verifytoken')
  if(res.ok) {
    const jsonRes = await res.json();
    return (jsonRes)
  }
}


module.exports = {getUserData, getCountdowns}