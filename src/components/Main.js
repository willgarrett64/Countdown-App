import Clock from "./clock/Clock";

import '../styles/main.css'

export default function Main ({activeCountdown, myCountdowns}) {
  const countdownToDisplay = myCountdowns.find(countdown => countdown.id == activeCountdown);

  return (
    <main className="open" id="main">
      <div className="content">
        <Clock countdown={countdownToDisplay} />
      </div>
    </main>
  )
}
