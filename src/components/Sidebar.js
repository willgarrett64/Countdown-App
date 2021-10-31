//import components
import SignIn from "./sidebars/SignIn";
import SignUp from "./sidebars/SignUp";
import SelectCountdown from "./sidebars/SelectCountdown";

//import images
import dblLeftChevron from '../images/icon-dbl-left.svg'

//import styles
import '../styles/sidebar.css'

export default function Sidebar({sidebarView, setSidebarView, toggleSidebarOpen}) {
  const changeSidebar = (e) => {
    setSidebarView(e.target.id)
  }
  
  return (
    <aside className="open" id="sidebar">
      <div className="content">
        {
          sidebarView === 'signIn'
          ? <SignIn />
          : sidebarView === 'signUp'
          ? <SignUp />
          : sidebarView === 'selectCountdown'
          ? <SelectCountdown />
          : null
        }
        <img src={dblLeftChevron} id="close-sidebar-btn" className="open-close-btn" onClick={toggleSidebarOpen} />
        <div className="sidebar-btns">
          <button id="signIn" onClick={changeSidebar}>Sign In</button>
          <button id="signUp" onClick={changeSidebar}>Sign Up</button>
          <button id="selectCountdown" onClick={changeSidebar}>Select Countdown</button>
        </div>
      </div>
    </aside>
  )
  
}
