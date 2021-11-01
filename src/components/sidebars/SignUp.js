export default function SignUp({setSidebarView}) {
  const setSelectCountdown = () => {
    setSidebarView('selectCountdown')
  } 

  const setSignIn = () => {
    setSidebarView('signIn')
  } 

  return (
    <div className="content">
      <h2>Create a new account to access <strong>full features</strong></h2>
      <div className="input-label-pair">
        <label htmlFor="username-signup">USERNAME</label>
        <input id="username-signup" />
      </div>
      <div className="input-label-pair">
        <label htmlFor="password-signup">PASSWORD</label>
        <input id="password-signup" type="password" />
      </div>
      <div className="input-label-pair">
        <label htmlFor="verify-password-signup">VERIFY PASSWORD</label>
        <input id="verify-password-signup" type="password" />
      </div>
      <button className="primary" onClick={setSelectCountdown} >SIGN UP</button>
      <button className="secondary" onClick={setSignIn} >CANCEL</button>
    </div>
  )
}
