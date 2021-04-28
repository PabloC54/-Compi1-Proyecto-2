import { useState, useRef } from 'react'

import { UnControlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/javascript/javascript'

import { interpret, getPrinted, getErrors, getSymbols } from '../Analyzer/interpreter'
import { report, graphAST } from '../Analyzer/util'
const { parse } = require('../Analyzer/analyzer.js')

const App = () => {
  const [content, setContent] = useState({ number: 1, text: '{}' })
  const [tabs, setTabs] = useState({ 1: content.text })
  const [expanded, setExpanded] = useState(false)
  const [logs, setLogs] = useState([])
  const [parsed, setParsed] = useState({})
  const [errors, setErrors] = useState([])
  const [symbols, setSymbols] = useState([])
  const inputFile = useRef(null)

  const handleContentChange = (editor, _data, value) => {
    const c = editor.getCursor()
    setContent({ ...content, text: value })
    editor.focus()
    editor.setCursor(c)
  }

  //> New File
  const handleNewFile = () => {
    setContent({ ...content, text: '{}' })
    Log('Nuevo archivo .ty')
  }

  const handleFileOpen = () => {
    inputFile.current.click()
  }

  //> Open File
  let fileReader

  const handleFileUpload = (file) => {
    if (file === undefined) return
    fileReader = new FileReader()
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
    Log("Se abrió '" + file.name + "'")
  }

  const handleFileRead = () => {
    const text = fileReader.result
    setContent({ ...content, text: text })
  }

  const handleSave = (text, name) => {
    const element = document.createElement('a')
    const file = new Blob([text], {
      type: 'text/plain'
    })
    element.href = URL.createObjectURL(file)
    element.download = name
    element.click()
  }

  //> Save File
  const handleFileSave = () => {
    handleSave(content.text, 'code.ty')
    Log('Se guardó el archivo .ty')
  }

  //> Compilar

  const handleCompile = () => {
    const { parsed_body, parsed_errors } = parse(content.text)
    if (!parsed_body || !parsed_body.length) return

    setErrors([])
    setSymbols([])
    setParsed(parsed_body)

    console.log(parsed_body)

    if (parsed_errors.length) {
      setErrors(parsed_errors)
      console.log('parsed errors', ...parsed_errors.map((e) => `[${e.Linea}, ${e.Columna}] ${e.Tipo}: ${e.Mensaje}`))
      return Log(
        [
          `Compilando...`,
          ...toTitle('Errores encontrados'),
          ...parsed_errors.map((e) => `[${e.Linea}, ${e.Columna}] ${e.Tipo}: ${e.Mensaje}`),
          `Puede consultar los errores en 'Reportar errores'`
        ],
        true
      )
    }

    let start = performance.now()
    interpret([...parsed_body])
    let end = performance.now()

    setSymbols(getSymbols())

    let semantic_errors = getErrors()
    if (semantic_errors.length) {
      let compiler_errors = [...parsed_errors, ...semantic_errors]
      setErrors(compiler_errors)
      return Log(
        [
          `Compilando...`,
          ...toTitle('Errores encontrados'),
          ...compiler_errors.map((e) => `[${e.Linea}, ${e.Columna}] ${e.Tipo}: ${e.Mensaje}`),
          `Puede consultar los errores en 'Reportar errores'`
        ],
        true
      )
    }

    Log([`Compilando...`, ...toTitle(`Output (${(end - start).toFixed(6)} milisegundos)`), ...getPrinted()], true)
  }

  //> Reporte AST

  const handleASTReport = () => {
    if (!Object.keys(parsed).length) return Log('No hay código compilado para generar el AST')

    let dot_content = graphAST(parsed)
    let file_content = dot_content

    // generar png del dot
    handleSave(file_content, 'AST.png')
    Log('Se descargargó el AST')
  }

  //> Reporte de errores

  const handleErrorsReport = () => {
    if (!errors.length) return Log('No hay errores para reportar')

    let file_content = report('Errores', errors)

    handleSave(file_content, 'errors.html')
    Log('Se descargaron los errores encontrados')
  }

  //> Tabla de símbolos

  const handleSymbolsReport = () => {
    if (!symbols.length) return Log('No hay tabla de símbolos para reportar')

    let file_content = report('Símbolos', symbols)

    handleSave(file_content, 'symbols.html')
    Log('Se descargó la tabla de símbolos')
  }

  //> Consola

  const Log = (msg, clear = false) => {
    clear ? setLogs(typeof msg === 'string' ? [msg] : msg) : setLogs(logs.concat(msg))
    if (!clear) document.getElementById('logger').scrollTop = document.getElementById('logger').scrollHeight
  }

  const toTitle = (msg) => ['='.repeat(msg.length + 4), `| ${msg} |`, '='.repeat(msg.length + 4)]

  //> Pestañas

  const handleDropDown = () => (expanded ? setExpanded(false) : setExpanded(true))

  const handleNewTab = () => {
    let i = getNumber()

    setTabs({ ...tabs, [content.number]: content.text, [i]: '{}' })
    setContent({ number: parseInt(i), text: '{}' })
  }

  const handleChangeTab = (i) => {
    if (parseInt(i) === content.number) return

    setTabs({ ...tabs, [content.number]: content.text })
    setContent({ number: parseInt(i), text: tabs[i] })
  }

  const handleCloseTab = () => {
    if (Object.keys(tabs).length === 1) return Log('Únicamente hay una pestaña')

    const temp = Object.keys(tabs).reduce((object, key) => {
      if (parseInt(key) !== content.number) {
        object[parseInt(key)] = tabs[key]
      }
      return object
    }, {})

    setTabs(temp)
    setContent({ number: 1, text: tabs[1] })
  }

  const getNumber = () => {
    let i = 1
    while (Object.keys(tabs).includes(String(i))) i++
    return i
  }

  return (
    <div className='row'>
      <div id='wrap' className='col-lg-12'>
        <div id='buttons'>
          <div className='row'>
            <div className='col-lg-3'>
              <button onClick={handleNewFile}>Nuevo archivo</button>
              <input
                style={{ display: 'none' }}
                type='file'
                accept='.ty'
                ref={inputFile}
                onChange={(e) => handleFileUpload(e.target.files[0])}
                onClick={(e) => {
                  e.target.value = null
                }}
              />
            </div>
            <div className='col-lg-3'>
              <button onClick={handleNewTab}>Nueva pestaña</button>
            </div>
            <div className='col-lg-3'>
              <button onClick={handleFileOpen}>Abrir archivo</button>
            </div>
            <div className='col-lg-3'>
              <button onClick={handleFileSave}>Guardar archivo</button>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-3'>
              <button onClick={handleCompile}>Compilar</button>
            </div>
            <div className='col-lg-3'>
              <button onClick={handleErrorsReport}>Reportar errores</button>
            </div>
            <div className='col-lg-3'>
              <button onClick={handleASTReport}>Reportar AST</button>
            </div>
            <div className='col-lg-3'>
              <button onClick={handleSymbolsReport}>Reportar símbolos</button>
            </div>
          </div>
        </div>
        <div className='row'>
          <div id='code' className='col-lg-7'>
            <CodeMirror
              value={content.text}
              options={{
                mode: 'javascript',
                theme: 'dracula',
                lineNumbers: true,
                tabindex: 2
              }}
              onChange={handleContentChange}
            />
          </div>
          <div id='consolearea' className='col-lg-5'>
            <div className='row'>
              <div className='col-lg-6'>
                <button onClick={handleDropDown} className='dropbtn'>
                  Pestañas
                </button>
                <div className={`dropdown-content ${expanded ? 'show' : ''}`}>
                  {Object.keys(tabs).map((index) => (
                    <span
                      key={index}
                      className={parseInt(index) === content.number ? 'selected-tab' : ''}
                      onClick={() => handleChangeTab(index)}>
                      Pestaña {index}
                    </span>
                  ))}
                </div>
              </div>
              <div className='col-lg-6'>
                <button onClick={handleCloseTab}>Cerrar pestaña</button>
              </div>
            </div>
            <div className='row'>
              <div id='console' className='col-lg-12'>
                <textarea id='logger' readOnly defaultValue={logs.map((log) => log + '\n').join('')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
