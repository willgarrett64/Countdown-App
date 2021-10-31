//import components
import Sidebar from './components/Sidebar'
import Main from './components/Main'

//import images
import dblRightChevron from './images/icon-dbl-right.svg'

import React, { useState, useEffect } from 'react'


import './App.css';

function App() {
  const [sidebarView, setSidebarView] = useState('signIn');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebarOpen = () => {
    document.getElementById('sidebar').classList.toggle("open");
    document.getElementById('main').classList.toggle("open");
  }

  return (
    <div className="App">
      <Sidebar sidebarView={sidebarView} setSidebarView={setSidebarView} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebarOpen={toggleSidebarOpen} />
      <Main sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <img src={dblRightChevron} id="open-sidebar-btn" className="open-close-btn" onClick={toggleSidebarOpen} />
    </div>
  );
}

export default App;
