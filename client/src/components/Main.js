// import componenets
import Clock from "./clock/Clock";

// import styles
import '../styles/main.css'

export default function Main ({myCountdowns}) {
  return (
    <main className="open" id="main">
      <div className="content">
        <Clock myCountdowns={myCountdowns} />
        
      </div>
    </main>
  )
}
