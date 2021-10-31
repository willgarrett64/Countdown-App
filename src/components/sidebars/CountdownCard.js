export default function CountdownCard(countdown) {
  return (
    <div>
      <p>{countdown.name}</p>
      <p>{countdown.date}</p>
      <p>{countdown.time}</p>
    </div>
  )
}
