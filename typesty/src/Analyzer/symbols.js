const Exec = function (Llamada) {
	return {
		Instruccion: "Exec",
		Llamada,
	};
};

const Funcion = function (Tipo, ID, Parametros, Instrucciones) {
	return {
		Instruccion: "Funcion",
		Tipo,
		ID,
		Parametros,
		Instrucciones,
	};
};

const Metodo = function (ID, Parametros, Instrucciones) {
	return {
		Instruccion: "Metodo",
		Tipo: null,
		ID,
		Parametros,
		Instrucciones,
	};
};

const Parametro = function (Tipo, ID) {
	return {
		Tipo,
		ID,
	};
};

const Operacion = function (Tipo, Izquierda, Derecha) {
	return {
		Tipo,
		Izquierda,
		Derecha,
	};
};

const Simbolo = function (Tipo, Valor) {
	return {
		Tipo,
		Valor,
	};
};

const Declaracion = function (Tipo, ID, Expresion) {
	return {
		Instruccion: "Declaracion",
		Tipo,
		ID,
		Expresion,
	};
};

const Asignacion = function (ID, Expresion) {
	return {
		Instruccion: "Asignacion",
		ID,
		Expresion,
	};
};

const Ternaria = function (Condicion, Expresion_true, Expresion_false) {
	return {
		Tipo: "Ternaria",
		Condicion,
		Expresion_true,
		Expresion_false,
	};
};

const Llamada = function (ID, Parametros) {
	return {
		Instruccion: "Llamada",
		ID,
		Parametros,
	};
};

const Incremento = function (ID) {
	return {
		Instruccion: "Incremento",
		ID,
	};
};

const Decremento = function (ID) {
	return {
		Instruccion: "Decremento",
		ID,
	};
};

const Vector = function (Tipo, ID, Tipo_i, Tamaño, Valores) {
	return {
		Instruccion: "Declarar_vector",
		Tipo,
		ID,
		Tipo_i,
		Tamaño,
		Valores,
	};
};

const Lista = function (Tipo, ID) {
	return {
		Instruccion: "Declarar_lista",
		Tipo,
		ID,
	};
};

const Acceso_vector = function (ID, Index) {
	return {
		Instruccion: "Acceso_vector",
		ID,
		Index,
	};
};

const Acceso_lista = function (ID, Index) {
	return {
		Instruccion: "Acceso_lista",
		ID,
		Index,
	};
};

const Modificacion_vector = function (ID, Index, Expresion) {
	return {
		Instruccion: "Modificacion_vector",
		ID,
		Index,
		Expresion,
	};
};

const Modificacion_lista = function (ID, Index, Expresion) {
	return {
		Instruccion: "Modificacion_lista",
		ID,
		Index,
		Expresion,
	};
};

const Add_lista = function (ID, Expresion) {
	return {
		Instruccion: "Add_lista",
		ID,
		Expresion,
	};
};

const If = function (Condicion, Instrucciones_true, Instrucciones_false) {
	return {
		Instruccion: "If",
		Condicion,
		Instrucciones_true,
		Instrucciones_false,
	};
};

const Switch = function (Expresion, Cases, Default) {
	return {
		Instruccion: "Switch",
		Expresion,
		Cases,
		Default,
	};
};

const Case = function (Expresion, Instrucciones) {
	return {
		Instruccion: "Case",
		Expresion,
		Instrucciones,
	};
};

const Default = function (Instrucciones) {
	return {
		Instruccion: "Default",
		Instrucciones,
	};
};

const While = function (Condicion, Instrucciones) {
	return {
		Instruccion: "While",
		Condicion,
		Instrucciones,
	};
};

const For = function (Inicializacion, Condicion, Actualizacion, Instrucciones) {
	return {
		Instruccion: "For",
		Inicializacion,
		Condicion,
		Actualizacion,
		Instrucciones,
	};
};

const Do_while = function (Condicion, Instrucciones) {
	return {
		Instruccion: "Do-while",
		Condicion,
		Instrucciones,
	};
};

const Return = function (Expresion) {
	return {
		Instruccion: "Return",
		Expresion,
	};
};

const Break = function () {
	return {
		Instruccion: "Break",
	};
};

const Continue = function () {
	return {
		Instruccion: "Continue",
	};
};

export {
	Exec,
	Funcion,
	Metodo,
	Parametro,
	Operacion,
	Simbolo,
	Declaracion,
	Asignacion,
	Ternaria,
	Llamada,
	Incremento,
	Decremento,
	Vector,
	Lista,
	Acceso_vector,
	Acceso_lista,
	Modificacion_vector,
	Modificacion_lista,
	Add_lista,
	If,
	Switch,
	Case,
	Default,
	While,
	For,
	Do_while,
	Return,
	Break,
	Continue,
};
