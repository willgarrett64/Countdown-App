// styles
import '../../styles/clock.css'


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


export default function ClockCard({type, totalSeconds}) {
  return (
    <div className="clock-section">
      <div className="clock-card">
        <p>{convertSeconds(totalSeconds)[type]}</p>
        <div className="semi-circle left"></div>
        <div className="semi-circle right"></div>
        <div className="centre-line"></div>
        <div className="darker-overlay"></div>
      </div>
      <p className="clock-label">{type.toUpperCase()}</p>
    </div>
  )
}
