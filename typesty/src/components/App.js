import { useState, useRef } from 'react'

import { reportTable, graphAST } from '../services/reporter'
import { toTitle, saveFile, copyArray } from '../services/util'
import { interpret } from '../compiler/interpreter'
import { Logo } from './Logo'
import { Credits } from './Credits'
import { Button } from './Button'
import { Code } from './Code'
import { Console } from './Console'
import { Dropdown } from './Dropdown'
import Popup from 'reactjs-popup'
import 'reactjs-popup/dist/index.css'
import { Graphviz } from 'graphviz-react'
const { parse } = require('../compiler/analyzer.js')

const INITIAL_FILE = 'void main(){\n  \n}\n\nexec main();'

const App = () => {
  const [popupOpen, setPopupOpen] = useState(false)
  const [renderedPopup, setRenderedPopup] = useState(<></>)
  const [toDownload, setToDownload] = useState({ name: '', content: '' })

  const [content, setContent] = useState({ name: 'Nuevo archivo', text: INITIAL_FILE })
  const [tabs, setTabs] = useState([content])
  const [expanded, setExpanded] = useState(false)
  const [parsed, setParsed] = useState({})
  const [errors, setErrors] = useState([])
  const [symbols, setSymbols] = useState([])
  const [logs, setLogs] = useState([])

  const inputFile = useRef(null)

  const handleContentChange = (editor, _data, value) => {
    const c = editor.getCursor()
    setContent({ ...content, text: value })
    editor.focus()
    editor.setCursor(c)
  }

  //> File handling

  const handleNewFile = () => {
    let temp_tabs = copyArray(tabs),
      name = getNewTabName()
    for (let tab of temp_tabs) if (tab.name === content.name) temp_tabs[temp_tabs.indexOf(tab)] = { name, text: INITIAL_FILE }

    setTabs(temp_tabs)
    setContent({ name, text: INITIAL_FILE })
    Log('Se inició un nuevo archivo')
  }

  const handleFileOpen = () => inputFile.current.click()

  let fileReader
  const handleFileUpload = (file) => {
    if (file === undefined) return
    for (let tab of tabs)
      if (tab.name === file.name) {
        handleChangeTab(tabs.indexOf(tab))
        return Log(`El archivo ${file.name} ya se encuentra abierto`)
      }

    fileReader = new FileReader()
    fileReader.name = file.name
    fileReader.onloadend = handleFileRead
    fileReader.readAsText(file)
  }

  const handleFileRead = () => {
    const { name, result } = fileReader

    let temp_tabs = copyArray(tabs)
    for (let tab of temp_tabs) if (tab.name === content.name) temp_tabs[temp_tabs.indexOf(tab)].text = content.text

    setTabs([...temp_tabs, { name, text: result }])
    setContent({ name, text: result })
    Log(`Se abrió '${name}'`)
  }

  const handleFileSave = () => {
    saveFile(content)
    Log(`Se guardó el archivo ${content.name}`)
  }

  //> Compile

  const handleCompile = () => {
    const { parsed_body, parsed_errors } = parse(content.text)
    if (!parsed_body || !parsed_body.length) return

    setErrors([])
    setSymbols([])

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

    setParsed(parsed_body)

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

    setRenderedPopup(
      <div id='graph'>
        <Graphviz dot={dot_content} />
      </div>
    )
    setToDownload({ name: 'AST.dot', text: dot_content })
    setPopupOpen(true)

    Log('Mostrando el AST')
  }

  const handleErrorsReport = () => {
    if (!errors.length) return Log('No hay errores para reportar')

    let file_content = reportTable('Errores', errors)
    setRenderedPopup(<div className='modal-body' dangerouslySetInnerHTML={{ __html: file_content }} />)
    setToDownload({ name: 'errors.html', text: file_content })
    setPopupOpen(true)

    Log('Mostrando los errores encontrados')
  }

  const handleSymbolsReport = () => {
    if (!symbols.length) return Log('No hay tabla de símbolos para reportar')

    let file_content = reportTable('Símbolos', symbols)
    setRenderedPopup(<div className='modal-body' dangerouslySetInnerHTML={{ __html: file_content }} />)
    setToDownload({ name: 'symbols.html', text: file_content })
    setPopupOpen(true)

    Log('Mostrando la tabla de símbolos')
  }

  //> Tabs

  const getNewTabName = () => {
    const tabExists = (name) => {
      for (let tab of tabs) if (tab.name === name) return true
    }

    let i = 1
    while (tabExists(`Nuevo archivo ${i}`)) i++

    return `Nuevo archivo ${i}`
  }

  const handleDropDown = () => setExpanded(!expanded)

  const handleNewTab = () => {
    let temp_tabs = copyArray(tabs),
      name = getNewTabName()
    for (let tab of temp_tabs) if (tab.name === content.name) temp_tabs[temp_tabs.indexOf(tab)].text = content.text

    setTabs([...temp_tabs, { name, text: INITIAL_FILE }])
    setContent({ name, text: INITIAL_FILE })
  }

  const handleChangeTab = (i) => {
    setExpanded(false)
    if (tabs[i].name === content.name) return

    let temp_tabs = copyArray(tabs)
    for (let tab of temp_tabs) if (tab.name === content.name) temp_tabs[temp_tabs.indexOf(tab)].text = content.text

    setTabs(temp_tabs)
    setContent(tabs[i])
  }

  const handleCloseTab = () => {
    if (tabs.length === 1) return Log('Únicamente hay una pestaña')

    let temp_tabs = copyArray(tabs)
    for (let tab of temp_tabs) if (tab.name === content.name) temp_tabs.splice(temp_tabs.indexOf(tab), 1)

    setTabs(temp_tabs)
    setContent(temp_tabs[0])
  }

  //> Console

  const Log = (msg, clear = false) => {
    clear ? setLogs(typeof msg === 'string' ? [msg] : msg) : setLogs(logs.concat(msg))
    if (!clear) document.getElementById('logger').scrollTop = document.getElementById('logger').scrollHeight
  }

  const closePopup = () => {
    setPopupOpen(false)
    setRenderedPopup(<></>)
  }

  const handleDownload = () => {
    saveFile(toDownload)
    Log(`Se descargó ${toDownload.name}`)
  }

  return (
    <div className='container'>
      <Popup open={popupOpen} closeOnDocumentClick onClose={closePopup}>
        <div className='popup'>
          <div className='row'>
            <Button
              onClick={handleDownload}
              text={'Descargar'}
              className='download'
              xSmallWidth={10}
              smallWidth={10}
              mediumWidth={6}
              largeWidth={4}
            />
            <Button
              onClick={closePopup}
              text={'✖'}
              className='close'
              xSmallWidth={2}
              smallWidth={2}
              mediumWidth={2}
              largeWidth={2}
            />
          </div>
          <div className='row'>{renderedPopup}</div>
        </div>
      </Popup>
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
          <Button onClick={handleNewFile} text={'Nuevo archivo'} smallWidth={6} mediumWidth={4} largeWidth={3} />
          <Button onClick={handleFileOpen} text={'Abrir archivo'} smallWidth={6} mediumWidth={4} largeWidth={3} />
          <Button onClick={handleFileSave} text={'Guardar archivo'} smallWidth={6} mediumWidth={4} largeWidth={3} />
          <Button onClick={handleErrorsReport} text={'Reportar errores'} smallWidth={6} mediumWidth={4} largeWidth={3} />
          <Button onClick={handleASTReport} text={'Reportar AST'} smallWidth={6} mediumWidth={4} largeWidth={3} />
          <Button onClick={handleSymbolsReport} text={'Reportar símbolos'} smallWidth={6} mediumWidth={4} largeWidth={3} />
        </div>
        <div className='row'>
          <Code onChange={handleContentChange} text={content.text}>
            <Button onClick={handleCompile} text={'Compilar código'} width={5} id={'centered-col'} />
          </Code>
          <div id='consolearea' className='col-lg-5'>
            <div className='row'>
              <Button
                onClick={handleDropDown}
                text={content.name}
                className={'dropbtn'}
                xSmallWidth={12}
                smallWidth={12}
                width={6}>
                <Dropdown tabs={tabs} expanded={expanded} onChange={handleChangeTab} name={content.name} />
              </Button>
              <Button onClick={handleNewTab} text={'➕'} xSmallWidth={6} smallWidth={6} width={3} />
              <Button onClick={handleCloseTab} text={'✖️'} xSmallWidth={6} smallWidth={6} width={3} />
            </div>
            <Console logs={logs} />
          </div>
        </div>
        <Credits />
      </div>
    </div>
  )
}

export default App
