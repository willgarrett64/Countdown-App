const setErrorTooltip = (message, element) => {
  element.innerText = '* ' + message
}

const handleError = (errorResponse) => {
  if (errorResponse.ref) {
    const errorElement = document.getElementById(errorResponse.ref);
    setErrorTooltip(errorResponse.error, errorElement)
  } else {
    console.log(errorResponse.error);
  }
}

module.exports = {setErrorTooltip, handleError}