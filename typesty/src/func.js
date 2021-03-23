const Exec = function (Llamada) {
	return {
		Instruccion: "Exec",
		Llamada: Llamada,
	};
};

const Funcion = function (Tipo, ID, Parametros, Instrucciones) {
	return {
		Instruccion: "Funcion",
		Tipo: Tipo,
		ID: ID,
		Parametros: Parametros,
		Instrucciones: Instrucciones,
	};
};

const Metodo = function (ID, Parametros, Instrucciones) {
	return {
		Instruccion: "Metodo",
		Tipo: null,
		ID: ID,
		Parametros: Parametros,
		Instrucciones: Instrucciones,
	};
};

const Parametro = function (Tipo, ID) {
	return {
		Tipo: Tipo,
		ID: ID,
	};
};

const Operacion = function (Tipo, Izquierda, Derecha) {
	return {
		Tipo: Tipo,
		Izquierda: Izquierda,
		Derecha: Derecha,
	};
};

const Simbolo = function (Tipo, Valor) {
	return {
		Tipo: Tipo,
		Valor: Valor,
	};
};

const Declaracion = function (Tipo, ID, E) {
	return {
		Instruccion: "Declaracion",
		Tipo: Tipo,
		ID: ID,
		E: E,
	};
};

const Asignacion = function (ID, E) {
	return {
		Instruccion: "Asignacion",
		ID: ID,
		E: E,
	};
};

const Ternaria = function (Condicion, E_t, E_f) {
	return {
		Tipo: "Ternaria",
		Condicion: Condicion,
		E_t: E_t,
		E_f: E_f,
	};
};

const Llamada = function (ID, Parametros) {
	return {
		Instruccion: "Llamada",
		ID: ID,
		Parametros: Parametros,
	};
};

const Incremento = function (ID) {
	return {
		Instruccion: "Incremento",
		ID: ID,
	};
};

const Decremento = function (ID) {
	return {
		Instruccion: "Decremento",
		ID: ID,
	};
};

const Vector = function (Tipo, ID, Tipo_i, Tamano, Valores) {
	return {
		Instruccion: "Declarar_vector",
		Tipo: Tipo,
		ID: ID,
		Tipo_i: Tipo_i,
		Tamano: Tamano,
		Valores,
	};
};

const Lista = function (Tipo, ID) {
	return {
		Instruccion: "Declarar_lista",
		Tipo: Tipo,
		ID: ID,
	};
};

const Acceso_vector = function (ID, Index) {
	return {
		Instruccion: "Acceso_vector",
		ID: ID,
		Index: Index,
	};
};

const Acceso_lista = function (ID, Index) {
	return {
		Instruccion: "Acceso_lista",
		ID: ID,
		Index: Index,
	};
};

const Modificacion_vector = function (ID, Index, E) {
	return {
		Instruccion: "Modificacion_vector",
		ID: ID,
		Index: Index,
		E: E,
	};
};

const Modificacion_lista = function (ID, Index, E) {
	return {
		Instruccion: "Modificacion_lista",
		ID: ID,
		Index: Index,
		E: E,
	};
};

const Add_lista = function (ID, E) {
	return {
		Instruccion: "Add_lista",
		ID: ID,
		E: E,
	};
};

const If = function (Condicion, Instrucciones_t, Instrucciones_f) {
	return {
		Instruccion: "If",
		Condicion: Condicion,
		Instrucciones_t: Instrucciones_t,
		Instrucciones_f: Instrucciones_f,
	};
};

const Switch = function (E, Cases, Default) {
	return {
		Instruccion: "Switch",
		E: E,
		Cases: Cases,
		Default: Default,
	};
};

const Case = function (E, Instrucciones) {
	return {
		Instruccion: "Case",
		E: E,
		Instrucciones: Instrucciones,
	};
};

const While = function (Condicion, Instrucciones) {
	return {
		Instruccion: "While",
		Condicion: Condicion,
		Instrucciones: Instrucciones,
	};
};

const For = function (Inicializacion, Condicion, Actualizacion, Instrucciones) {
	return {
		Instruccion: "For",
		Inicializacion: Inicializacion,
		Condicion: Condicion,
		Actualizacion: Actualizacion,
		Instrucciones: Instrucciones,
	};
};

const Do_while = function (Condicion, Instrucciones) {
	return {
		Instruccion: "Do-while",
		Condicion: Condicion,
		Instrucciones: Instrucciones,
	};
};

const Return = function (E) {
	return {
		Instruccion: "Return",
		E: E,
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
