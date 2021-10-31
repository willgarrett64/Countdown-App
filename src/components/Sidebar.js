//import components
import SignIn from "./sidebars/SignIn";
import SignUp from "./sidebars/SignUp";
import SelectCountdown from "./sidebars/SelectCountdown";

//import images
import dblLeftChevron from '../images/icon-dbl-left.svg'

//import styles
import '../styles/sidebar.css'

export default function Sidebar({view}) {
  return (
    <aside className="content open">
      {
        view === 'signIn' 
        ? <SignIn />
        : view === 'signUp'
        ? <SignUp />
        : view === 'selectCountdown'
        ? <SelectCountdown />
        : null
      }
      <img src={dblLeftChevron} id="close-sidebar-btn" className="open-close-btn" />
    </aside>
  )
  
}
