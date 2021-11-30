const setErrorTooltip = (message, element) => {
  element.innerText = '* ' + message
}

const handleNetworkError = (errorResponse) => {
  if (errorResponse.ref) {
    const errorElement = document.getElementById(errorResponse.ref);
    setErrorTooltip(errorResponse.error, errorElement)
  } else {
    console.log(errorResponse.error);
  }
}

module.exports = {setErrorTooltip, handleNetworkError}