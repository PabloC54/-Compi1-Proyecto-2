export function Console({logs}) {
  return (
    <div className='row'>
      <div id='console' className='col-lg-12'>
        <textarea id='logger' readOnly defaultValue={logs.map((log) => log + '\n').join('')} />
      </div>
    </div>
  )
}
