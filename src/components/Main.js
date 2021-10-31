import Clock from "./clock/Clock";

export default function Main ({activeCountdown, myCountdowns}) {

  const countdownToDisplay = myCountdowns.find(countdown => countdown.id == activeCountdown);
  console.log(countdownToDisplay);
  console.log(activeCountdown);


  return (
    <main className="open" id="main">
      <div className="content">
        <Clock countdown={countdownToDisplay} />
      </div>
    </main>
  )
}
