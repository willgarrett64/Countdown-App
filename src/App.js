//import components
import Sidebar from './components/Sidebar'
import Main from './components/Main'

//import images
import dblRightChevron from './images/icon-dbl-right.svg'

import React, { useState, useEffect } from 'react'


import './App.css';

function App() {
  const [sidebarView, setSidebarView] = useState('signIn')

  return (
    <div className="App">
      <Sidebar view={sidebarView} />
      <Main />
      <img src={dblRightChevron} id="open-sidebar-btn" className="open-close-btn" />
    </div>
  );
}

export default App;
