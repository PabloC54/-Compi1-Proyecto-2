const reportTable = (name, table) => {
  let html_file = `<!DOCTYPE html>
  <html>
  <head>
  <title>${name}</title>
	<meta charset="UTF-8">
  <style>
		@charset "UTF-8";
		@import url(https://fonts.googleapis.com/css?family=Open+Sans:300,400,700);

		body {
			font-weight: 300;
			line-height: 1.42em;
			color: #a7a1ae;
			font-family: "Open Sans", sans-serif;
			background-color: #1f2739;
		}

		h1 {
			font-size: 3em;
			font-weight: 300;
			line-height: 1em;
			text-align: center;
			color: #4dc3fa;
		}

		h2 {
			font-size: 1em;
			font-weight: 300;
			text-align: center;
			display: block;
			line-height: 1em;
			padding-bottom: 2em;
			color: #fb667a;
		}

		h2 a {
			font-weight: 700;
			text-transform: uppercase;
			color: #fb667a;
			text-decoration: none;
		}

		.blue {
			color: #185875;
		}
		.yellow {
			color: #fff842;
		}

		.tablecontainer th h1 {
			font-weight: bold;
			font-size: 1em;
			text-align: left;
			color: #185875;
		}

		.tablecontainer td {
			font-weight: normal;
			font-size: 1em;
			-webkit-box-shadow: 0 2px 2px -2px #0e1119;
			-moz-box-shadow: 0 2px 2px -2px #0e1119;
			box-shadow: 0 2px 2px -2px #0e1119;
		}

		.tablecontainer {
			text-align: left;
			overflow: hidden;
			width: 80%;
			margin: 0 auto;
			display: table;
			padding: 0 0 8em 0;
		}

		.tablecontainer td,
		.tablecontainer th {
			padding-bottom: 2%;
			padding-top: 2%;
			padding-left: 2%;
		}

		/* Background-color of the odd rows */
		.tablecontainer tr:nth-child(odd) {
			background-color: #323c50;
		}

		/* Background-color of the even rows */
		.tablecontainer tr:nth-child(even) {
			background-color: #2c3446;
		}

		.tablecontainer th {
			background-color: #1f2739;
		}

		.tablecontainer td:first-child {
			color: #fb667a;
		}
		
		@media (max-width: 800px) {
			.tablecontainer td:nth-child(4),
			.tablecontainer th:nth-child(4) {
				display: none;
			}
		}
  </style>
  </head>
  <body>`

  html_file += `<table class='tablecontainer'>
      <thead>
      <tr>\n`

  for (let elemento of name === 'Errores'
    ? ['Línea', 'Columna', 'Tipo', 'Descripción']
    : ['Línea', 'Columna', 'Entorno', 'Tipo', 'Tipo dato', 'Identificador'])
    html_file += `<th><h1>${elemento}</h1></th>\n`

  html_file += `</tr>
				</thead>
			<tbody>`

  for (let tupla of table) {
    html_file += `<tr>\n`

    for (let elemento of Object.values(tupla)) html_file += `<td>${elemento}</td>\n`

    html_file += `</tr>`
  }
  html_file += `</tbody>
       </table>
       </body>
       </html>`

  return html_file
}

const graphAST = (parsed) => {
  let s = `digraph G {
		nodesep=0.4;
		ranksep=0.5;

    node__ [fontsize=13 fontname = "helvetica" label="Instrucciones"];
		${printInstructions(parsed, 'node__')}
	}`

  return s

  //let command = 'dot -Tpng ' + name + '.dot -o ' + name + '.png'
  //Runtime.getRuntime().exec(command)
}

const printInstructions = (INS, back_node = '') => {
  const print = {
    Exec: printExec,
    Declaracion: printDeclaracion,
    Asignacion: printAsignacion,
    Funcion: printFuncion,
    Metodo: printFuncion,
    Llamada: printLlamada,
    Incremento: printIncremento,
    Decremento: printDecremento,
    vector: printDeclararVector,
    list: printDeclararLista,
    Modificacion_vector: printModificacionVector,
    Modificacion_lista: printModificacionLista,
    Add_lista: printAddLista,
    If: printIf,
    Switch: printSwitch,
    While: printWhile,
    For: printFor,
    Do_while: printDoWhile,
    Break: printBreak,
    Continue: printContinue,
    Return: printReturn
  }

  let temp_str = ''
  if (!INS || !INS.length) {
    return temp_str
  }

  for (let Instruction of INS) {
    let name = node_name(Instruction.Tipo, Instruction.Linea, Instruction.Columna)
    temp_str += print_node(name, Instruction.Tipo)
    temp_str += link_nodes(back_node, name)
    //if (!print[Instruction.Tipo]) return console.log('No existe la funcion para ', Instruction.Tipo)
    temp_str += print[Instruction.Tipo](name, Instruction)
  }

  return temp_str
}

const print_node = (node, text) => `${node} [fontsize=13 fontname = "helvetica" label="${text}"];\n`

const node_name = (Tipo, Linea, Columna) => `${Tipo}_${Linea}_${Columna}`

const link_nodes = (back_node, next_node) => `${back_node} -> ${next_node};\n`

//> Printing

const printExec = (_back_node, { Linea, Columna, Llamada }) => {
  let temp_str = '',
    name

  name = node_name('Exec', Linea, Columna)
  temp_str += print_node(name, `Sentencia Exec`)

  let new_name = node_name('Llamada', Linea, Columna)
  temp_str += print_node(new_name, `Llamada`)
  temp_str += printLlamada(new_name, Llamada)
  temp_str += link_nodes(name, new_name)

  return temp_str
}

const printOperacion = (Operacion, back_node, dif = '') => {
  let temp_str = '',
    name

  if (['int', 'double', 'char', 'string', 'boolean', 'id', 'vector', 'list'].includes(Operacion.Tipo)) {
    name = node_name('Primitivo', Operacion.Linea, Operacion.Columna)
    temp_str += print_node(name, `Primitivo <${Operacion.Tipo}>\\n${Operacion.Valor}`)
    temp_str += link_nodes(back_node, name)
    return temp_str
  }

  switch (Operacion.Tipo) {
    case 'Llamada':
      name = node_name('Llamada', Operacion.Linea, Operacion.Columna)
      temp_str += print_node(name, `Llamada\\n${Operacion.ID}`)
      temp_str += printLlamada(name, Operacion)
      temp_str += link_nodes(back_node, name)
      break
    case 'Acceso_vector':
      name = node_name('Acceso_vector', Operacion.Linea, Operacion.Columna)
      temp_str += print_node(name, `Acceso a vector\\n${Operacion.ID}`)
      temp_str += printAccesoVector(name, Operacion)
      temp_str += link_nodes(back_node, name)
      break
    case 'Acceso_lista':
      name = node_name('Acceso_lista', Operacion.Linea, Operacion.Columna)
      temp_str += print_node(name, 'Acceso a lista\n' + Operacion.ID)
      temp_str += printAccesoLista(name, Operacion)
      temp_str += link_nodes(back_node, name)
      break
    case 'ternaria':
      name = node_name('ternaria' + dif, Operacion.Linea, Operacion.Columna)
      temp_str += print_node(name, `Operacion ternaria`)
      temp_str += link_nodes(back_node, name)
      temp_str += printOperacion(Operacion.Condicion, name, 'c')
      temp_str += printOperacion(Operacion.Izquierda, name, 'i')
      temp_str += printOperacion(Operacion.Derecha, name, 'd')
      break
    default:
      name = node_name(Operacion.Tipo + dif, Operacion.Linea, Operacion.Columna)
      temp_str += print_node(name, `Operacion ${Operacion.Tipo}`)
      temp_str += link_nodes(back_node, name)
      temp_str += printOperacion(Operacion.Izquierda, name, 'i')
      if (Operacion.Derecha) temp_str += printOperacion(Operacion.Derecha, name, 'd')
  }

  return temp_str
}

const printDeclaracion = (back_node, { Linea, Columna, Tipo_variable, ID, Expresion }) => {
  let temp_str = '',
    name

  name = node_name('Tipo_variable', Linea, Columna)
  temp_str += print_node(name, `Tipo\\n${Tipo_variable}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `ID\\n${ID}`)
  temp_str += link_nodes(back_node, name)

  if (Expresion) {
    name = node_name('Expresion', Linea, Columna)
    temp_str += print_node(name, `Expresion`)
    temp_str += printOperacion(Expresion, name)
    temp_str += link_nodes(back_node, name)
  }

  return temp_str
}

const printAsignacion = (back_node, { Linea, Columna, ID, Expresion }) => {
  let temp_str = '',
    name

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `ID\\n${ID}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Expresion', Linea, Columna)
  temp_str += print_node(name, `Expresion`)
  temp_str += printOperacion(Expresion, name)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printFuncion = (back_node, { Linea, Columna, ID, Tipo_retorno, Instrucciones }) => {
  let temp_str = '',
    name

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `ID\\n${ID}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Tipo_retorno', Linea, Columna)
  temp_str += print_node(name, `Tipo\\n${Tipo_retorno}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Instrucciones', Linea, Columna)
  temp_str += print_node(name, `Instrucciones`)
  temp_str += printInstructions(Instrucciones, name)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printLlamada = (back_node, { Linea, Columna, ID, Parametros }) => {
  let temp_str = '',
    name

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `ID\\n${ID}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Parametros', Linea, Columna)
  temp_str += print_node(name, `Parametros`)
  temp_str += link_nodes(back_node, name)

  for (let Parametro of Parametros) {
    temp_str += printOperacion(Parametro, name)
  }

  return temp_str
}

const printIncremento = (back_node, { Linea, Columna, ID }) => {
  let temp_str = '',
    name

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `ID\\n${ID}`)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printDecremento = (back_node, { Linea, Columna, ID }) => {
  let temp_str = '',
    name

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `ID\\n${ID}`)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printDeclararVector = (back_node, { Linea, Columna, Tipo_valores, ID, Tipo_i, Tamaño, Valores }) => {
  let temp_str = '',
    name

  name = node_name('Tipo_valores', Linea, Columna)
  temp_str += print_node(name, `Tipo\\n${Tipo_valores}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `ID\\n${ID}`)
  temp_str += link_nodes(back_node, name)

  if (Tipo_i) {
    name = node_name('Tamaño', Linea, Columna)
    temp_str += print_node(name, `Tamaño${Tamaño}`)
    temp_str += printOperacion(Tamaño, back_node)
    temp_str += link_nodes(back_node, name)
  } else {
    name = node_name('Valores', Linea, Columna)
    temp_str += print_node(name, `Valores`)
    temp_str += link_nodes(back_node, name)

    for (let Valor of Valores) {
      let new_name = node_name('Valor', Valor.Linea, Valor.Columna)
      temp_str += print_node(new_name, `Valor`)
      temp_str += printOperacion(Valor, new_name)
      temp_str += link_nodes(name, new_name)
    }
  }

  return temp_str
}

const printDeclararLista = (back_node, { Linea, Columna, Tipo_valores, ID, Tipo_i, Valores }) => {
  let temp_str = '',
    name

  name = node_name('Tipo_valores', Linea, Columna)
  temp_str += print_node(name, `Tipo: ${Tipo_valores}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `Tipo: ${ID}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Valores', Linea, Columna)
  temp_str += print_node(name, `Valores`)
  temp_str += link_nodes(back_node, name)

  for (let Valor of Valores) {
    let new_name = node_name('Valor', Valor.Linea, Valor.Columna)
    temp_str += print_node(new_name, `Valor`)
    temp_str += printOperacion(Valor, new_name)
    temp_str += link_nodes(name, new_name)
  }

  //TODO: Tipo_i

  return temp_str
}

const printAccesoVector = (back_node, { Linea, Columna, ID, Index }) => {
  let temp_str = '',
    name

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `ID\\n${ID}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Index', Linea, Columna)
  temp_str += print_node(name, `Índice`)
  temp_str += printOperacion(Index, name)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printAccesoLista = (back_node, { Linea, Columna, ID, Index }) => {
  let temp_str = '',
    name

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `Tipo: ${ID}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Index', Linea, Columna)
  temp_str += print_node(name, `Índice`)
  temp_str += printOperacion(Index, name)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printModificacionVector = (back_node, { Linea, Columna, ID, Index, Expresion }) => {
  let temp_str = '',
    name

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `ID\\n${ID}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Index', Linea, Columna)
  temp_str += print_node(name, `Índice`)
  temp_str += printOperacion(Index, name)
  temp_str += link_nodes(back_node, name)

  name = node_name('Expresion', Linea, Columna)
  temp_str += print_node(name, `Expresion`)
  temp_str += printOperacion(Expresion, name)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printModificacionLista = (back_node, { Linea, Columna, ID, Index, Expresion }) => {
  let temp_str = '',
    name

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `Tipo: ${ID}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Index', Linea, Columna)
  temp_str += print_node(name, `Índice`)
  temp_str += printOperacion(Index, name)
  temp_str += link_nodes(back_node, name)

  name = node_name('Expresion', Linea, Columna)
  temp_str += print_node(name, `Expresion`)
  temp_str += printOperacion(Expresion, name)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printAddLista = (back_node, { Linea, Columna, ID, Expresion }) => {
  let temp_str = '',
    name

  name = node_name('ID', Linea, Columna)
  temp_str += print_node(name, `Tipo: ${ID}`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Expresion', Linea, Columna)
  temp_str += print_node(name, `Expresion`)
  temp_str += printOperacion(Expresion, name)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printIf = (back_node, { Linea, Columna, Condicion, Instrucciones_true, Instrucciones_false }) => {
  let temp_str = '',
    name

  name = node_name('Condicion', Linea, Columna)
  temp_str += print_node(name, `Condicion`)
  temp_str += printOperacion(Condicion, name)
  temp_str += link_nodes(back_node, name)

  name = node_name('Instrucciones_true', Linea, Columna)
  temp_str += print_node(name, `Instrucciones true`)
  temp_str += printInstructions(Instrucciones_true, name)
  temp_str += link_nodes(back_node, name)

  name = node_name('Instrucciones_false', Linea, Columna)
  temp_str += print_node(name, `Instrucciones false`)
  temp_str += printInstructions(Instrucciones_false, name)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printSwitch = (back_node, { Linea, Columna, Expresion, Cases, Default }) => {
  let temp_str = '',
    name

  name = node_name('Expresion', Linea, Columna)
  temp_str += print_node(name, `Expresion`)
  temp_str += printOperacion(Expresion, name)
  temp_str += link_nodes(back_node, name)

  for (let Case of Cases) {
    name = node_name('Case', Linea, Columna)
    temp_str += print_node(name, `Case`)
    temp_str += link_nodes(back_node, name)

    let new_name = node_name('Expresion', Linea, Columna)
    temp_str += print_node(new_name, `Expresion`)
    temp_str += printOperacion(Expresion, new_name)
    temp_str += link_nodes(name, new_name)

    new_name = node_name('Instrucciones', Linea, Columna)
    temp_str += print_node(new_name, `Instrucciones`)
    temp_str += printInstructions(Case.Instrucciones, new_name)
    temp_str += link_nodes(name, new_name)
  }

  if (Default) {
    name = node_name('Default', Linea, Columna)
    temp_str += print_node(name, `Default`)
    temp_str += link_nodes(back_node, name)

    let new_name = node_name('Instrucciones', Linea, Columna)
    temp_str += print_node(new_name, `Instrucciones`)
    temp_str += printInstructions(Default.Instrucciones, name)
    temp_str += link_nodes(name, new_name)
  }

  return temp_str
}

const printWhile = (back_node, { Linea, Columna, Condicion, Instrucciones }) => {
  let temp_str = '',
    name

  name = node_name('Condicion', Linea, Columna)
  temp_str += print_node(name, `Condicion`)
  temp_str += printOperacion(Condicion, name)
  temp_str += link_nodes(back_node, name)

  name = node_name('Instrucciones', Linea, Columna)
  temp_str += print_node(name, `Instrucciones`)
  temp_str += printInstructions(Instrucciones, name)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printFor = (back_node, { Linea, Columna, Inicializacion, Condicion, Actualizacion, Instrucciones }) => {
  let temp_str = '',
    name

  name = node_name('Inicializacion', Linea, Columna)
  temp_str += print_node(name, `Tipo: Inicializacion`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Condicion', Linea, Columna)
  temp_str += print_node(name, `Tipo: Condicion`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Actualizacion', Linea, Columna)
  temp_str += print_node(name, `Tipo: Actualizacion`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Instrucciones', Linea, Columna)
  temp_str += print_node(name, `Instrucciones`)
  temp_str += link_nodes(back_node, name)
  temp_str += printInstructions(Instrucciones, name)

  return temp_str
}

const printDoWhile = (back_node, { Linea, Columna, Condicion, Instrucciones }) => {
  let temp_str = '',
    name

  name = node_name('Condicion', Linea, Columna)
  temp_str += print_node(name, `Condicion`)
  temp_str += printOperacion(Condicion, name)
  temp_str += link_nodes(back_node, name)

  name = node_name('Instrucciones', Linea, Columna)
  temp_str += print_node(name, `Instrucciones`)
  temp_str += printInstructions(Instrucciones, name)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printBreak = (back_node, { Linea, Columna }) => {
  let temp_str = '',
    name

  name = node_name('Break', Linea, Columna)
  temp_str += print_node(name, `Sentencia Break`)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printContinue = (back_node, { Linea, Columna }) => {
  let temp_str = '',
    name

  name = node_name('Continue', Linea, Columna)
  temp_str += print_node(name, `Sentencia Continue`)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

const printReturn = (back_node, { Linea, Columna, Expresion }) => {
  let temp_str = '',
    name

  name = node_name('Return', Linea, Columna)
  temp_str += print_node(name, `Sentencia Return`)
  temp_str += link_nodes(back_node, name)

  name = node_name('Expresion', Linea, Columna)
  temp_str += print_node(name, `Expresion`)
  temp_str += printOperacion(Expresion, name)
  temp_str += link_nodes(back_node, name)

  return temp_str
}

export { reportTable, graphAST }
