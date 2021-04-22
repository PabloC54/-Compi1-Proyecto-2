import { readFileSync, writeFileSync } from 'fs'
import js from 'jison'
const { Parser } = js

const generate_analyzer = () => {
  const gr = readFileSync('/home/pablo/Documentos/src/Universidad/-Compi1-Proyecto-2/typesty/src/Analyzer/grammar.jison', 'utf8')
  const parserSource = new Parser(gr).generate()

  writeFileSync('/home/pablo/Documentos/src/Universidad/-Compi1-Proyecto-2/typesty/src/Analyzer/analyzer.js', parserSource)
  console.log('generated')
}

generate_analyzer()
