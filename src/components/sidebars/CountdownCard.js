export default function CountdownCard({countdown, setActiveCountdown}) {  
  const changeCountdown = (e) => {
    let id;
    let target = e.target;
    id = target.id;
    while (!id) {
      target = target.parentNode;
      id = target.id;
    }
    const newActiveCountdown = id.slice(10)
    setActiveCountdown(parseInt(newActiveCountdown))
  }

  return (
    <div className="card countdown" onClick={changeCountdown} id={`countdown-${countdown.id}`}>
      <div className="info name">
        <p>{countdown.name}</p>
      </div>
      <div className="info date">
        <h3>DATE</h3>
        <p>{countdown.date}</p>
      </div>
      <div className="info time">
        <h3>TIME</h3>
        <p>{countdown.time}</p>
      </div>
    </div>
  )
}
