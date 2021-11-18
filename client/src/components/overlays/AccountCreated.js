import { useEffect } from 'react';

// images
import successIcon from '../../images/icon-success.svg';
import closeIcon from '../../images/close-icon.svg';

// redux
import { useDispatch } from 'react-redux';

export default function AccountCreated({toggleOverlayHidden}) {
  const dispatch = useDispatch();


  useEffect(() => {
    const closeTimeout = setTimeout(() => {
      toggleOverlayHidden()
    }, 4000);
    return () => {
      clearTimeout(closeTimeout)
    }
  }, [])

  return (
    <div id="account-created-overlay">
      <img src={closeIcon} className="closeIcon" onClick={toggleOverlayHidden} />
      <img src={successIcon} className="successIcon" />
      <h3>ACCOUNT CREATED SUCCESSFULLY</h3>
      <p onClick={toggleOverlayHidden}>RETURN TO SIGN IN</p>
    </div>
  )
}
