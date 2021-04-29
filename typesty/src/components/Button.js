export function Button({ onClick, text, children, width = 3, id }) {
  return (
    <div className={`col-lg-${width}`} id={id}>
      <button onClick={onClick}>{text}</button>
      {children}
    </div>
  )
}
