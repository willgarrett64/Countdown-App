// ref is the HTML element ID in case error message will displayed as tool tip on that element
const errorJson = (error, ref = '') => {
  return {
    error: error,
    ref: ref 
  }
}

const successJson = (data) => {
  return {
    message: success,
    data: data 
  }
}

module.exports = {successJson, errorJson};