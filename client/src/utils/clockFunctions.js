// calculate number of seconds from now until countdown date/time
const calculateSecondsUntil = (countdown) => {
  const currentDate = Date.now(); //get unix timestamp for current date/time)
  const countdownDate = Date.parse(countdown.date + ' ' + countdown.time) //get unix timestamp for countdown date/time
  const timeUntil = Math.floor((countdownDate - currentDate) / 1000); //calculate time (in seconds) until countdown date
  return timeUntil
}

// convert total seconds remaining into days/hours/minutes/seconds object
const convertSeconds = (totalSeconds) => {
  // define number of seconds in a minute/hour/day
  const oneMin = 60;
  const oneHour = oneMin * 60;
  const oneDay = oneHour * 24;

  // convert number of seconds to number of whole days, hours, minutes and seconds
  const days = Math.floor(totalSeconds / oneDay);
  const hours = Math.floor(totalSeconds % oneDay / oneHour);
  const minutes = Math.floor(totalSeconds % oneHour / oneMin);
  const seconds = Math.floor(totalSeconds % oneMin);

  return {days, hours, minutes, seconds};
}

module.exports = {calculateSecondsUntil, convertSeconds}