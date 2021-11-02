//import components
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Overlay from './components/Overlay';
import SignOut from './components/SignOut';

//import images
import dblRightChevron from './images/icon-dbl-right.svg'

//import React hooks
import React, { useState, useEffect } from 'react'

//redux
import { useSelector, useDispatch } from 'react-redux';


//import styles
import './App.css';
import './styles/overlay.css'


function App() {
  const dispatch = useDispatch()
  const signedIn = useSelector(state => state.signIn.signedIn)

  const toggleSidebarOpen = () => {
    document.getElementById('sidebar').classList.toggle("open");
    document.getElementById('main').classList.toggle("open");
  }

  const toggleOverlayHidden = () => {
    document.getElementById('overlay').classList.toggle("hidden")
  }

  return (
    <div className="App">
      <Sidebar toggleSidebarOpen={toggleSidebarOpen} />
      <Main />
      {signedIn && <SignOut />}
      <Overlay toggleOverlayHidden={toggleOverlayHidden} />
      <img src={dblRightChevron} id="open-sidebar-btn" className="open-close-btn" onClick={toggleSidebarOpen} />
    </div>
  );
}

export default App;
