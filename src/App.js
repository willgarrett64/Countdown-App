//import components
import Sidebar from './components/Sidebar'
import Main from './components/Main'

//import images
import dblRightChevron from './images/icon-dbl-right.svg'

//import React hooks
import React, { useState, useEffect } from 'react'

//import styles
import './App.css';


const testCountdownList = [
  {
    name: 'Christmas',
    date: '25 Dec 2021',
    time: '00:00',
    id: 1
  },
  {
    name: 'My Birthday',
    date: '28 Mar 2022',
    time: '00:00',
    id: 2
  },
  {
    name: 'Tati\'s Birthday',
    date: '28 Apr 2022',
    time: '00:00',
    id: 3
  }
]


function App() {
  const [sidebarView, setSidebarView] = useState('signIn');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [myCountdowns, setMyCountdowns] = useState(testCountdownList);
  const [activeCountdown, setActiveCountdown] = useState(2)


  const toggleSidebarOpen = () => {
    document.getElementById('sidebar').classList.toggle("open");
    document.getElementById('main').classList.toggle("open");
  }

  return (
    <div className="App">
      <Sidebar myCountdowns={myCountdowns} setActiveCountdown={setActiveCountdown} sidebarView={sidebarView} setSidebarView={setSidebarView} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebarOpen={toggleSidebarOpen} />
      <Main activeCountdown={activeCountdown} myCountdowns={myCountdowns} />
      <img src={dblRightChevron} id="open-sidebar-btn" className="open-close-btn" onClick={toggleSidebarOpen} />
    </div>
  );
}

export default App;
