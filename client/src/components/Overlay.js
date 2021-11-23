// components
import CountdownForm from './overlays/CountdownForm';
import AccountCreated from './overlays/AccountCreated';
import EditOrDeletePrompt from './overlays/EditOrDeletePrompt';
import ConfirmDeletePrompt from './overlays/ConfirmDeletePrompt';

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
        : overlayView === 'editOrDeletePrompt'
        ? <EditOrDeletePrompt />
        : overlayView === 'confirmDeletePrompt'
        ? <ConfirmDeletePrompt />
        : null
      }
    </div>
  )
}
