// display an error message as a tool given the HTML element (whole element, not just ID)
const setErrorTooltip = (message, element) => {
  element.innerText = '* ' + message
}

// deal with an error response from HTTP requests
// if there is a "ref" property (id of error message element), set the tool tip, otherwise log error in console.  
const handleNetworkError = (errorResponse) => {
  if (errorResponse.ref) {
    const errorElement = document.getElementById(errorResponse.ref);
    setErrorTooltip(errorResponse.error, errorElement)
  } else {
    console.log(errorResponse.error);
  }
}

module.exports = {setErrorTooltip, handleNetworkError}