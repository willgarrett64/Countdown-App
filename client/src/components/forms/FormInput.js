export default function FormInput({id, label, type="text", onChange, inputClasses, required}) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} onChange={onChange} className={inputClasses} required={required}></input>
      <span className="error-message" id={id + '-error'}></span>
    </div>
  )
}