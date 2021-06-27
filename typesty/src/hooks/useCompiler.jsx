import React, { useState, useContext } from 'react'
import { Graphviz } from 'graphviz-react'

import LogContext from '@/context/LogContext'
import PopupContext from '@/context/PopupContext'

import { toTitle } from '@/helper/util'

import parse from '@/compiler/analyzer'
import interpret from '@/compiler/interpreter'

import { reportTable, graphAST } from '@/helper/reporter'

const useCompiler = () => {
  const [parsed, setParsed] = useState({})
  const [errors, setErrors] = useState([])
  const [symbols, setSymbols] = useState([])

  const { printLog } = useContext(LogContext)
  const { setPopup } = useContext(PopupContext)

  const compileFile = (content) => {
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

  const reportAST = (name) => {
    if (!Object.keys(parsed).length) return printLog('No hay código compilado para generar el AST')

    const dot_content = graphAST(parsed)
    const el = <Graphviz dot={dot_content} />
    const downloadable = { name: name + ' - AST.dot', text: dot_content }

    setPopup(el, downloadable)
    printLog('Mostrando el AST')
  }

  const reportErrors = (name) => {
    if (!errors.length) return printLog('No hay errores para reportar')

    const fileContent = reportTable('Errores', errors)
    const el = <div dangerouslySetInnerHTML={{ __html: fileContent }} />
    const downloadable = { name: name + ' - errores.html', text: fileContent }

    setPopup(el, downloadable)
    printLog('Mostrando los errores encontrados')
  }

  const reportSymbols = (name) => {
    if (!symbols.length) return printLog('No hay tabla de símbolos para reportar')

    const fileContent = reportTable('Símbolos', symbols)
    const el = <div dangerouslySetInnerHTML={{ __html: fileContent }} />
    const downloadable = { name: name + ' - símbolos.html', text: fileContent }

    setPopup(el, downloadable)
    printLog('Mostrando la tabla de símbolos')
  }

  return { compileFile, reportAST, reportErrors, reportSymbols }
}

export default useCompiler
