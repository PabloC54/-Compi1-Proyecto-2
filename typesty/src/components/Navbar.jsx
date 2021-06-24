import React from 'react'
import { useState, useContext, useRef } from 'react'
import { createUseStyles } from 'react-jss'

import useOutsideAlerter from '@/hooks/useOutsideAlerter'

//import { Graphviz } from 'graphviz-react'
import Button from './Button'
import Logo from './Logo'

import LogContext from '@/context/LogContext'
import TabsContext from '@/context/TabsContext'

import { downloadFile, toTitle } from '@/services/util'
//import { reportTable, graphAST } from 'services/reporter'

import menuIcon from '@img/menu-icon.png'
import boxIcon from '@img/box-icon.png'
import playIcon from '@img/play-icon.png'

import parse from '@/compiler/analyzer'
import interpret from '@/compiler/interpreter'

function Navbar({ width }) {
  const classes = useStyles(width)

  const [expanded, setExpanded] = useState(false)
  const [parsed, setParsed] = useState({})
  const [errors, setErrors] = useState([])
  const [symbols, setSymbols] = useState([])

  const { printLog } = useContext(LogContext)
  const { tabs, activeTab, newTab, changeTab } = useContext(TabsContext)
  const { name, content } = activeTab

  const inputFile = useRef(null)
  const menuRef = useRef(null)

  const toggleMenu = () => setExpanded(!expanded)

  const hideMenu = () => setExpanded(false)

  useOutsideAlerter(menuRef, hideMenu)

  const openFile = () => {
    hideMenu()
    inputFile.current.click()
  }

  const uploadFile = (file) => {
    const readFile = () => {
      const { name, content } = fileReader
      newTab({ name, content })
      printLog(`Se abrió '${name}'`)
    }

    if (file === undefined) return

    if (tabs.find((tab) => tab.name === file.name)) {
      changeTab(tabs.findIndex((tab) => tab.name === file.name))
      return printLog(`El archivo ${file.name} ya se encuentra abierto`)
    }

    const fileReader = new FileReader()
    fileReader.name = file.name
    fileReader.onloadend = readFile
    fileReader.readAsText(file)
  }

  const saveFile = () => {
    hideMenu()

    downloadFile({ name, content })
    printLog(`Se guardó el archivo ${name}`)
  }

  const compileFile = () => {
    hideMenu()

    const { parsed_body, parsed_errors } = parse(content)
    if (!parsed_body || !parsed_body.length) return

    setErrors([])
    setSymbols([])

    if (parsed_errors.length) {
      setErrors(parsed_errors)
      return printLog(
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

    const start = performance.now()
    const { printed, interpreted_errors, symbols } = interpret([...parsed_body])
    const end = performance.now()

    setSymbols(symbols)

    if (interpreted_errors.length) {
      const compiler_errors = [...parsed_errors, ...interpreted_errors]
      setErrors(compiler_errors)
      return printLog(
        [
          `Compilando...`,
          ...toTitle('Errores encontrados'),
          ...compiler_errors.map((e) => `[${e.Linea}, ${e.Columna}] ${e.Tipo}: ${e.Mensaje}`),
          `Puede consultar los errores en 'Reportar errores'`
        ],
        true
      )
    }

    printLog([`Compilando...`, ...toTitle(`Output (${(end - start).toFixed(6)} milisegundos)`), ...printed], true)
  }

  //> Reports

  const reportAST = () => {
    hideMenu()

    if (!Object.keys(parsed).length) return printLog('No hay código compilado para generar el AST')

    //let dot_content = graphAST(parsed)

    //setRenderedPopup(
    //  <div id='graph'>
    //    <Graphviz dot={dot_content} />
    //  </div>
    //)
    //setToDownload({ name: content.name + ' - AST.dot', text: dot_content })
    //setPopupOpen(true)

    printLog('Mostrando el AST')
  }

  const reportErrors = () => {
    hideMenu()

    if (!errors.length) return printLog('No hay errores para reportar')

    //const file_content = reportTable('Errores', errors)
    //setRenderedPopup(<div className='modal-body' dangerouslySetInnerHTML={{ __html: file_content }} />)
    //setToDownload({ name: content.name + ' - errors.html', text: file_content })
    //setPopupOpen(true)

    printLog('Mostrando los errores encontrados')
  }

  const reportSymbols = () => {
    hideMenu()

    if (!symbols.length) return printLog('No hay tabla de símbolos para reportar')

    //const file_content = reportTable('Símbolos', symbols)
    //setRenderedPopup(<div className='modal-body' dangerouslySetInnerHTML={{ __html: file_content }} />)
    //setToDownload({ name: content.name + ' - símbolos.html', text: file_content })
    //setPopupOpen(true)

    printLog('Mostrando la tabla de símbolos')
  }

  return (
    <div className={`${classes.base} unselectable`}>
      <div className={classes.navbar}>
        <div className={classes.menuButton} onClick={toggleMenu}>
          <img src={menuIcon} alt='menu' />
        </div>
        <Logo />
        <Button className={classes.compileButton} onClick={compileFile} highlight>
          Run
          <img src={playIcon} alt='run' />
        </Button>
      </div>
      {expanded && (
        <div ref={menuRef} className={`${classes.menu} ${!expanded && classes.hidden}`}>
          <div onClick={openFile}>
            <img src={boxIcon} alt='abrir archivo' />
            Abrir archivo
          </div>
          <div onClick={saveFile}>
            <img src={boxIcon} alt='guardar archivo' />
            Guardar archivo
          </div>
          <div onClick={reportErrors}>
            <img src={boxIcon} alt='reportar errores' />
            Reportar errores
          </div>
          <div onClick={reportAST}>
            <img src={boxIcon} alt='reportar ast' />
            Reportar AST
          </div>
          <div onClick={reportSymbols}>
            <img src={boxIcon} alt='reportar simbolos' />
            Reportar símbolos
          </div>
          <input
            style={{ display: 'none' }}
            type='file'
            accept='.ty'
            ref={inputFile}
            onChange={(e) => uploadFile(e.target.files[0])}
            onClick={(e) => {
              e.target.value = null
            }}
          />
        </div>
      )}
    </div>
  )
}

const useStyles = createUseStyles({
  base: {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 10
  },
  navbar: {
    display: 'flex',
    zIndex: '10',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
    backgroundColor: '#222',
    color: 'white'
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center',
    height: '60%',
    margin: '0 10px',
    '&:hover': {
      cursor: 'pointer'
    },
    '& img': {
      height: '100%'
    }
  },
  compileButton: {
    margin: '0 8px',
    fontSize: 16,
    '& img': {
      height: '55%',
      margin: '0 4px'
    }
  },
  menu: {
    position: 'relative',
    width: (width) => (width > 800 ? 400 : 'calc(100%)'),
    zIndex: -1,
    padding: '25px 20px 20px 20px',
    backgroundColor: 'rgb(31, 31, 31)',
    color: 'white',
    borderRadius: 10,
    top: -10,
    left: -10,
    '& div': {
      width: '100%',
      padding: 4,
      '&:hover': {
        cursor: 'pointer',
        color: 'khaki'
      },
      '& img': {
        height: 20,
        margin: '0 10px'
      }
    }
  },
  hidden: {
    top: -500
  }
})

export default Navbar
