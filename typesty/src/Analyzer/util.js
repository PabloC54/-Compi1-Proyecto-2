const report = (name, table) => {
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

		.container th h1 {
			font-weight: bold;
			font-size: 1em;
			text-align: left;
			color: #185875;
		}

		.container td {
			font-weight: normal;
			font-size: 1em;
			-webkit-box-shadow: 0 2px 2px -2px #0e1119;
			-moz-box-shadow: 0 2px 2px -2px #0e1119;
			box-shadow: 0 2px 2px -2px #0e1119;
		}

		.container {
			text-align: left;
			overflow: hidden;
			width: 80%;
			margin: 0 auto;
			display: table;
			padding: 0 0 8em 0;
		}

		.container td,
		.container th {
			padding-bottom: 2%;
			padding-top: 2%;
			padding-left: 2%;
		}

		/* Background-color of the odd rows */
		.container tr:nth-child(odd) {
			background-color: #323c50;
		}

		/* Background-color of the even rows */
		.container tr:nth-child(even) {
			background-color: #2c3446;
		}

		.container th {
			background-color: #1f2739;
		}

		.container td:first-child {
			color: #fb667a;
		}

		.container tr:hover {
			background-color: #464a52;
			-webkit-box-shadow: 0 6px 6px -6px #0e1119;
			-moz-box-shadow: 0 6px 6px -6px #0e1119;
			box-shadow: 0 6px 6px -6px #0e1119;
		}

		.container td:hover {
			background-color: #fff842;
			color: #403e10;
			font-weight: bold;

			box-shadow: #7f7c21 -1px 1px, #7f7c21 -2px 2px, #7f7c21 -3px 3px,
				#7f7c21 -4px 4px, #7f7c21 -5px 5px, #7f7c21 -6px 6px;
			transform: translate3d(6px, -6px, 0);

			transition-delay: 0s;
			transition-duration: 0.4s;
			transition-property: all;
			transition-timing-function: line;
		}

		@media (max-width: 800px) {
			.container td:nth-child(4),
			.container th:nth-child(4) {
				display: none;
			}
		}
  </style>
  </head>
  <body>`

  html_file += `<table class='container'>
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

		${printNodes(parsed, '')}
	}`

  //let command = 'dot -Tpng ' + name + '.dot -o ' + name + '.png'
  //Runtime.getRuntime().exec(command)
}

const printNodes = (nodes, index) => {
  let temp_str = ''

  for (let node of nodes) {
    if (!nodes) {
      return temp_str
    }

    temp_str += `node_${index} [fontsize=13 fontname = "helvetica" label="${nodes.Tipo}"];\n`

    if (!nodes.left) temp_str += `node_${index} -> node_${index + 1};\n`
  }
  return temp_str + printNodes(nodes.left, index + 1) + printNodes(nodes.right, index + 1)
}

export { report, graphAST }
