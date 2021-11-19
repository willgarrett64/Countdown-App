// get current date and time
const getNow = () => {
  const now = new Date();

  const date = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
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
  let countdownValid = false;

  const {name, date, time} = countdown;

  // ensure all fields are filled in
  if (!name || ! date || !time) {
    alert('Please fill in countdown name, date and time')
  }
  // ensure countdown name is valid length
  else if (countdown.name.length > 35) {
    alert('Countdown name max length: 35 characters')
  }
  // ensure date/time aren't in the past
  else if (!checkDateInFuture(date, time)) {
    alert('Can\'t create countdown in the past');
  }
  // if passed all tests, set countdownValid to true
  else {
    countdownValid = true;
  }
  return countdownValid;
}

module.exports = {countdownIsValid}