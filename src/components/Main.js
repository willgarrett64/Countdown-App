import Clock from "./clock/Clock";

export default function Main () {
  const christmas = {
    name: 'Christmas',
    date: '21 Dec 2021',
    time: '00:00:00',
    id: 1
  }

  return (
    <main className="content open">
      <h1>Days Until {christmas.name}</h1>
      <Clock countdown={christmas} />
    </main>
  )
}
