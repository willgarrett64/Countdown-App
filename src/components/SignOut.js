
export default function SignOut({username, signOut}) {
  return (
    <div className="signOut">
      <p className="username">{username}</p>
      <p className="btn" onClick={signOut} >SIGN OUT</p>      
    </div>
  )
}
