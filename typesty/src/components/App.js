import { useState, useRef } from 'react'

import { reportTable, graphAST } from '../services/reporter'
import { toTitle, saveFile } from '../services/util'
import { interpret } from '../Analyzer/interpreter'
import { Logo } from './Logo'
import { Button } from './Button'
import { Code } from './Code'
import { Console } from './Console'
import { Dropdown } from './Dropdown'
const { parse } = require('../Analyzer/analyzer.js')

const App = () => {
  const INITIAL_FILE = 'void main(){\n\t\n}\n\nexec main();'

  const [content, setContent] = useState({ number: 1, text: INITIAL_FILE })
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

  //> File handling

  const handleNewFile = () => {
    setContent({ ...content, text: INITIAL_FILE })
    Log('Nuevo archivo .ty')
  }

  const handleFileOpen = () => {
    inputFile.current.click()
  }

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

  const handleFileSave = () => {
    saveFile(content.text, 'code.ty')
    Log('Se guardó el archivo .ty')
  }

  //> Compile

  const handleCompile = () => {
    const { parsed_body, parsed_errors } = parse(content.text)
    if (!parsed_body || !parsed_body.length) return

    setErrors([])
    setSymbols([])
    setParsed(parsed_body)

    console.log(parsed_body)

    if (parsed_errors.length) {
      setErrors(parsed_errors)
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
    let { printed, interpreted_errors, symbols } = interpret([...parsed_body])
    let end = performance.now()

    setSymbols(symbols)

    if (interpreted_errors.length) {
      let compiler_errors = [...parsed_errors, ...interpreted_errors]
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

    Log([`Compilando...`, ...toTitle(`Output (${(end - start).toFixed(6)} milisegundos)`), ...printed], true)
  }

  //> Reports

  const handleASTReport = () => {
    if (!Object.keys(parsed).length) return Log('No hay código compilado para generar el AST')

    let dot_content = graphAST(parsed)
    let file_content = dot_content

    // generar png del dot
    saveFile(file_content, 'AST.png')
    Log('Se descargargó el AST')
  }

  const handleErrorsReport = () => {
    if (!errors.length) return Log('No hay errores para reportar')

    let file_content = reportTable('Errores', errors)

    saveFile(file_content, 'errors.html')
    Log('Se descargaron los errores encontrados')
  }

  const handleSymbolsReport = () => {
    if (!symbols.length) return Log('No hay tabla de símbolos para reportar')

    let file_content = reportTable('Símbolos', symbols)

    saveFile(file_content, 'symbols.html')
    Log('Se descargó la tabla de símbolos')
  }

  //> Pestañas

  const handleDropDown = () => (expanded ? setExpanded(false) : setExpanded(true))

  const handleNewTab = () => {
    let i = 1
    while (Object.keys(tabs).includes(String(i))) i++

    setTabs({ ...tabs, [content.number]: content.text, [i]: INITIAL_FILE })
    setContent({ number: parseInt(i), text: INITIAL_FILE })
  }

  const handleChangeTab = (i) => {
    if (parseInt(i) === content.number) return

    setTabs({ ...tabs, [content.number]: content.text })
    setContent({ number: parseInt(i), text: tabs[i] })
  }

  const handleCloseTab = () => {
    if (Object.keys(tabs).length === 1) return Log('Únicamente hay una pestaña')

    const new_tabs = Object.keys(tabs).reduce((object, key) => {
      if (parseInt(key) !== content.number) {
        object[parseInt(key)] = tabs[key]
      }
      return object
    }, {})

    setTabs(new_tabs)
    setContent({ number: 1, text: tabs[1] })
  }

  //> Console

  const Log = (msg, clear = false) => {
    clear ? setLogs(typeof msg === 'string' ? [msg] : msg) : setLogs(logs.concat(msg))
    if (!clear) document.getElementById('logger').scrollTop = document.getElementById('logger').scrollHeight
  }

  return (
    <div className='container'>
      <div id='wrap' className='col-lg-12'>
        <div id='buttons' className='row'>
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
          <Logo />
          <Button onClick={handleNewFile} text={'Nuevo archivo'} />
          <Button onClick={handleFileOpen} text={'Abrir archivo'} />
          <Button onClick={handleFileSave} text={'Guardar archivo'} />
          <Button onClick={handleErrorsReport} text={'Reportar errores'} />
          <Button onClick={handleASTReport} text={'Reportar AST'} />
          <Button onClick={handleSymbolsReport} text={'Reportar símbolos'} />
        </div>
        <div className='row'>
          <Code onChange={handleContentChange} text={content.text}>
            <Button onClick={handleCompile} text={'Compilar código'} width={5} id={'centered-col'} />
          </Code>
          <div id='consolearea' className='col-lg-5'>
            <div className='row'>
              <Button onClick={handleDropDown} text={'Pestañas'} className={'dropbtn'} width={6}>
                <Dropdown tabs={tabs} expanded={expanded} onChange={handleChangeTab} number={content.number} />
              </Button>
              <Button onClick={handleNewTab} text={'➕'} width={3} />
              <Button onClick={handleCloseTab} text={'✖️'} width={3} />
            </div>
            <Console logs={logs} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
