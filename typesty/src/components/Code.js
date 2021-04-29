import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript'

export function Code({ text, onChange, children }) {
  return (
    <div id='code' className='col-lg-7'>
      <div className='row justify-content-center'>{children}</div>
      <CodeMirror
        className={'codemirror'}
        value={text}
        options={{
          mode: 'javascript',
          theme: 'dracula',
          lineNumbers: true,
          tabindex: 2
        }}
        onChange={onChange}
      />
    </div>
  )
}
