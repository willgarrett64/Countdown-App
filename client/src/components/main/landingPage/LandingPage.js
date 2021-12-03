//#region IMPORTS
// components
import Clock from "../clock/Clock"

// styles 
import './LandingPage.css'
//#endregion IMPORTS

export default function LandingPage () {
  const landingPageCountdown = {
    name: 'Christmas',
    date: '2021-12-25',
    time: '00:00'
  }

  return (
    <div id="landing-page" className="flex column">
      <div>
        {/*
        This will be the landing page content, however I haven't decided on designs yet!
        I am thinking three boxes that show the functionality, but will come back to it. 
        */}
      </div>
      <Clock countdown={landingPageCountdown}/>
    </div>
  )
}
