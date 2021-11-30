const { setErrorTooltip } = require("./errorHandling");

// get current date and time
const getNow = () => {
  const now = new Date();

  const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const time = `${now.getHours()}:${now.getMinutes()}`

  return {date, time}
}

// verify date and time are in the future (comparing to current date and time)
const checkDateInFuture = (date, time) => {
  const now = getNow();

  const nowUnix = Date.parse(now.date + ' ' + now.time);
  const inputUnix = Date.parse(date + ' ' + time);


  if (inputUnix <= nowUnix) {
    return false
  } else {
    return true;
  }
}


// form validation for countdowns (add / edit)
const countdownIsValid = (countdown) => {
  const {name, date, time} = countdown;
  
  // error message elements
  const nameError = document.getElementById('countdown-name-error');
  const dateError = document.getElementById('countdown-date-error');
  const timeError = document.getElementById('countdown-time-error');

  // reset error messages each time form is submitted
  nameError.innerText = '';
  dateError.innerText = '';
  timeError.innerText = '';

  const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegEx = /^\d{2}:\d{2}/;

  let countdownValid = false;


  // verify all fields aren't blank
  if (!name) setErrorTooltip('Please enter a countdown name', nameError);
  if (!date) setErrorTooltip('Please enter a countdown date', dateError);
  if (!time) setErrorTooltip('Please enter a countdown time', timeError);

  // verify countdown name is valid length
  else if (countdown.name.length > 35) setErrorTooltip('Countdown name can\'t exceed 35 characters', nameError);

  // verify date/time aren't in the past
  else if (!checkDateInFuture(date, time)) setErrorTooltip('Can\'t create countdown in the past', dateError);

  // verify date and time are in correct format
  else if (!countdown.date.match(dateRegEx)) setErrorTooltip('Date format incorrect', dateError);
  else if (!countdown.time.match(timeRegEx)) setErrorTooltip('Time format incorrect', timeError);

  // if passed all tests, set countdownValid to true
  else {
    countdownValid = true;
  }
  return countdownValid;
}


module.exports = {countdownIsValid, checkDateInFuture}