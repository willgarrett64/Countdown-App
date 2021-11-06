//import components
import SignIn from "./sidebars/SignIn";
import SignUp from "./sidebars/SignUp";
import SelectCountdown from "./sidebars/SelectCountdown";

//import images
import dblLeftChevron from '../images/icon-dbl-left.svg'

//import styles
import '../styles/sidebar.css'

// redux
import { useSelector, useDispatch } from 'react-redux';


export default function Sidebar({toggleSidebarOpen, toggleOverlayHidden}) {
  const sidebarView = useSelector((state) => state.sidebarView.value)
  const dispatch = useDispatch();
  
  return (
    <aside className="open" id="sidebar">
      {
        sidebarView === 'signIn'
        ? <SignIn/>
        : sidebarView === 'signUp'
        ? <SignUp/>
        : sidebarView === 'selectCountdown'
        ? <SelectCountdown toggleOverlayHidden={toggleOverlayHidden} />
        : null
      }
      <img src={dblLeftChevron} id="close-sidebar-btn" className="open-close-btn" onClick={toggleSidebarOpen} />
    </aside>
  )
  
}
