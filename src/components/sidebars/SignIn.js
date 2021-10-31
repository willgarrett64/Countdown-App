export default function SignIn() {
  return (
    <div>
      <h2>Sign in to your account to access <strong>full features</strong></h2>
      <div>
        <label for="username-signin">USERNAME</label>
        <input id="username-signin" />
      </div>
      <div>
        <label for="password-signin">PASSWORD</label>
        <input id="password-signin" />
      </div>
      <button>SIGN IN</button>
      <button>SIGN UP</button>
      <p>CONTINUE AS GUEST</p>
    </div>
  )
}
