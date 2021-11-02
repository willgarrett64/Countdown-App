// import components
import EditCountdown from './overlays/EditCountdown';

export default function Overlay({toggleOverlayHidden}) {


  return (
    <div id="overlay" className="hidden">
      <EditCountdown toggleOverlayHidden={toggleOverlayHidden} />
    </div>
  )
}
