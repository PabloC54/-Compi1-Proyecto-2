import React, { useState, useRef } from "react";

import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
//import "./Analyzer/";

// TODO: multiples CodeMirror, tal vez se puede lograr con useState en array de CodeMirror

const App = () => {
	const [content, setContent] = useState("{}");
	const [logs, setLogs] = useState([]);
	const inputFile = useRef(null);

	//> New File
	const handleNewFile = () => {
		setContent("");
		handleLog("Nuevo archivo .ty");
	};

	const handleFileButton = () => {
		inputFile.current.click();
	};

	//> Open File
	let fileReader;

	const handleFileUpload = (file) => {
		fileReader = new FileReader();
		fileReader.onloadend = handleFileRead;
		fileReader.readAsText(file);
		handleLog("Se abrió '" + file.name + "'");
	};

	const handleFileRead = () => {
		const content = fileReader.result;
		setContent(content);
	};

	//> Save File
	const handleFileSave = () => {
		const element = document.createElement("a");
		const file = new Blob([content], {
			type: "text/plain",
		});
		element.href = URL.createObjectURL(file);
		element.download = "code.ty";
		element.click();
		handleLog("Se guardó el archivo .ty");
	};

	//> Compilar

	const handleCompile = () => {
		handleLog("Se compiló el lenguaje");
	};

	//> Reporte AST

	const handleASTReport = () => {
		handleLog("$report");
	};

	//> Reporte de errores

	const handleErorsReport = () => {
		handleLog("$report");
	};

	//> Tabla de símbolos

	const handleSymbolsReport = () => {
		handleLog("$report");
	};

	//> Consola

	const handleLog = (msg) => {
		setLogs(logs.concat(msg));
		document.getElementById("logger").scrollTop = document.getElementById(
			"logger"
		).scrollHeight;
	};

	return (
		<div id="wrap">
			<div id="buttons">
				<button onClick={handleNewFile}>Nuevo archivo</button>
				<input
					style={{ display: "none" }}
					type="file"
					accept=".ty"
					ref={inputFile}
					onChange={(e) => handleFileUpload(e.target.files[0])}
				/>
				<button onClick={handleFileButton}>Abrir archivo</button>
				<button onClick={handleFileSave}>Guardar archivo</button>
				<button onClick={handleCompile}>Compilar</button>
				<button onClick={handleErorsReport}>Reporte de errores</button>
				<button onClick={handleASTReport}>Reporte AST</button>
				<button onClick={handleSymbolsReport}>Reporte símbolos</button>
			</div>
			<div id="code">
				<CodeMirror
					value={content}
					options={{
						mode: "javascript",
						theme: "dracula",
						lineNumbers: true,
						tabindex: 4,
					}}
					onChange={(editor, data, value) => {
						const c = editor.getCursor();
						setContent(value);
						editor.focus();
						editor.setCursor(c);
					}}
				/>
			</div>
			<div id="console">
				<textarea
					id="logger"
					value={logs.map((log) => "> " + log + "\n").join("")}
				/>
			</div>
		</div>
	);
};

export default App;
