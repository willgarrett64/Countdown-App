//#region IMPORTS
// react hooks
import { useEffect } from 'react';

// images
import successIcon from '../../../images/icon-success.svg';
import closeIcon from '../../../images/close-icon.svg';

// redux
import { useDispatch } from 'react-redux';
import { closeOverlay } from '../../../redux/features/overlayViewSlice';
//#endregion IMPORTS


export default function AccountCreated() {
  const dispatch = useDispatch();

  const close = () => {
    dispatch(closeOverlay());
  }
  
  useEffect(() => {
    const closeTimeout = setTimeout(() => {
      close()
    }, 5000);
    return () => {
      clearTimeout(closeTimeout)
    }
  }, [])

  return (
    <div id="account-created-overlay">
      <img src={closeIcon} className="closeIcon" onClick={close} alt="close icon" />
      <img src={successIcon} className="successIcon" alt="success icon" />
      <h3>ACCOUNT CREATED SUCCESSFULLY</h3>
      <p onClick={close}>RETURN TO SIGN IN</p>
    </div>
  )
}
