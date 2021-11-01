export default function SignIn({setSidebarView}) {
  const setSelectCountdown = () => {
    setSidebarView('selectCountdown')
  } 

  const setSignUp = () => {
    setSidebarView('signUp')
  } 

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

      <button className="primary" onClick={setSelectCountdown}>SIGN IN</button>
      <button className="secondary" onClick={setSignUp} >SIGN UP</button>
      <p className="guest-btn" onClick={setSelectCountdown} >CONTINUE AS GUEST</p>
    </div>
  )
}
