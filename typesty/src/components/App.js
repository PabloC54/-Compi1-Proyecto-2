import React, { useState, useRef } from "react";

import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";

import { parse } from "../Analyzer/analyzer";
import interpret from "../Analyzer/interpreter";

const App = () => {
	const [content, setContent] = useState({ number: 1, text: "{}" });
	const [tabs, setTabs] = useState({ 1: content.text });
	const [expanded, setExpanded] = useState(false);
	const [logs, setLogs] = useState([]);
	const inputFile = useRef(null);

	const handleContentChange = (editor, data, value) => {
		const c = editor.getCursor();
		setContent({ ...content, text: value });
		editor.focus();
		editor.setCursor(c);
	};

	//> New File
	const handleNewFile = () => {
		setContent({ ...content, text: "{}" });
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
		const text = fileReader.result;
		setContent({ ...content, text: text });
	};

	//> Save File
	const handleFileSave = () => {
		const element = document.createElement("a");
		const file = new Blob([content.text], {
			type: "text/plain",
		});
		element.href = URL.createObjectURL(file);
		element.download = "code.ty";
		element.click();
		handleLog("Se guardó el archivo .ty");
	};

	//> Compilar

	const handleCompile = () => {
		const temp = parse(content);
		console.log(temp);
		
		interpret(temp);
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

	//> Pestañas

	const handleDropDown = () =>
		expanded ? setExpanded(false) : setExpanded(true);

	const handleNewTab = () => {
		let i = getNumber();

		setTabs({ ...tabs, [i]: "{}" });
		setContent({ number: parseInt(i), text: "{}" });
	};

	const handleChangeTab = (i) => {
		if (parseInt(i) === content.number) return;

		setTabs({ ...tabs, [content.number]: content.text });
		setContent({ number: parseInt(i), text: tabs[i] });
	};

	const handleCloseTab = () => {
		if (Object.keys(tabs).length === 1) {
			handleLog("Únicamente hay una pestaña");
			return;
		}

		const temp = Object.keys(tabs).reduce((object, key) => {
			if (parseInt(key) !== content.number) {
				object[parseInt(key)] = tabs[key];
			}
			return object;
		}, {});

		setTabs(temp);
		setContent({ number: 1, text: tabs[1] });
	};

	const getNumber = () => {
		let i = 1;

		while (Object.keys(tabs).includes(String(i))) {
			i++;
		}
		return i;
	};

	return (
		<div className="row">
			<div id="wrap" className="col-lg-12">
				<div id="buttons">
					<div className="row">
						<div className="col-lg-3">
							<button onClick={handleNewFile}>Nuevo archivo</button>
							<input
								style={{ display: "none" }}
								type="file"
								accept=".ty"
								ref={inputFile}
								onChange={(e) => handleFileUpload(e.target.files[0])}
							/>
						</div>
						<div className="col-lg-3">
							<button onClick={handleNewTab}>Nueva pestaña</button>
						</div>
						<div className="col-lg-3">
							<button onClick={handleFileButton}>Abrir archivo</button>
						</div>
						<div className="col-lg-3">
							<button onClick={handleFileSave}>Guardar archivo</button>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-3">
							<button onClick={handleCompile}>Compilar</button>
						</div>
						<div className="col-lg-3">
							<button onClick={handleErorsReport}>Errores</button>
						</div>
						<div className="col-lg-3">
							<button onClick={handleASTReport}>AST</button>
						</div>
						<div className="col-lg-3">
							<button onClick={handleSymbolsReport}>Símbolos</button>
						</div>
					</div>
				</div>
				<div className="row">
					<div id="code" className="col-lg-7">
						<CodeMirror
							value={content.text}
							options={{
								mode: "javascript",
								theme: "dracula",
								lineNumbers: true,
								tabindex: 2,
							}}
							onChange={handleContentChange}
						/>
					</div>
					<div id="consolearea" className="col-lg-5">
						<div className="row">
							<div className="col-lg-6">
								<button onClick={handleDropDown} className="dropbtn">
									Pestañas
								</button>
								<div className={`dropdown-content ${expanded ? "show" : ""}`}>
									{Object.keys(tabs).map((index) => (
										<span
											key={index}
											className={
												parseInt(index) === content.number ? "selected-tab" : ""
											}
											onClick={() => handleChangeTab(index)}
										>
											Pestaña {index}
										</span>
									))}
								</div>
							</div>
							<div className="col-lg-6">
								<button onClick={handleCloseTab}>Cerrar pestaña</button>
							</div>
						</div>
						<div className="row">
							<div id="console" className="col-lg-12">
								<textarea
									id="logger"
									value={logs.map((log) => "> " + log + "\n").join("")}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default App;
