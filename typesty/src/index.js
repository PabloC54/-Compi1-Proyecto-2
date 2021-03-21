import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";

import Button from "./Button/Button";
import reportWebVitals from "./reportWebVitals";
require("codemirror/mode/javascript/javascript");

ReactDOM.render(
	<React.StrictMode>
		<Button text="Crear archivo" type="Crear"></Button>
		<Button text="Abrir archivo" type="Abrir"></Button>
		<Button text="Guardar archivo" type="Guardar"></Button>
		<Button text="Generar" type="Generar"></Button>
		<CodeMirror
			value="cuerpo"
			options={{
				mode: "javascript",
				theme: "dracula",
				lineNumbers: true,
			}}
			onChange={(editor, data, value) => {}}
		></CodeMirror>
	</React.StrictMode>,
	document.getElementById("root")
);

//const fs = require("fs");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
