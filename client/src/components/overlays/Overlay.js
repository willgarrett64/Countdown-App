//#region IMPORTS
// components
import CountdownForm from './countdownForm/CountdownForm';
import AccountCreated from './accountCreated/AccountCreated';
import CountdownCompletePrompt from './prompts/CountdownComplete';
import ConfirmDeletePrompt from './prompts/ConfirmDeletePrompt';

// redux
import { useSelector } from 'react-redux';

// styles
import './Overlay.css'
//#endregion IMPORTS


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
        : overlayView === 'countdownCompletePrompt'
        ? <CountdownCompletePrompt />
        : overlayView === 'confirmDeletePrompt'
        ? <ConfirmDeletePrompt />
        : null
      }
    </div>
  )
}
