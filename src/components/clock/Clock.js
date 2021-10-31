import ClockCard from "./ClockCard";

import React, { useState, useEffect } from 'react';

const calculateTimeUntil = (countdown) => {
  const currentDate = Date.now(); //get unix timestamp for current date/time)
  const countdownDate = Date.parse(countdown.date + ' ' + countdown.time) //get unix timestamp for countdown date/time
  const timeUntil = Math.floor((countdownDate - currentDate) / 1000); //calculate time (in seconds) until countdown date
  return timeUntil
}

const convertSecondsToDays = (seconds) => {
  // define number of seconds in a minute/hour/day
  const oneMin = 60;
  const oneHour = oneMin * 60;
  const oneDay = oneHour * 24;

  // convert number of seconds to number of whole days, hours, minutes and seconds
  const days = Math.floor(seconds / oneDay);
  const hours = Math.floor(seconds % oneDay / oneHour);
  const mins = Math.floor(seconds % oneHour / oneMin);
  const secs = Math.floor(seconds % oneMin);

  return {days: days, hours: hours, minutes: mins, seconds: secs};
}

export default function Clock({countdown}) {
  const [secondsRemaining, setSecondsRemaining] = useState(calculateTimeUntil(countdown))
  let timeRemaining = convertSecondsToDays(secondsRemaining);

  const updateTime = () => {
    setSecondsRemaining(calculateTimeUntil(countdown));
    timeRemaining = convertSecondsToDays(secondsRemaining);
  }
  setInterval(updateTime, 1000);



  
  
  return (
    <div>
      <ClockCard value={'days'} clock={timeRemaining} />
      <ClockCard value={'hours'} clock={timeRemaining} />
      <ClockCard value={'minutes'} clock={timeRemaining} />
      <ClockCard value={'seconds'} clock={timeRemaining} />
    </div>
  )
}
