// import components
import { useSelector } from 'react-redux';
import CreateCountdown from './overlays/CreateCountdown';
import EditCountdown from './overlays/EditCountdown';
import AccountCreated from './overlays/AccountCreated';


//redux

export default function Overlay() {
  const overlayView = useSelector((state) => state.overlayView.value);

  return (
    <div id="overlay">
      {
        overlayView === 'editCountdown'
        ? <EditCountdown />
        : overlayView === 'createCountdown'
        ? <CreateCountdown />
        : overlayView === 'accountCreated'
        ? <AccountCreated />
        : null
      }
    </div>
  )
}
