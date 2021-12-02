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

  // define regular expressions for forate of date and time 
  // NOTE: THIS NEEDS TO BE FIXED: E.G. 2022-00-00 IS AN ACCEPTED DATE, AND 99:99 IS ACCEPTED TIME 
  const dateRegEx = /^\d{4}-\d{2}-\d{2}$/;
  const timeRegEx = /^\d{2}:\d{2}/;

  let countdownValid = false;

  // verify countdown name is filled in and correct length
  if (!name) setErrorTooltip('Please enter a countdown name', nameError);
  else if (countdown.name.length > 35) setErrorTooltip('Countdown name can\'t exceed 35 characters', nameError);

  // verify countdown date and time are filled in and follow correct format.
  if (!date) setErrorTooltip('Please enter a countdown date', dateError);
  else if (!countdown.date.match(dateRegEx)) setErrorTooltip('Date format incorrect', dateError);

  if (!time) setErrorTooltip('Please enter a countdown time', timeError);
  else if (!countdown.time.match(timeRegEx)) setErrorTooltip('Time format incorrect', timeError);

  // verify date/time aren't in the past
  if (!checkDateInFuture(date, time)) setErrorTooltip('Can\'t create countdown in the past', dateError);

  // if passed all tests, set countdownValid to true
  else {
    countdownValid = true;
  }
  return countdownValid;
}



module.exports = {countdownIsValid, checkDateInFuture}