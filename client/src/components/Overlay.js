// import components
import { useSelector } from 'react-redux';
import CreateCountdown from './overlays/CreateCountdown';
import EditCountdown from './overlays/EditCountdown';
import AccountCreated from './overlays/AccountCreated';


//redux

export default function Overlay({toggleOverlayHidden}) {
  const overlayView = useSelector((state) => state.overlayView.value);

  return (
    <div id="overlay" className="hidden">
      {
        overlayView === 'editCountdown'
        ? <EditCountdown toggleOverlayHidden={toggleOverlayHidden} />
        : overlayView === 'createCountdown'
        ? <CreateCountdown toggleOverlayHidden={toggleOverlayHidden} />
        : overlayView === 'accountCreated'
        ? <AccountCreated toggleOverlayHidden={toggleOverlayHidden} />
        : null
      }
    </div>
  )
}
