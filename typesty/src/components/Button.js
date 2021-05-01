export function Button({ onClick, text, children, width = 12, xSmallWidth, smallWidth, mediumWidth, largeWidth, id, className }) {
  return (
    <div
      className={`col-xs-${xSmallWidth || width} col-sm-${smallWidth || width} col-md-${mediumWidth || width} col-lg-${
        largeWidth || width
      } ${className}`}
      id={id}>
      <button onClick={onClick}>{text}</button>
      {children}
    </div>
  )
}
