// components
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import Overlay from './components/Overlay';
import SignOut from './components/SignOut';

// images
import dblRightChevron from './images/icon-dbl-right.svg'

// redux
import { useSelector } from 'react-redux';

// styles
import './App.css';
import './styles/overlay.css'


function App() {
  const signedIn = useSelector(state => state.authenticate.signedIn)
  const overlayView = useSelector(state => state.overlayView.value);

  const toggleSidebarOpen = () => {
    document.getElementById('sidebar').classList.toggle("open");
    document.getElementById('main').classList.toggle("open");
  }

  return (
    <div className="App">
      <Sidebar toggleSidebarOpen={toggleSidebarOpen} />
      <Main />
      {signedIn && <SignOut />}
      {overlayView && <Overlay />}
      <img src={dblRightChevron} id="open-sidebar-btn" className="open-close-btn" onClick={toggleSidebarOpen} alt="open sidebar icon" />
    </div>
  );
}

export default App;
