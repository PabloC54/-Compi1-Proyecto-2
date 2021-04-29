export function Dropdown({ tabs, expanded, onChange, number }) {
  return (
    <div className={`dropdown-content ${expanded ? 'show' : ''}`}>
      {Object.keys(tabs).map((index) => (
        <span key={index} className={parseInt(index) === number ? 'selected-tab' : ''} onClick={() => onChange(index)}>
          Pestaña {index}
        </span>
      ))}
    </div>
  )
}
