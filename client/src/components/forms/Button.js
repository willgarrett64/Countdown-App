export default function Button({text, classes, onClick}) {
  return (
    <button
      className={classes}
      onClick={onClick}
    >
      {text}
    </button>
  )
}