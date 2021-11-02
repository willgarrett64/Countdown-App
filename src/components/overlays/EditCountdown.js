import closeIcon from '../../images/close-icon.svg'
import deleteIcon from '../../images/icon-delete.svg'



export default function EditCountdown({toggleOverlayHidden}) {
  return (
    <div id="edit-countdown-overlay">
      <img src={closeIcon} className="closeIcon" onClick={toggleOverlayHidden} />
      <h2><strong>EDIT</strong> COUNTDOWN</h2>
      <div className="input-label-pair">
        <label htmlFor="new-countdown-name">COUNTDOWN NAME</label>
        <input className="rounded" id="new-countdown-name" />
      </div>
      <div className="input-label-pair">
        <label htmlFor="new-countdown-date">COUNTDOWN DATE</label>
        <input className="rounded" id="new-countdown-date" />
      </div>
      <div className="input-label-pair">
        <label htmlFor="new-countdown-time">COUNTDOWN TIME</label>
        <input className="rounded" id="new-countdown-time" />
      </div>
      <div>
        <button className="secondary">CANCEL</button>
        <button className="primary">SAVE</button>
      </div>
      <div className="deleteIcon">
        <img src={deleteIcon} />
        <p>delete</p>
      </div>
    </div>
  )
}
