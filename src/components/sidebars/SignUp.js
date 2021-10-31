export default function SignUp() {
  return (
    <div className="content">
      <h2>Create an account to access <strong>full features</strong></h2>
      <div className="input-label-pair">
        <label for="username-signup">USERNAME</label>
        <input id="username-signup" />
      </div>
      <div className="input-label-pair">
        <label for="password-signup">PASSWORD</label>
        <input id="password-signup" type="password" />
      </div>
      <div className="input-label-pair">
        <label for="verify-password-signup">VERIFY PASSWORD</label>
        <input id="verify-password-signup" type="password" />
      </div>
      <button className="primary">SIGN UP</button>
      <button className="secondary">CANCEL</button>
    </div>
  )
}
