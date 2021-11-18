import { useEffect } from 'react';

// images
import successIcon from '../../images/icon-success.svg';
import closeIcon from '../../images/close-icon.svg';

// redux
import { useDispatch } from 'react-redux';
import { closeOverlay } from '../../redux/features/overlayViewSlice';

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
      <img src={closeIcon} className="closeIcon" onClick={close} />
      <img src={successIcon} className="successIcon" />
      <h3>ACCOUNT CREATED SUCCESSFULLY</h3>
      <p onClick={close}>RETURN TO SIGN IN</p>
    </div>
  )
}
