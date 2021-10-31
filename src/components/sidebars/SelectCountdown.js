import CountdownCard from "./CountdownCard";

export default function SelectCountdown({myCountdowns, setActiveCountdown}) {
  return (
    <div className="content">
      <p>SELECT <strong>COUNTDOWN</strong></p>
      
      <div id="countdown-list">
        {myCountdowns.map(countdown => <CountdownCard countdown={countdown} key={countdown.id} setActiveCountdown={setActiveCountdown} />)}
      </div>

    </div>
  )
}
