// import components
import EditCountdown from './overlays/EditCountdown';

export default function Overlay({toggleOverlayHidden}) {


  return (
    <div id="overlay" className="none">
      <EditCountdown toggleOverlayHidden={toggleOverlayHidden} />
    </div>
  )
}
