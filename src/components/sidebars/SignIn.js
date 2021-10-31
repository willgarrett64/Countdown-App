export default function SignIn() {
  return (
    <div className="content">
      <h2>Sign in to your account to access <strong>full features</strong></h2>
      <div className="input-label-pair">
        <label htmlFor="username-signin">USERNAME</label>
        <input id="username-signin" />
      </div>
      <div className="input-label-pair">
        <label htmlFor="password-signin">PASSWORD</label>
        <input id="password-signin" type="password" />
      </div>

      <button className="primary">SIGN IN</button>
      <button className="secondary">SIGN UP</button>
      <p className="guest-btn">CONTINUE AS GUEST</p>
    </div>
  )
}
