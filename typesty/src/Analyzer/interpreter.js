// TODO: Cambiar 'Instruccion' por 'Tipo'

import { Simbolo, Operacion } from "./symbols";

const pilaCiclos = [];
const pilaFunciones = [];

const Entorno = (Anterior) => {
	return {
		Simbolos: new Map(),
		Anterior,
	};
};

const interpret = (INS) => {
	const global = Entorno(null);
	return Instrucciones(INS, global);
};

const Instrucciones = (INS, env) => {
	let value;

	INS.forEach((element) => {
		switch (element.Instruccion) {
			case "Exec":
				//let result = Exec(element.Operacion, env);
				//console.log(result.Valor);
				break;
			case "Declaracion":
				value = Declaracion(element, env);
				break;
			case "Asignacion":
				value = Asignacion(element, env);
				break;
			case "Llamada":
				value = Llamada(element, env);
				break;
			case "Incremento":
				value = Incremento(element, env);
				break;
			case "Decremento":
				value = Decremento(element, env);
				break;
			case "Declarar_vector":
				value = DeclararVector(element, env);
				break;
			case "Declarar_lista":
				value = DeclararLista(element, env);
				break;
			case "Modificacion_vector":
				value = ModificacionVector(element, env);
				break;
			case "Modificacion_lista":
				value = ModificacionLista(element, env);
				break;
			case "Add_lista":
				value = AddLista(element, env);
				break;
			case "If":
				value = If(element, env);
				break;
			case "Switch":
				value = Switch(element, env);
				break;
			case "While":
				value = While(element, env);
				break;
			case "For":
				value = For(element, env);
				break;
			case "Do_while":
				value = DoWhile(element, env);
				break;
			case "Return":
				if (pilaFunciones.length > 0) {
					value = element.Expresion;
				} else {
					console.log("Intruccion retorno fuera de una funcion");
				}
				break;
			case "Break":
				if (pilaCiclos.length > 0) {
					return element;
				} else {
					console.log("Intruccion romper fuera de un ciclo");
				}
				break;
			case "Continue":
				if (pilaCiclos.length > 0) {
					return element;
				} else {
					console.log("Intruccion continue fuera de un ciclo");
				}
				break;
			default:
				return null;
		}

		return value;
	});
};

const Exec = (content, env) => {};

const Evaluar = (Operacion, env) => {
	const Valores_retorno = {
		suma: {
			int: {
				int: "int",
				double: "double",
				boolean: "int",
				char: "int",
				string: "string",
			},
			double: {
				int: "double",
				double: "double",
				boolean: "double",
				char: "double",
				string: "string",
			},
			boolean: {
				int: "int",
				double: "double",
				string: "string",
			},
			char: {
				int: "int",
				double: "double",
				char: "string",
				string: "string",
			},
			string: {
				int: "string",
				double: "string",
				boolean: "string",
				char: "string",
				string: "string",
			},
		},
		resta: {
			int: {
				int: "int",
				double: "double",
				boolean: "int",
				char: "int",
			},
			double: {
				int: "double",
				double: "double",
				boolean: "double",
				char: "double",
			},
			boolean: {
				int: "int",
				double: "double",
			},
			char: {
				int: "int",
				double: "double",
			},
			string: {},
		},
		multiplicacion: {
			int: {
				int: "int",
				double: "double",
				char: "int",
			},
			double: {
				int: "double",
				double: "double",
				char: "double",
			},
			boolean: {},
			char: {
				int: "int",
				double: "double",
			},
			string: {},
		},
		division: {
			int: {
				int: "double",
				double: "double",
				char: "double",
			},
			double: {
				int: "double",
				double: "double",
				char: "double",
			},
			boolean: {},
			char: {
				int: "double",
				double: "double",
			},
			string: {},
		},
		potencia: {
			int: {
				int: "int",
				double: "double",
			},
			double: {
				int: "double",
				double: "double",
			},
			boolean: {},
			char: {},
			string: {},
		},
		modulo: {
			int: {
				int: "double",
				double: "double",
			},
			double: {
				int: "double",
				double: "double",
			},
			boolean: {},
			char: {},
			string: {},
		},
		negacion: {
			int: "int",
			double: "double",
			boolean: {},
			char: {},
			string: {},
		},
		igualacion: {
			int: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			double: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			boolean: {
				boolean: "boolean",
			},
			char: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			string: {
				string: "boolean",
			},
		},
		diferenciacion: {
			int: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			double: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			boolean: {
				boolean: "boolean",
			},
			char: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			string: {
				string: "boolean",
			},
		},
		menor: {
			int: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			double: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			boolean: {
				boolean: "boolean",
			},
			char: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			string: {
				string: "boolean",
			},
		},
		menorigual: {
			int: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			double: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			boolean: {
				boolean: "boolean",
			},
			char: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			string: {
				string: "boolean",
			},
		},
		mayor: {
			int: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			double: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			boolean: {
				boolean: "boolean",
			},
			char: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			string: {
				string: "boolean",
			},
		},
		mayorigual: {
			int: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			double: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			boolean: {
				boolean: "boolean",
			},
			char: {
				int: "boolean",
				double: "boolean",
				char: "boolean",
			},
			string: {
				string: "boolean",
			},
		},
		or: {
			int: {
				int: "int",
				double: "double",
				boolean: "int",
				char: "int",
				string: "string",
			},
			double: {
				int: "double",
				double: "double",
				boolean: "double",
				char: "double",
				string: "string",
			},
			boolean: {
				int: "int",
				double: "double",
				boolean: "double",
				char: "double",
				string: "string",
			},
			char: {
				int: "int",
				double: "double",
				boolean: "double",
				char: "string",
				string: "string",
			},
			string: {
				int: "string",
				double: "string",
				boolean: "string",
				char: "string",
				string: "string",
			},
		},
		and: {
			int: {
				int: "int",
				double: "double",
				boolean: "int",
				char: "int",
				string: "string",
			},
			double: {
				int: "double",
				double: "double",
				boolean: "double",
				char: "double",
				string: "string",
			},
			boolean: {
				int: "int",
				double: "double",
				boolean: "double",
				char: "double",
				string: "string",
			},
			char: {
				int: "int",
				double: "double",
				boolean: "double",
				char: "string",
				string: "string",
			},
			string: {
				int: "string",
				double: "string",
				boolean: "string",
				char: "string",
				string: "string",
			},
		},
		not: {
			int: {
				int: "int",
				double: "double",
				boolean: "int",
				char: "int",
				string: "string",
			},
			double: {
				int: "double",
				double: "double",
				boolean: "double",
				char: "double",
				string: "string",
			},
			boolean: {
				int: "int",
				double: "double",
				boolean: "double",
				char: "double",
				string: "string",
			},
			char: {
				int: "int",
				double: "double",
				boolean: "double",
				char: "string",
				string: "string",
			},
			string: {
				int: "string",
				double: "string",
				boolean: "string",
				char: "string",
				string: "string",
			},
		},
		new: {
			int: {
				int: "int",
				double: "double",
				boolean: "int",
				char: "int",
				string: "string",
			},
			double: {
				int: "double",
				double: "double",
				boolean: "double",
				char: "double",
				string: "string",
			},
			boolean: {
				int: "int",
				double: "double",
				boolean: "double",
				char: "double",
				string: "string",
			},
			char: {
				int: "int",
				double: "double",
				boolean: "double",
				char: "string",
				string: "string",
			},
			string: {
				int: "string",
				double: "string",
				boolean: "string",
				char: "string",
				string: "string",
			},
		},
	};

	switch (Operacion.Tipo) {
		case "int":
			return Simbolo(Operacion.Tipo, parseInt(Operacion.Izquierda));
		case "double":
			return Simbolo(Operacion.Tipo, parseFloat(Operacion.Izquierda));
		case "char":
			return Simbolo(Operacion.Tipo, Operacion.Izquierda);
		case "string":
			return Simbolo(Operacion.Tipo, Operacion.Izquierda);
		case "boolean":
			return Simbolo(Operacion.Tipo, Boolean(Operacion.Izquierda));
		case "id":
			let temp = env;
			while (temp) {
				if (temp.Simbolos.has(Operacion.Izquierda)) {
					let valorID = temp.Simbolos.get(Operacion.Izquierda);
					return Simbolo(valorID.Tipo, valorID.Izquierda); // FIXME:
				}
				temp = temp.Anterior;
			}
			console.log(`No existe la variable '${Operacion.Izquierda}`);
			return Simbolo("error", "@error@");
		case "Llamada":
			return Llamada(Operacion, env);
		case "Acceso_vector":
			return Llamada(Operacion, env);
		case "Acceso_lista":
			return Llamada(Operacion, env);

		default:
	}

	let Izquierda = Evaluar(Operacion.Izquierda, env);
	let Derecha = Operacion.Derecha ? Evaluar(Operacion.Derecha, env) : null;

	let tipoRetorno =
		Valores_retorno[Operacion.Tipo][Izquierda.Tipo][Derecha.Tipo] || "error";

	if (tipoRetorno === "error") {
		console.log(
			`No se puede operar '${Operacion.Tipo}' con '${Izquierda.Tipo}' y '${Derecha.Tipo}'`
		);
		return;
	}

	switch (Operacion.Tipo) {
		case "suma":
			return Simbolo(tipoRetorno, Izquierda.Valor + Derecha.Valor);
		case "resta":
			return Simbolo(tipoRetorno, Izquierda.Valor - Derecha.Valor, tipoRetorno);
		case "negacion":
			return Simbolo(tipoRetorno, -Izquierda.Valor);
		case "multiplicacion":
			return Simbolo(tipoRetorno, Izquierda.Valor * Derecha.Valor);
		case "division":
			return Simbolo(tipoRetorno, Izquierda.Valor / Derecha.Valor);
		case "modulo":
			return Simbolo(Izquierda.Valor % Derecha.Valor, tipoRetorno);
		case "not":
			switch (tipoRetorno) {
				case "boolean":
					return Simbolo(!Izquierda.Valor, tipoRetorno);
			}
		case "and":
			switch (tipoRetorno) {
				case "boolean":
					return Simbolo(Izquierda.Valor && Derecha.Valor, tipoRetorno);
			}
		case "or":
			switch (tipoRetorno) {
				case "boolean":
					return Simbolo(Izquierda.Valor || Derecha.Valor, tipoRetorno);
			}
		case ">":
			switch (tipoRetorno) {
				case "string":
				case "int":
				case "boolean":
					return Simbolo(Izquierda.Valor > Derecha.Valor, "boolean");
			}
		case "<":
			switch (tipoRetorno) {
				case "string":
				case "int":
				case "boolean":
					return Simbolo(Izquierda.Valor < Derecha.Valor, "boolean");
			}
		case ">=":
			switch (tipoRetorno) {
				case "string":
				case "int":
				case "boolean":
					return Simbolo(Izquierda.Valor >= Derecha.Valor, "boolean");
			}
		case "<=":
			switch (tipoRetorno) {
				case "string":
				case "int":
				case "boolean":
					return Simbolo(Izquierda.Valor <= Derecha.Valor, "boolean");
			}
		case "==":
			switch (tipoRetorno) {
				case "string":
				case "int":
				case "boolean":
					return Simbolo(Izquierda.Valor == Derecha.Valor, "boolean");
			}
		case "!=":
			switch (tipoRetorno) {
				case "string":
				case "int":
				case "boolean":
					return Simbolo(Izquierda.Valor != Derecha.Valor, "boolean");
			}
		default:
	}
	console.log(
		"Tipos incompatibles " +
			(Izquierda ? Izquierda.Tipo : "") +
			" y " +
			(Derecha ? Derecha.Tipo : "")
	);
	return Simbolo("@error@", "error");
};

const Declaracion = (content, env) => {
	if (env.Simbolos.has(content.ID)) {
		console.log(`La variable ${content.ID} ya ha sido declarada`);
		return;
	}

	let valor;

	if (content.Expresion) {
		valor = Evaluar(content.Expresion, env);
		if (valor.Tipo !== content.Tipo) {
			console.log(
				`El tipo de la variable '${content.ID}' no coincide con el valor declarado`
			);
			return;
		}
	} else
		switch (content.Tipo) {
			case "int":
				valor = Simbolo(content.Tipo, 0);
				break;
			case "double":
				valor = Simbolo(content.Tipo, 0.0);
				break;
			case "boolean":
				valor = Simbolo(content.Tipo, true);
				break;
			case "char":
				valor = Simbolo(content.Tipo, "\u0000");
				break;
			case "string":
				valor = Simbolo(content.Tipo, "");
				break;
			default:
		}

	env.Simbolos.set(content.ID, valor);
};

const Asignacion = (content, env) => {
	let valor = Evaluar(content.Expresion, env);
	let env_temp = env;

	while (env_temp) {
		if (!env_temp.Simbolos.has(content.ID)) {
			env_temp = env_temp.Anterior;
			continue;
		}

		let actual = env_temp.Simbolos.get(content.ID);

		if (actual.Tipo !== valor.Tipo) {
			console.log(
				`No se puede asignar un valor ${valor.Tipo} a '${content.ID}'`
			);
			return;
		}

		env_temp.Simbolos.set(content.ID, valor);
		return;
	}
	console.log("No se encontro la variable ", content.ID);
};

const Llamada = (content, env) => {
	let nombrefuncion = content.ID + "$";
	let Resueltos = [];
	for (let param of content.Params) {
		let valor = Evaluar(param, env);
		nombrefuncion += valor.Tipo;
		Resueltos.push(valor);
	}
	let temp = env;
	let simboloFuncion = null;
	while (temp != null) {
		if (temp.Simbolos.has(nombrefuncion)) {
			// evaluar el resultado de la expresión
			simboloFuncion = temp.Simbolos.get(nombrefuncion);
			break;
		}
		temp = temp.Anterior;
	}
	if (!simboloFuncion) {
		console.log(
			"No se encontró la funcion " +
				content.ID +
				" con esa combinacion de parametros"
		);
		return Simbolo("@error@", "error");
	}
	pilaFunciones.push(content.ID);
	let nuevo = Entorno(global);
	let index = 0;
	for (let crear of simboloFuncion.Parametros) {
		crear.Expresion = Resueltos[index];
		Declaracion(crear, nuevo);
		index++;
	}
	let retorno = Simbolo("@error@", "error");
	let result = Instrucciones(simboloFuncion.Instrucciones, nuevo);
	if (result) {
		if (result.Tipo === "void") {
			if (simboloFuncion.Tipo !== "void") {
				console.log("No se esperaba un retorno");
				retorno = Simbolo("@error@", "error");
			} else {
				retorno = Simbolo("@vacio@", "vacio");
			}
		} else {
			let exp = Evaluar(result, nuevo);
			if (exp.Tipo !== simboloFuncion.Tipo) {
				console.log("El tipo del retorno no coincide");
				retorno = Simbolo("@error@", "error");
			} else {
				retorno = exp;
			}
		}
	} else {
		if (simboloFuncion.Tipo != "void") {
			console.log("Se esperaba un retorno");
			retorno = Simbolo("@error@", "error");
		} else {
			retorno = Simbolo("@vacio@", "vacio");
		}
	}
	pilaFunciones.pop();
	return retorno;
};

const Incremento = (content, env) => {};

const Decremento = (content, env) => {};

const DeclararVector = (content, env) => {};

const DeclararLista = (content, env) => {};

const ModificacionVector = (content, env) => {};

const ModificacionLista = (content, env) => {};

const AddLista = (content, env) => {};

const If = (content, env) => {
	let result = Evaluar(content.Condicion, env);

	if (result.Tipo !== "boolean") {
		console.log("Se esperaba una condicion dentro del if");
		return;
	}

	let nuevo = Entorno(env);

	if (result.Valor) {
		return Instrucciones(content.Instrucciones_true, nuevo);
	} else if (content.Instrucciones_false) {
		return Instrucciones(content.Instrucciones_false, nuevo);
	}
};

const Switch = (content, env) => {
	pilaCiclos.push("switch");

	let ejecutado = false;
	let nuevo = Entorno(env);

	content.Cases.forEach((Case) => {
		let condicion = Evaluar(
			Operacion("igualacion", content.Expresion, Case.Expresion),
			env
		);

		if (condicion.Tipo !== "boolean") {
			pilaCiclos.pop();
			return;
		}

		if (condicion.Valor || ejecutado) {
			ejecutado = true;
			let result = Instrucciones(Case.Instrucciones, nuevo);
			if (result) {
				pilaCiclos.pop();

				if (result.Instruccion === "Break") return result;
				return;
			}
		}

		if (content.Default && !ejecutado) {
			Instrucciones(content.Default.Instrucciones, nuevo);
		}
		pilaCiclos.pop();
		return;
	});
};

const While = (content, env) => {
	pilaCiclos.push("while");
	let nuevo = Entorno(env);

	while (true) {
		let condicion = Evaluar(content.Condicion, env);

		if (condicion.Tipo !== "boolean") {
			console.log("Se esperaba una condicion dentro del Mientras");
			pilaCiclos.pop();
			return;
		}

		if (condicion.Valor) {
			let result = Instrucciones(content.Instrucciones, nuevo);
			if (result) {
				pilaCiclos.pop();

				if (result.Instruccion === "Break") return;
				//return result;
			}
		} else {
			return;
		}
	}
};

const For = (content, env) => {
	pilaCiclos.push("for");
	let nuevo = Entorno(env);

	if (content.Inicializacion.Instruccion === "Declaracion")
		Declaracion(content.Inicializacion, nuevo);
	else Asignacion(content.Inicializacion, nuevo);

	//mientras no se llegue al hasta
	let paso = Evaluar(content.Actualizacion, env);
	let hasta = Evaluar(content.Condicion, env);
	let simbolo = Simbolo(content.ExpDesde.ID, "ID");
	if (!(paso.Tipo === "int" && hasta.Tipo == "int")) {
		pilaCiclos.pop();
		console.log("Se esperaban valores numericos en el Desde");
		return;
	}
	while (true) {
		let inicio = Evaluar(simbolo, nuevo);
		if (inicio.Tipo != "int") {
			pilaCiclos.pop();
			console.log("Se esperabam valores numericos en el Desde");
			return;
		}
		if (paso.Valor > 0) {
			if (inicio.Valor <= hasta.Valor) {
				let result = Instrucciones(content.Instrucciones, nuevo);
				if (result && result.Instruccion == "romper") {
					break;
				} else if (result) {
					pilaCiclos.pop();
					return result;
				}
			} else {
				break;
			}
		} else {
			if (inicio.Valor >= hasta.Valor) {
				let result = Instrucciones(content.Instrucciones, nuevo);
				if (result && result.Instruccion == "romper") {
					break;
				}
			} else {
				break;
			}
		}
		Asignacion(
			Asignacion(content.ExpDesde.ID, Operacion(simbolo, paso, "+")),
			nuevo
		);
	}
	pilaCiclos.pop();
	return;
};

const DoWhile = (content, env) => {
	pilaCiclos.push("do-while");
	let nuevo = Entorno(env);

	while (true) {
		let condicion = Evaluar(content.Condicion, env);

		if (condicion.Tipo !== "boolean") {
			console.log("Se esperaba una condicion dentro del do-while");
			pilaCiclos.pop();
			return;
		}

		if (condicion.Valor) {
			let result = Instrucciones(content.Instrucciones, nuevo);
			if (result) {
				pilaCiclos.pop();

				if (result.Instruccion === "Break") return;
				//return result;
			}
		} else {
			return;
		}
	}
};

const Funcion = (content, env) => {
	let nombrefuncion = "$" + content.ID;
	content.Parametros.forEach((Parametro) => (nombrefuncion += Parametro.Tipo));

	if (env.Simbolos.has(nombrefuncion)) {
		console.log("La funcion ", content.ID, " ya ha sido declarada");
		return;
	}

	env.Simbolos.set(nombrefuncion, content);
};

export default interpret;
