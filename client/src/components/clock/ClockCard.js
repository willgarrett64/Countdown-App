// styles
import '../../styles/clock.css'

// utils
import { convertSeconds } from '../../utils/clockFunctions'


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
