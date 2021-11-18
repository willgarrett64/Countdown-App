// redux
import { useDispatch } from "react-redux";
import { setOverlayView } from "../../redux/features/overlayViewSlice";

export default function AddNewCountdownCard({toggleOverlayHidden}) {
  const dispatch = useDispatch()
  const openCreateCountdown = () => {
    dispatch(setOverlayView('createCountdown'));
  }
  
  return (
    <div className="card add-new" onClick={openCreateCountdown}>
      <h2>ADD NEW</h2>
    </div>
  )
}
