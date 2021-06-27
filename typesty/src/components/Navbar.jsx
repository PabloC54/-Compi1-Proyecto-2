import React, { useState, useContext, useRef } from 'react'
import { createUseStyles } from 'react-jss'

import useOutsideAlerter from '@/hooks/useOutsideAlerter'
import useCompiler from '@/hooks/useCompiler'

import Button from './Button'
import Logo from './Logo'

import LogContext from '@/context/LogContext'
import TabsContext from '@/context/TabsContext'

import { downloadFile } from '@/helper/util'

import menuIcon from '@img/menu-icon.png'
import boxIcon from '@img/box-icon.png'
import playIcon from '@img/play-icon.png'

function Navbar({ width }) {
  const classes = useStyles(width)

  const [expanded, setExpanded] = useState(false)

  const { printLog } = useContext(LogContext)
  const { tabs, activeTab, newTab, changeTab } = useContext(TabsContext)
  const { name, content } = activeTab

  const { compileFile, reportAST, reportErrors, reportSymbols } = useCompiler()

  const inputFile = useRef(null)
  const menuRef = useRef(null)

  const showMenu = () => setExpanded(true)

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

  const handleCompile = () => {
    hideMenu()
    compileFile(content)
  }

  const handleAST = () => {
    hideMenu()
    reportAST(name)
  }

  const handleErrors = () => {
    hideMenu()
    reportErrors(name)
  }

  const handleSymbols = () => {
    hideMenu()
    reportSymbols(name)
  }

  return (
    <div className={`${classes.base} unselectable`}>
      <div className={classes.navbar}>
        <div className={classes.menuButton} onClick={showMenu}>
          <img src={menuIcon} alt='menu' />
        </div>
        <Logo />
        <Button className={classes.compileButton} onClick={handleCompile} highlight>
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
          <div onClick={handleErrors}>
            <img src={boxIcon} alt='reportar errores' />
            Reportar errores
          </div>
          <div onClick={handleAST}>
            <img src={boxIcon} alt='reportar ast' />
            Reportar AST
          </div>
          <div onClick={handleSymbols}>
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
