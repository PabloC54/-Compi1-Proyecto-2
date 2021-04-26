/* eslint-disable no-fallthrough */
//               TODO:
// - Acceso a vectores y listas
// - Incrementos y decrementos en expresiones
// - Operaciones entre char y numeros
// - Casteos
// - Pruebas de vectores y listas
// - CASCADA DE RETORNOS FIXME:
// - IGUALACION DE SWITCH CASE FIXME:
// - FOR FIXME:
// - retorno default de valor
// - pruebas de break y continue
// - asignacion de valor a lista por expresion (toCharArray)

// - llamadas con parametros omitidos

import s from './symbols.js'

// ===================> CORE <========================

const reserved_functions = {
  print: (values) => {
    let temp = ''
    values.forEach((value) => {
      if (['int', 'double', 'string', 'char', 'boolean'].includes(value.Tipo)) temp += value.Valor + ' '
      else temp += `[${value.Valores.map((temp) => temp.Valor)}]`
    })

    to_print.push(temp)
  },
  tolower: (values) => {
    if (values.length !== 1)
      return Error(values[0].Linea, values[0].Columna, `La función 'toLower' únicamente recibe un parámetro`)
    if (values[0].Tipo !== 'string')
      return Error(values[0].Linea, values[0].Columna, `La función 'toLower' únicamente recibe cadenas`)

    let symbol = values[0]
    symbol.Valor = symbol.Valor.toLowerCase()
    return values[0]
  },
  toupper: (values) => {
    if (values.length > 1) return Error(values[0].Linea, values[0].Columna, `La función 'toUpper' únicamente recibe un parámetro`)
    if (values[0].Tipo !== 'string')
      return Error(values[0].Linea, values[0].Columna, `La función 'toUpper' únicamente recibe cadenas`)

    let symbol = values[0]
    symbol.Valor = symbol.Valor.toUpperCase()
    return values[0]
  },
  length: (values) => {
    if (values.length > 1) return Error(values[0].Linea, values[0].Columna, `La función 'Length' únicamente recibe un parámetro`)
    if (!['string', 'vector', 'list'].includes(values[0].Tipo))
      return Error(values[0].Linea, values[0].Columna, `La función 'Length' únicamente recibe cadenas, vectores o listas`)

    let symbol = values[0]
    let size = !['vector', 'list'].includes(symbol.Tipo) ? symbol.Valor.length : symbol.Valores.length
    return s.Simbolo(symbol.Linea, symbol.Columna, 'int', size)
  },
  truncate: (values) => {
    if (values.length > 1)
      return Error(values[0].Linea, values[0].Columna, `La función 'Truncate' únicamente recibe un parámetro`)
    if (!['int', 'double'].includes(values[0].Tipo))
      return Error(values[0].Linea, values[0].Columna, `La función 'Truncate' únicamente recibe números`)

    let symbol = values[0]
    symbol.Valor = Math.floor(symbol.Valor)
    return symbol
  },
  round: (values) => {
    if (values.length > 1) return Error(values[0].Linea, values[0].Columna, `La función 'Round' únicamente recibe un parámetro`)
    if (!['int', 'double'].includes(values[0].Tipo))
      return Error(values[0].Linea, values[0].Columna, `La función 'Round' únicamente recibe números`)

    let symbol = values[0]
    symbol.Valor = Math.round(symbol.Valor)
    return symbol
  },
  typeof: (values) => {
    if (values.length > 1) return Error(values[0].Linea, values[0].Columna, `La función 'TypeOf' solo recibe un parámetro`)

    let symbol = values[0]
    return s.Simbolo(symbol.Linea, symbol.Linea, 'string', symbol.Tipo)
  },
  tostring: (values) => {
    if (values.length > 1) return Error(values[0].Linea, values[0].Columna, `La función 'toString' solo recibe un parámetro`)

    let symbol = values[0]
    let str = !['vector', 'list'].includes(symbol.Tipo)
      ? symbol.Valor.toString()
      : `[${symbol.Valores.map((temp) => temp.Valor)}]`
    return s.Simbolo(symbol.Linea, symbol.Columna, 'string', str)
  },
  tochararray: (values) => {
    if (values.length > 1) return Error(values[0].Linea, values[0].Columna, `La función 'toCharArray' solo recibe un parámetro`)
    if (values[0].Tipo !== 'string')
      return Error(values[0].Linea, values[0].Columna, `La función 'toCharArray' únicamente recibe cadenas`)

    let symbol = values[0]
    return s.Lista(symbol.Linea, symbol.Columna, 'char', '', 'char', symbol.Valores.split(''))
  }
}

const default_values = {
  int: 0,
  double: 0.0,
  boolean: true,
  char: '\u0000',
  string: ''
}

const operation_result = {
  suma: {
    int: {
      int: 'int',
      double: 'double',
      boolean: 'int',
      char: 'int',
      string: 'string'
    },
    double: {
      int: 'double',
      double: 'double',
      boolean: 'double',
      char: 'double',
      string: 'string'
    },
    boolean: {
      int: 'int',
      double: 'double',
      string: 'string'
    },
    char: {
      int: 'int',
      double: 'double',
      char: 'string',
      string: 'string'
    },
    string: {
      int: 'string',
      double: 'string',
      boolean: 'string',
      char: 'string',
      string: 'string'
    }
  },
  resta: {
    int: {
      int: 'int',
      double: 'double',
      boolean: 'int',
      char: 'int'
    },
    double: {
      int: 'double',
      double: 'double',
      boolean: 'double',
      char: 'double'
    },
    boolean: {
      int: 'int',
      double: 'double'
    },
    char: {
      int: 'int',
      double: 'double'
    },
    string: {}
  },
  multiplicacion: {
    int: {
      int: 'int',
      double: 'double',
      char: 'int'
    },
    double: {
      int: 'double',
      double: 'double',
      char: 'double'
    },
    boolean: {},
    char: {
      int: 'int',
      double: 'double'
    },
    string: {}
  },
  division: {
    int: {
      int: 'double',
      double: 'double',
      char: 'double'
    },
    double: {
      int: 'double',
      double: 'double',
      char: 'double'
    },
    boolean: {},
    char: {
      int: 'double',
      double: 'double'
    },
    string: {}
  },
  potencia: {
    int: {
      int: 'int',
      double: 'double'
    },
    double: {
      int: 'double',
      double: 'double'
    },
    boolean: {},
    char: {},
    string: {}
  },
  modulo: {
    int: {
      int: 'double',
      double: 'double'
    },
    double: {
      int: 'double',
      double: 'double'
    },
    boolean: {},
    char: {},
    string: {}
  },
  igualacion: {
    int: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    double: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    boolean: {
      boolean: 'boolean'
    },
    char: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    string: {
      string: 'boolean'
    }
  },
  diferenciacion: {
    int: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    double: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    boolean: {
      boolean: 'boolean'
    },
    char: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    string: {
      string: 'boolean'
    }
  },
  menor: {
    int: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    double: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    boolean: {
      boolean: 'boolean'
    },
    char: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    string: {
      string: 'boolean'
    }
  },
  menorigual: {
    int: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    double: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    boolean: {
      boolean: 'boolean'
    },
    char: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    string: {
      string: 'boolean'
    }
  },
  mayor: {
    int: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    double: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    boolean: {
      boolean: 'boolean'
    },
    char: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    string: {
      string: 'boolean'
    }
  },
  mayorigual: {
    int: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    double: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    boolean: {
      boolean: 'boolean'
    },
    char: {
      int: 'boolean',
      double: 'boolean',
      char: 'boolean'
    },
    string: {
      string: 'boolean'
    }
  },
  or: {
    int: {
      int: 'int',
      double: 'double',
      boolean: 'int',
      char: 'int',
      string: 'string'
    },
    double: {
      int: 'double',
      double: 'double',
      boolean: 'double',
      char: 'double',
      string: 'string'
    },
    boolean: {
      int: 'int',
      double: 'double',
      boolean: 'double',
      char: 'double',
      string: 'string'
    },
    char: {
      int: 'int',
      double: 'double',
      boolean: 'double',
      char: 'string',
      string: 'string'
    },
    string: {
      int: 'string',
      double: 'string',
      boolean: 'string',
      char: 'string',
      string: 'string'
    }
  },
  and: {
    int: {
      int: 'boolean',
      double: 'boolean',
      boolean: 'boolean',
      char: 'boolean',
      string: 'boolean'
    },
    double: {
      int: 'boolean',
      double: 'boolean',
      boolean: 'boolean',
      char: 'boolean',
      string: 'boolean'
    },
    boolean: {
      int: 'boolean',
      double: 'boolean',
      boolean: 'boolean',
      char: 'boolean',
      string: 'boolean'
    },
    char: {
      int: 'boolean',
      double: 'boolean',
      boolean: 'boolean',
      char: 'boolean',
      string: 'boolean'
    },
    string: {
      int: 'boolean',
      double: 'boolean',
      boolean: 'boolean',
      char: 'boolean',
      string: 'boolean'
    }
  },
  casteo: {
    int: {
      int: 'int',
      double: 'int',
      char: 'int'
    },
    double: {
      int: 'double',
      double: 'double',
      char: 'double'
    },
    boolean: {
      boolean: 'boolean'
    },
    char: {
      int: 'char',
      char: 'char'
    },
    string: {
      int: 'string',
      double: 'string',
      string: 'string'
    }
  }
}

const unary_operation_result = {
  negacion: {
    int: 'int',
    double: 'double'
  },
  not: {
    int: 'boolean',
    double: 'boolean',
    boolean: 'boolean',
    char: 'boolean',
    string: 'boolean'
  },
  incremento: {
    int: 'int',
    double: 'double'
  },
  decremento: {
    int: 'int',
    double: 'double'
  }
}

const operations = {
  suma: (izq, der) => izq.Valor + der.Valor,
  resta: (izq, der) => izq.Valor - der.Valor,
  multiplicacion: (izq, der) => izq.Valor * der.Valor,
  division: (izq, der) => izq.Valor / der.Valor,
  potencia: (izq, der) => izq.Valor ** der.Valor,
  modulo: (izq, der) => izq.Valor % der.Valor,
  negacion: (izq, _der) => -izq.Valor,
  mayor: (izq, der) => izq.Valor > der.Valor,
  menor: (izq, der) => izq.Valor < der.Valor,
  mayorigual: (izq, der) => izq.Valor >= der.Valor,
  menorigual: (izq, der) => izq.Valor <= der.Valor,
  igualacion: (izq, der) => izq.Valor === der.Valor,
  diferenciacion: (izq, der) => izq.Valor !== der.Valor,
  not: (izq, _der) => !izq.Valor,
  and: (izq, der) => izq.Valor && der.Valor,
  or: (izq, der) => izq.Valor || der.Valor,
  casteo: (izq, der) => {
    switch (izq.Valor) {
      case 'int':
        return parseInt(der.Valor)
      case 'double':
        return parseFloat(der.Valor)
      case 'string':
        return String(der.Valor)
      case 'char':
        return String(der.Valor)
      default:
    }
  },
  incremento: (izq, _der) => izq.Valor + 1,
  decremento: (izq, _der) => izq.Valor - 1
}

// ===================> CORE <========================

const to_print = [],
  errors = [],
  symbols = []

const Error = function (Linea, Columna, Mensaje) {
  errors.push({ Linea, Columna, Tipo: 'Semántico', Mensaje })
}

const getErrors = () => {
  return [...errors]
}

const getSymbols = () => {
  if (!symbols.length)
    for (let env of environments) {
      for (let [id, value] of Object.entries(env.Simbolos)) {
        if (value.Tipo_retorno)
          symbols.push([value.Linea, value.Columna, env.ID, value.Tipo, value.Tipo_retorno || 'void', value.ID])
        else symbols.push([value.Linea, value.Columna, env.ID, 'Variable', value.Tipo, id])
      }
    }

  return [...symbols]
}

const getPrinted = () => {
  return [...to_print]
}

const cycles = [],
  functions = [],
  environments = []

const Environment = (ID = 'global', Anterior = null) => {
  return {
    ID,
    Anterior,
    Simbolos: {}
  }
}

const Declare = (env, id, value) => (env.Simbolos[id.toLowerCase()] = value)

const getDeclared = (env, id) => {
  let temp_env = env
  while (temp_env) {
    if (temp_env.Simbolos[id.toLowerCase()]) return temp_env.Simbolos[id.toLowerCase()]
    temp_env = temp_env.Anterior
  }
}

let global_env = Environment()

const interpret = ({ body }) => {
  to_print.length = 0
  errors.length = 0
  symbols.length = 0
  cycles.length = 0
  functions.length = 0
  environments.length = 0
  global_env = Environment()

  let toExecute

  for (let Instruction of body)
    if (Instruction.Tipo === 'Exec') {
      if (toExecute) return Error(Instruction.Linea, Instruction.Columna, "Se encontró más de una instrucción 'Exec'")
      toExecute = Instruction
    }

  for (let Instruction of body) if (['Funcion', 'Metodo'].includes(Instruction.Tipo)) $Funcion(Instruction, global_env)

  if (!toExecute) return Error(toExecute.Linea, toExecute.Columna, "No se encontró una instrucción 'Exec'")

  environments.push(global_env)
  $Llamada(toExecute.Llamada, global_env)
}

const $Instructions = (INS, env) => {
  const Execute = {
    Declaracion: $Declaracion,
    Asignacion: $Asignacion,
    Llamada: $Llamada,
    Incremento: $Incremento,
    $Decremento: $Decremento,
    vector: $DeclararVector,
    list: $DeclararLista,
    Modificacion_vector: $ModificacionVector,
    Modificacion_lista: $ModificacionLista,
    Add_lista: $AddLista,
    If: $If,
    Switch: $Switch,
    While: $While,
    //For: $For,
    Do_while: $DoWhile
  }

  for (let Instruction of INS) {
    if (['Funcion', 'Metodo'].includes(Instruction.Tipo))
      if (env.ID === 'global') continue
      else
        return Error(Instruction.Linea, Instruction.Columna, 'Solo se pueden declarar funciones o métodos en el entorno global')

    if (Execute[Instruction.Tipo]) {
      let result = Execute[Instruction.Tipo](Instruction, env)
      if (!result) continue
      Instruction = result
    }

    if (Instruction.Tipo === 'Return') {
      if (!functions) return Error(Instruction.Linea, Instruction.Columna, 'Instruccion return fuera de una función')
      let Expresion = Instruction.Expresion ? $Evaluar(Instruction.Expresion, env) : null
      return { ...Instruction, Expresion }
    } else if (Instruction.Tipo === 'Break') {
      if (!cycles) return Error(Instruction.Linea, Instruction.Columna, 'Instruccion break fuera de una función')
      return Instruction
    } else if (Instruction.Tipo === 'Continue') {
      if (!cycles) return Error(Instruction.Linea, Instruction.Columna, 'Instruccion continue fuera de una función')
      return Instruction
    }
  }
}

const $Evaluar = (Operacion, env) => {
  if (['int', 'double', 'char', 'string', 'boolean', 'vector', 'list'].includes(Operacion.Tipo)) return Operacion

  switch (Operacion.Tipo) {
    case 'id':
      let id = getDeclared(env, Operacion.Valor)
      if (!id) return Error(Operacion.Linea, Operacion.Columna, `No se ha declarado '${Operacion.Valor}'`)
      return id
    case 'Llamada':
      return $Llamada(Operacion, env)
    case 'Acceso_vector':
      return $AccesoVector(Operacion, env)
    case 'Acceso_lista':
      return $AccesoLista(Operacion, env)
    default:
  }

  let Izquierda = $Evaluar(Operacion.Izquierda, env)
  let Derecha = Operacion.Derecha ? $Evaluar(Operacion.Derecha, env) : null

  if (Operacion.Tipo === 'ternaria') {
    let condition = $Evaluar(Operacion.Condicion, env)
    if (condition.Tipo !== 'boolean')
      return Error(condition.Linea, condition.Columna, 'Se esperaba una condición en la operación ternaria')
    return condition.Valor ? Izquierda : Derecha
  }

  let return_type = operation_result[Operacion.Tipo]
    ? operation_result[Operacion.Tipo][Izquierda.Tipo][Derecha.Tipo]
    : unary_operation_result[Operacion.Tipo][Izquierda.Tipo]

  if (!return_type)
    return Error(
      Operacion.Linea,
      Operacion.Columna,
      `No se puede aplicar '${Operacion.Tipo}' a '${Izquierda.Tipo}' y '${Derecha.Tipo}'`
    )

  return s.Simbolo(Operacion.Linea, Operacion.Columna, return_type, operations[Operacion.Tipo](Izquierda, Derecha))
}

const $Declaracion = ({ Linea, Columna, Tipo_variable, ID, Expresion }, env) => {
  if (getDeclared(env, ID)) return Error(Linea, Columna, `La variable '${ID}' ya ha sido declarada`)

  let value
  if (Expresion) {
    value = $Evaluar(Expresion, env)
    if (value.Tipo !== Tipo_variable)
      return Error(-1, -1, `El tipo de la variable '${ID}' (${Tipo_variable}) no coincide con el valor asignado (${value.Tipo})`)
  } else value = s.Simbolo(Linea, Columna, Tipo_variable, default_values[Tipo_variable])

  Declare(env, ID, value)
}

const $Asignacion = ({ Linea, Columna, ID, Expresion }, env) => {
  let value = $Evaluar(Expresion, env)

  let id = getDeclared(env, ID)
  if (!id) return Error(Linea, Columna, `No se ha declarado la variable '${ID}'`)
  if (id.Tipo !== value.Tipo) return Error(Linea, Columna, `No se puede asignar un valor ${value.Tipo} a '${ID}' (${id.Tipo})`)

  Declare(env, ID, value)
}

const $Funcion = ({ Linea, Columna, Tipo_retorno, ID, Parametros, Instrucciones }, env) => {
  if (reserved_functions[ID.toLowerCase()]) return Error(Linea, Columna, `La función '${ID}' es una función de Typesty`)
  if (getDeclared(env, ID)) return Error(Linea, Columna, `La función '${ID}' ya ha sido declarada`)

  Declare(env, ID, { Linea, Columna, Tipo_retorno, ID, Parametros, Instrucciones })
}

const $Llamada = ({ Linea, Columna, ID, Parametros }, env) => {
  const values = []
  for (let Parametro of Parametros) {
    let value = $Evaluar(Parametro, env)

    if (!value) return Error(Linea, Columna, `No se pudo ejecutar la llamada de '${ID}' con los parámtros dados`)
    values.push(value)
  }

  if (reserved_functions[ID.toLowerCase()]) {
    if (!values.length) return Error(Linea, Columna, `La funcion ${ID} debe recibir un parámetro`)
    return reserved_functions[ID.toLowerCase()](values)
  }

  let funcion = getDeclared(env, ID)
  if (!funcion) return Error(Linea, Columna, `No se encontró la función o método '${ID}'`)
  functions.push(ID)

  if (values.length !== funcion.Parametros.length)
    return Error(Linea, Columna, `Se esperaban ${funcion.Parametros.length} parámetros para '${ID}'`)

  for (let i = 0; i < values.length; i++) {
    if (funcion.Parametros[0].Tipo_variable !== values[0].Tipo)
      return Error(
        -1,
        -1,
        `Se esperaba un parámetro ${funcion.Parametros[0].Tipo_variable} para '${funcion.Parametros[0].ID}' (${ID})`
      )
  }

  let nuevo_env = Environment(env.ID + '$' + ID, env)
  environments.push(nuevo_env)

  funcion.Parametros.forEach((Parametro, i) => {
    Parametro.Expresion = values[i]
    $Declaracion(Parametro, nuevo_env)
  })

  let result = $Instructions(funcion.Instrucciones, nuevo_env)
  let return_value

  if (funcion.Tipo_retorno !== 'void') {
    if (!result) Error(Linea, Columna, `La funcion '${ID}' no retorna un valor '${funcion.Tipo_retorno}'`)
    else if (funcion.Tipo_retorno !== result.Expresion.Tipo)
      Error(result.Linea, result.Columna, `La función '${ID}' debe retornar un ${funcion.Tipo_retorno}`)
    else return_value = result.Expresion
  } else if (result && result.Expression) Error(result.Linea, result.Columna, `No se esperaba un retorno en el método '${ID}'`)

  functions.pop()
  return return_value
}

const $Incremento = ({ Linea, Columna, ID }, env) => {
  let id = getDeclared(env, ID)
  if (!id) return Error(Linea, Columna, `No se encontró la variable '${ID}'`)
  if (!['int', 'double'].includes(id.Tipo))
    return Error(Linea, Columna, `No se puede incrementar la variable no numérica '${ID}'`)

  id.Valor += 1
}

const $Decremento = ({ Linea, Columna, ID }, env) => {
  let id = getDeclared(env, ID)
  if (!id) return Error(Linea, Columna, `No se encontró la variable '${ID}'`)
  if (!['int', 'double'].includes(id.Tipo))
    return Error(Linea, Columna, `No se puede incrementar la variable no numérica '${ID}'`)

  id.Valor -= 1
}

const $DeclararVector = ({ Linea, Columna, Tipo_valores, ID, Tipo_i, Tamaño, Valores }, env) => {
  if (getDeclared(env, ID)) return Error(Linea, Columna, `La variable '${ID}' ya ha sido declarada`)

  let size, values
  if (Tipo_i) {
    if (Tipo_valores !== Tipo_i) return Error(Linea, Columna, `Los tipos del vector '${ID}' no coinciden`)
    size = $Evaluar(Tamaño, env)
    if (size.Tipo !== 'int') return Error(Linea, Columna, `El tamaño del vector '${ID}' debe ser un número entero`)
    if (size.Valor < 1) return Error(Linea, Columna, `El tamaño del vector '${ID}' debe ser un entero mayor a 0`)

    values = Array(size.Valor).fill(s.Simbolo(Linea, Columna, Tipo_valores, default_values[Tipo_valores]))
  } else {
    for (let value of Valores) {
      value = $Evaluar(value, env)
      if (value.Tipo !== Tipo_valores)
        return Error(-1, -1, `El tipo del vector '${ID}' (${Tipo_valores}) no coincide con un valor asignado (${value.Tipo})`)
    }

    values = Valores.map((temp_value) => $Evaluar(temp_value, env))
  }

  Declare(env, ID, { Linea, Columna, Tipo: 'vector', Tipo_valores, ID, Tamaño: size, Valores: values })
}

const $DeclararLista = ({ Linea, Columna, Tipo_valores, ID, Tipo_i, Valores }, env) => {
  if (getDeclared(env, ID)) return Error(Linea, Columna, `La variable '${ID}' ya ha sido declarada`)

  let values
  if (Tipo_i) {
    if (Tipo_valores !== Tipo_i) return Error(Linea, Columna, `Los tipos de la lista '${ID}' no coinciden`)
    values = []
  } else {
    let temp_list = $Evaluar(Valores, env)
    if (temp_list.Tipo !== 'list') return Error(Linea, Columna, `Se debe asignar una lista`)
    if (temp_list.Tipo_valores !== Tipo_valores)
      return Error(Linea, Columna, `Se debe asignar una lista del mismo tupo al declarado (${Tipo_valores})`)

    values = temp_list.Valores
  }

  Declare(env, ID, { Linea, Columna, Tipo: 'list', Tipo_valores, ID, Valores: values })
}

const $AccesoVector = ({ Linea, Columna, ID, Index }, env) => {
  let vector = getDeclared(env, ID)
  if (!vector) return Error(Linea, Columna, `No se ha declarado el vector '${ID}'`)

  let index = $Evaluar(Index, env)
  if (index.Tipo !== 'int') return Error(Linea, Columna, `Se esperaba un valor entero como índice en '${ID}'`)
  if (index.Valor >= vector.Valores.length)
    return Error(-1, -1, `El índice proporcionado para '${ID}' sobrepasó el tamaño del vector (${vector.Valores.length})`)
  if (index.Valor < 0) return Error(-1, -1, `El índice proporcionado para '${ID}' debe ser mayor o igual a 0`)

  return vector.Valores[index.Valor]
}

const $AccesoLista = ({ Linea, Columna, ID, Index }, env) => {
  let list = getDeclared(env, ID)
  if (!list) return Error(Linea, Columna, `No se ha declarado la lista '${ID}'`)

  let index = $Evaluar(Index, env)
  if (index.Tipo !== 'int') return Error(Linea, Columna, `Se esperaba un valor entero como índice en '${ID}'`)
  if (index.Valor >= list.Valores.length)
    return Error(-1, -1, `El índice proporcionado para '${ID}' sobrepasó el tamaño de la lista (${list.Valores.length})`)
  if (index.Valor < 0) return Error(-1, -1, `El índice proporcionado para '${ID}' debe ser mayor o igual a 0`)

  return list.Valores[index.Valor]
}

const $ModificacionVector = ({ Linea, Columna, ID, Index, Expresion }, env) => {
  let vector = getDeclared(env, ID)
  if (!vector) return Error(Linea, Columna, `No se ha declarado el vector '${ID}'`)

  let index = $Evaluar(Index, env)
  if (index.Tipo !== 'int') return Error(Linea, Columna, `Se esperaba un valor entero como índice en  '${ID}'`)
  if (index.Valor >= vector.Valores.length)
    return Error(-1, -1, `El índice proporcionado para '${ID}' sobrepasó el tamaño del vector (${vector.Valores.length})`)
  if (index.Valor < 0) return Error(-1, -1, `El índice proporcionado para '${ID}' debe ser mayor o igual a 0`)

  let value = $Evaluar(Expresion, env)
  if (value.Tipo !== vector.Tipo_valores)
    return Error(Linea, Columna, `No se puede asignar un valor ${value.Tipo} al vector '${ID}' (${vector.Tipo_valores})`)

  vector.Valores[index.Valor] = value
}

const $ModificacionLista = ({ Linea, Columna, ID, Index, Expresion }, env) => {
  let list = getDeclared(env, ID)
  if (!list) return Error(Linea, Columna, `No se ha declarado la lista '${ID}'`)

  let index = $Evaluar(Index, env)
  if (index.Tipo !== 'int') return Error(index.Linea, index.Columna, `Se esperaba un valor entero como índice en '${ID}'`)
  if (index.Valor >= list.Valores.length)
    return Error(-1, -1, `El índice proporcionado para '${ID}' sobrepasó el tamaño de la lista (${list.Valores.length})`)
  if (index.Valor < 0) return Error(-1, -1, `El índice proporcionado para '${ID}' debe ser mayor o igual a 0`)

  let value = $Evaluar(Expresion, env)
  if (value.Tipo !== list.Tipo_valores)
    return Error(Linea, Columna, `No se puede asignar un valor ${value.Tipo} a la lista '${ID}' (${list.Tipo_valores})`)

  list.Valores[index.Valor] = value
}

const $AddLista = ({ Linea, Columna, ID, Expresion }, env) => {
  let list = getDeclared(env, ID)
  if (!list) return Error(Linea, Columna, `No se ha declarado la lista '${ID}'`)

  let value = $Evaluar(Expresion, env)

  if (value.Tipo !== list.Tipo_valores)
    return Error(Linea, Columna, `No se puede añadir un valor ${value.Tipo} a la lista '${ID}' (${list.Tipo_valores})`)

  list.Valores.push(value)
}

const $If = ({ Linea, Columna, Condicion, Instrucciones_true, Instrucciones_false }, env) => {
  let condition = $Evaluar(Condicion, env)
  if (condition.Tipo !== 'boolean') return Error(Linea, Columna, 'Se esperaba una condicion dentro del if')

  let new_env = Environment(env.ID + `#if(${Linea},${Columna})`, env)

  if (condition.Valor) return $Instructions(Instrucciones_true, new_env)
  else if (Instrucciones_false) return $Instructions(Instrucciones_false, new_env)
}

const $Switch = ({ Linea, Columna, Expresion, Cases, Default }, env) => {
  let executed
  let new_env = Environment(env.ID + `#switch(${Linea},${Columna})`, env)

  cycles.push('switch')
  for (let Case of Cases) {
    let condition = $Evaluar(s.Operacion(Linea, Columna, 'igualacion', Expresion, Case.Expresion), env)

    let result
    if (condition.Valor || executed) {
      executed = true
      result = $Instructions(Case.Instrucciones, new_env)
      if (result) {
        cycles.pop()
        if (result.Tipo === 'Break') return
        else return result
      }
    }
    if (Default && !executed) {
      result = $Instructions(Default.Instrucciones, new_env)
      if (result) {
        cycles.pop()
        if (result.Tipo === 'Break') return
        else return result
      }
    }
    cycles.pop()
    return
  }
}

const $While = ({ Linea, Columna, Condicion, Instrucciones }, env) => {
  cycles.push('while')
  let new_env = Environment(env.ID + `#while(${Linea},${Columna})`, env)

  while (true) {
    let condition = $Evaluar(Condicion, env)

    if (condition.Tipo !== 'boolean') {
      cycles.pop()
      return Error(Linea, Columna, 'Se esperaba una condicion dentro del while')
    }

    if (!condition.Valor) {
      cycles.pop()
      return
    }

    let result = $Instructions(Instrucciones, new_env)
    if (!result) continue

    if (result.Tipo === 'Return') {
      cycles.pop()
      return result
    } else if (result.Tipo === 'Break') {
      cycles.pop()
      return
    } else if (result.Tipo === 'Continue') continue
  }
}

//const $For = ({ Linea, Columna, Inicializacion, Condicion, Actualizacion, Instrucciones }, env) => {
//  cycles.push('for')
//  let new_env = Environment(env.ID + `$for(${Linea},${Columna})`, env)
//  let symbol = s.Simbolo('id', Inicializacion.ID)

//  if (Inicializacion.Tipo === 'Declaracion') {
//    if (!['int', 'double'].includes(Inicializacion.Tipo_variable))
//      return Error(Inicializacion.Linea, Inicializacion.Columna, `Se esperaba la inicalización de un número en el for`)

//    $Declaracion(Inicializacion, nuevo)
//  } else {
//    let value = $Evaluar(symbol, env)
//    if (!value)
//      return Error(
//        Inicializacion.Linea,
//        Inicializacion.Columna,
//        `La variable de inicialización del for (${Inicializacion.ID}) no fue declarada`
//      )
//    if (!['int', 'double'].includes(value.Tipo))
//      return Error(
//        Inicializacion.Linea,
//        Inicializacion.Columna,
//        `La variable de inicialización del for (${Inicializacion.ID}) no es un número`
//      )

//    $Asignacion(Inicializacion, nuevo)
//  }

//  let condition = $Evaluar(Condicion, env)
//  if (condition.Tipo !== 'boolean') {
//    cycles.pop()
//    return Error('Se esperaba una condición dentro del for')
//  }

//  let value = $Evaluar(s.Simbolo('id', Actualizacion.ID), env)
//  if (!value)
//    return Error(
//      Actualizacion.Linea,
//      Actualizacion.Columna,
//      `La variable de actualizacion del for (${Inicializacion.ID}) no fue declarada`
//    )
//  if (!['int', 'double'].includes(value.Tipo))
//    return Error(value.Linea, value.Columna, `La variable de actualizacion del for (${Inicializacion.ID}) no es un número`)

//  let step = $Instructions([Actualizacion], env)
//  while (true) {
//    let inicio = $Evaluar(symbol, nuevo)
//    if (inicio.Tipo !== 'int') {
//      cycles.pop()
//      console.log('Se esperabam valores numericos en el Desde')
//      return
//    }
//    if (step.Valor > 0) {
//      if (inicio.Valor <= condition.Valor) {
//        let result = $Instructions(Instrucciones, nuevo)
//        if (result && result.Tipo === 'Break') {
//          break
//        } else if (result) {
//          cycles.pop()
//          return result
//        }
//      } else {
//        break
//      }
//    } else {
//      if (inicio.Valor >= condition.Valor) {
//        let result = $Instructions(Instrucciones, nuevo)
//        if (result && result.Tipo === 'Break') {
//          break
//        }
//      } else {
//        break
//      }
//    }
//    $Asignacion($Asignacion(Inicializacion.ID, s.Operacion(symbol, step, '+')), nuevo)
//  }
//  cycles.pop()
//  return
//}

const $DoWhile = ({ Linea, Columna, Condicion, Instrucciones }, env) => {
  cycles.push('do-while')
  let new_env = Environment(env.ID + `$do-while(${Linea},${Columna})`, env)

  while (true) {
    let condition = $Evaluar(Condicion, env)
    if (condition.Tipo !== 'boolean') {
      cycles.pop()
      return Error(Linea, Columna, 'Se esperaba una condicion dentro del do-while')
    }

    let result = $Instructions(Instrucciones, new_env)
    if (!result) continue

    if (result.Tipo === 'Return') {
      cycles.pop()
      return result
    } else if (result.Tipo === 'Break') {
      cycles.pop()
      return
    } else if (result.Tipo === 'Continue') continue

    if (!condition.Valor) {
      cycles.pop()
      return
    }
  }
}

export { interpret, getErrors, getSymbols, getPrinted }
