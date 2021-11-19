// components
import CreateCountdown from './overlays/CreateCountdown';
import EditCountdown from './overlays/EditCountdown';
import CountdownForm from './overlays/CountdownForm';
import AccountCreated from './overlays/AccountCreated';

// redux
import { useSelector } from 'react-redux';

export default function Overlay() {
  const overlayView = useSelector((state) => state.overlayView.value);

  return (
    <div id="overlay">
      {
        overlayView === 'editCountdown'
        ? <CountdownForm type="edit" />
        : overlayView === 'createCountdown'
        ? <CountdownForm type="create" />
        : overlayView === 'accountCreated'
        ? <AccountCreated />
        : null
      }
    </div>
  )
}
