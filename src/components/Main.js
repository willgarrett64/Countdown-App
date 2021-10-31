import ClockCard from "./clock/ClockCard";

export default function Main () {
  const clock = {
    name: 'Christmas',
    date: '21 Dec 2021',
    days: 21,
    hours: 2,
    minutes: 6,
    seconds: 30,
    time: '00:00:00',
    id: 1
  }

  return (
    <main className="content open">
      <h1>Days Until {clock.name}</h1>
      <ClockCard value={'days'} clock={clock} />
      <ClockCard value={'hours'} clock={clock} />
      <ClockCard value={'minutes'} clock={clock} />
      <ClockCard value={'seconds'} clock={clock} />
    </main>
  )
}
