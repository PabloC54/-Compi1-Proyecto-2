const Exec = function (Linea, Columna, Llamada) {
  return {
    Linea,
    Columna,
    Tipo: 'Exec',
    Llamada
  }
}

const Funcion = function (Linea, Columna, Tipo_retorno, ID, Parametros, Instrucciones) {
  return {
    Linea,
    Columna,
    Tipo: 'Funcion',
    Tipo_retorno,
    ID,
    Parametros,
    Instrucciones
  }
}

const Metodo = function (Linea, Columna, ID, Parametros, Instrucciones) {
  return {
    Linea,
    Columna,
    Tipo: 'Metodo',
    Tipo_retorno: 'void',
    ID,
    Parametros,
    Instrucciones
  }
}

const Parametro = function (Linea, Columna, Tipo_variable, ID) {
  return {
    Linea,
    Columna,
    Tipo_variable,
    ID
  }
}

const Simbolo = function (Linea, Columna, Tipo, Valor) {
  return {
    Linea,
    Columna,
    Tipo,
    Valor
  }
}

const Operacion = function (Linea, Columna, Tipo, Izquierda, Derecha = null) {
  return {
    Linea,
    Columna,
    Tipo,
    Izquierda,
    Derecha
  }
}

const Ternaria = function (Linea, Columna, Condicion, Izquierda, Derecha) {
  return {
    Linea,
    Columna,
    Tipo: 'ternaria',
    Condicion,
    Izquierda,
    Derecha
  }
}

const Declaracion = function (Linea, Columna, Tipo_variable, ID, Expresion) {
  return {
    Linea,
    Columna,
    Tipo: 'Declaracion',
    Tipo_variable,
    ID,
    Expresion
  }
}

const Asignacion = function (Linea, Columna, ID, Expresion) {
  return {
    Linea,
    Columna,
    Tipo: 'Asignacion',
    ID,
    Expresion
  }
}

const Llamada = function (Linea, Columna, ID, Parametros) {
  return {
    Linea,
    Columna,
    Tipo: 'Llamada',
    ID,
    Parametros
  }
}

const Incremento = function (Linea, Columna, ID) {
  return {
    Linea,
    Columna,
    Tipo: 'Incremento',
    ID
  }
}

const Decremento = function (Linea, Columna, ID) {
  return {
    Linea,
    Columna,
    Tipo: 'Decremento',
    ID
  }
}

const Vector = function (Linea, Columna, Tipo_valores, ID, Tipo_i, Tamaño, Valores = null) {
  return {
    Linea,
    Columna,
    Tipo: 'vector',
    Tipo_valores,
    ID,
    Tipo_i,
    Tamaño,
    Valores
  }
}

const Lista = function (Linea, Columna, Tipo_valores, ID, Tipo_i, Valores = null) {
  return {
    Linea,
    Columna,
    Tipo: 'list',
    Tipo_valores,
    ID,
    Tipo_i,
    Valores
  }
}

const Acceso_vector = function (Linea, Columna, ID, Index) {
  return {
    Linea,
    Columna,
    Tipo: 'Acceso_vector',
    ID,
    Index
  }
}

const Acceso_lista = function (Linea, Columna, ID, Index) {
  return {
    Linea,
    Columna,
    Tipo: 'Acceso_lista',
    ID,
    Index
  }
}

const Modificacion_vector = function (Linea, Columna, ID, Index, Expresion) {
  return {
    Linea,
    Columna,
    Tipo: 'Modificacion_vector',
    ID,
    Index,
    Expresion
  }
}

const Modificacion_lista = function (Linea, Columna, ID, Index, Expresion) {
  return {
    Linea,
    Columna,
    Tipo: 'Modificacion_lista',
    ID,
    Index,
    Expresion
  }
}

const Add_lista = function (Linea, Columna, ID, Expresion) {
  return {
    Linea,
    Columna,
    Tipo: 'Add_lista',
    ID,
    Expresion
  }
}

const If = function (Linea, Columna, Condicion, Instrucciones_true, Instrucciones_false) {
  return {
    Linea,
    Columna,
    Tipo: 'If',
    Condicion,
    Instrucciones_true,
    Instrucciones_false
  }
}

const Switch = function (Linea, Columna, Expresion, Cases, Default) {
  return {
    Linea,
    Columna,
    Tipo: 'Switch',
    Expresion,
    Cases,
    Default
  }
}

const Case = function (Linea, Columna, Expresion, Instrucciones) {
  return {
    Linea,
    Columna,
    Expresion,
    Instrucciones
  }
}

const Default = function (Linea, Columna, Instrucciones) {
  return {
    Linea,
    Columna,
    Instrucciones
  }
}

const While = function (Linea, Columna, Condicion, Instrucciones) {
  return {
    Linea,
    Columna,
    Tipo: 'While',
    Condicion,
    Instrucciones
  }
}

const For = function (Linea, Columna, Inicializacion, Condicion, Actualizacion, Instrucciones) {
  return {
    Linea,
    Columna,
    Tipo: 'For',
    Inicializacion,
    Condicion,
    Actualizacion,
    Instrucciones
  }
}

const Do_while = function (Linea, Columna, Condicion, Instrucciones) {
  return {
    Linea,
    Columna,
    Tipo: 'Do-while',
    Condicion,
    Instrucciones
  }
}

const Return = function (Linea, Columna, Expresion = null) {
  return {
    Linea,
    Columna,
    Tipo: 'Return',
    Expresion
  }
}

const Break = function (Linea, Columna) {
  return {
    Linea,
    Columna,
    Tipo: 'Break'
  }
}

const Continue = function (Linea, Columna) {
  return {
    Linea,
    Columna,
    Tipo: 'Continue'
  }
}

module.exports = {
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
  Continue
}
