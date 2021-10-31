export default function CountdownCard(countdown) {  
  return (
    <div class="countdown-card">
      <div>
        <p>{countdown.name}</p>
      </div>
      <div>
        <h3>DATE</h3>
        <p>{countdown.date}</p>
      </div>
      <div>
        <h3>TIME</h3>
        <p>{countdown.time}</p>
      </div>
    </div>
  )
}
