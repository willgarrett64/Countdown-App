// styles
import '../../styles/clock.css'

export default function ClockCard({value, clock}) {
  return (
    <div className="clock-section">
      <div className="clock-card">
        <p>{clock[value]}</p>
        <div className="semi-circle left"></div>
        <div className="semi-circle right"></div>
        <div className="centre-line"></div>
        <div className="darker-overlay"></div>
      </div>
      <p className="clock-label">{value.toUpperCase()}</p>
    </div>
  )
}
