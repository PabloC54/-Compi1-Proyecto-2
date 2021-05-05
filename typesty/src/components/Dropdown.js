export function Dropdown({ tabs, expanded, onChange, name }) {
  return (
    <div id='dropdown-content' className={expanded ? 'show' : ''}>
      {tabs.map((tab, i) => (
        <span key={tab.name} className={tab.name === name ? 'selected-tab' : ''} onClick={() => onChange(i)}>
          {tab.name}
        </span>
      ))}
    </div>
  )
}
