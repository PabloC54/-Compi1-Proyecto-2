/* eslint-disable no-fallthrough */

// TODO:
// * Líneas de los errores semánticos
// * Acceso a vectores y listas

const to_print = []

const getPrinted = () => {
  const temp = [...to_print]
  to_print.length = 0
  return temp
}

const ReservedFunctions = {
  print: (content) => {
    if (!['string', 'number', 'boolean'].includes(typeof content))
      return Error(-1, -1, `La función 'print' no recibe valores de tipo ${typeof content}`)
    to_print.push(content)
  },
  tolower: (content) => {
    if (!['string'].includes()) return Error(-1, -1, `La función 'toLower' solo recibe cadenas`)
    return content.toLowerCase()
  },
  toupper: (str) => {
    if (!['string'].includes(typeof val)) return Error(-1, -1, `La función 'toLower' solo recibe cadenas`)
    return str.toUpperCase()
  },
  length: (content) => {
    return content
  },
  truncate: (content) => {
    return Math.floor(content)
  },
  round: (content) => {
    return Math.round(content)
  },
  typeof: (content) => {
    return true
  },
  tostring: (content) => {
    return content
  },
  tochararray: (content) => {
    return content
  }
}

const Error = function (Linea, Columna, Mensaje) {
  root.errors.push({ Linea, Columna, Tipo: 'Semántico', Mensaje })
}

const Operacion = function (Tipo, Izquierda, Derecha) {
  return {
    Tipo,
    Izquierda,
    Derecha
  }
}

const Simbolo = function (Tipo, Valor) {
  return {
    Tipo,
    Valor
  }
}

let root
const cycles = []
const functions = []

const Environment = (Anterior = null) => {
  return {
    Simbolos: {},
    Anterior
  }
}

const interpret = (content) => {
  root = content

  let toExecute
  content.body.forEach((Instruction) => {
    if (Instruction.Tipo === 'Exec') {
      if (toExecute) return Error(-1, -1, "Se encontró más de una instrucción 'Exec'")

      toExecute = Instruction
    }
  })

  if (!toExecute) return Error(-1, -1, "No se encontró una instrucción 'Exec'")

  const global = Environment()
  return $Llamada(toExecute.Llamada, global)
}

const $Instructions = (INS, env) => {
  const Instructions = {
    Declaracion: $Declaracion,
    Asignacion: $Asignacion,
    Llamada: $Llamada,
    Incremento: $Decremento,
    Declarar_vector: $DeclararVector,
    Declarar_lista: $DeclararLista,
    Modificacion_vector: $ModificacionVector,
    $ModificacionLista: $ModificacionLista,
    Add_lista: $AddLista,
    If: $If,
    Switch: $Switch,
    While: $While,
    For: $For,
    Do_while: $DoWhile,
    Funcion: $Funcion
  }

  for (let Instruction of INS) {
    if (Instructions[Instruction.Tipo]) {
      Instructions[Instructions](Instruction, env)
      continue
    }

    let value
    if (Instruction.Tipo === 'Return') {
      if (!functions) return Error(-1, -1, 'Instruccion return fuera de una función')
      value = $Evaluar(Instruction)
    } else if (Instruction.Tipo === 'Break') {
      if (!cycles) return Error(-1, -1, 'Instruccion break fuera de una función')
    } else if (Instruction.Tipo === 'Continue') {
      if (!cycles) return Error(-1, -1, 'Instruccion continue fuera de una función')
    }

    return value
  }
}

const $Evaluar = (Operacion, env) => {
  const return_values = {
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
    }
  }

  const return_values_unary = {
    negacion: {
      int: 'boolean',
      double: 'boolean'
    },
    not: {
      int: 'boolean',
      double: 'boolean',
      boolean: 'boolean',
      char: 'boolean',
      string: 'boolean'
    }
  }

  if (['int', 'double', 'char', 'string', 'boolean'].includes(Operacion.Tipo)) return Operacion

  switch (Operacion.Tipo) {
    case 'id':
      let temp = env
      while (temp) {
        if (temp.Simbolos[Operacion.Valor]) return temp.Simbolos[Operacion.Valor]

        temp = temp.Anterior
      }
      return Error(-1, -1, `No se ha declarado '${Operacion.Valor}`)
    case 'Llamada':
      return $Llamada(Operacion, env)
    //case 'Acceso_vector': //TODO: agregar accesos
    //  return $Acceso(Operacion, env)
    //case 'Acceso_lista':
    //  return $Llamada(Operacion, env)
    default:
  }

  let Izquierda = $Evaluar(Operacion.Izquierda, env)
  let Derecha = Operacion.Derecha ? $Evaluar(Operacion.Derecha, env) : null

  let return_type = return_values[Operacion.Tipo]
    ? return_values[Operacion.Tipo][Izquierda.Tipo][Derecha.Tipo]
    : return_values_unary[Operacion.Tipo][Izquierda.Tipo]

  if (!return_type) return Error(-1, -1, `No se puede aplicar '${Operacion.Tipo}' a '${Izquierda.Tipo}' y '${Derecha.Tipo}'`)

  const operations = {
    suma: (izq, der) => izq.Valor + der.Valor,
    resta: (izq, der) => izq.Valor - der.Valor,
    multiplicacion: (izq, der) => izq.Valor * der.Valor,
    division: (izq, der) => izq.Valor / der.Valor,
    potencia: (izq, der) => izq.Valor ** der.Valor,
    modulo: (izq, der) => izq.Valor % der.Valor,
    negacion: (izq, _der) => -izq.Valor,
    not: (izq, _der) => !izq.Valor,
    and: (izq, der) => izq.Valor && der.Valor,
    or: (izq, der) => izq.Valor || der.Valor,
    mayor: (izq, der) => izq.Valor > der.Valor,
    menor: (izq, der) => izq.Valor < der.Valor,
    mayorigual: (izq, der) => izq.Valor >= der.Valor,
    menorigual: (izq, der) => izq.Valor <= der.Valor,
    igualacion: (izq, der) => izq.Valor === der.Valor,
    diferenciacion: (izq, der) => izq.Valor !== der.Valor
  }

  return Simbolo(return_type, operations[Operacion.Tipo](Izquierda, Derecha))
}

const $Declaracion = (content, env) => {
  if (env.Simbolos[content.ID]) return Error(-1, -1, `La variable '${content.ID}' ya ha sido declarada`)

  let value

  const default_values = {
    int: 0,
    double: 0.0,
    boolean: true,
    char: '\u0000',
    string: ''
  }

  if (content.Expresion) {
    value = $Evaluar(content.Expresion, env)
    if (value.Tipo !== content.Tipo)
      return Error(
        -1,
        -1,
        `El tipo de la variable '${content.ID}' (${content.Tipo}) no coincide con el valor asignado (${value.Tipo})`
      )
  } else value = Simbolo(content.Tipo, default_values(content.Tipo))

  env.Simbolos.content.ID = value
}

const $Asignacion = (content, env) => {
  let value = $Evaluar(content.Expresion, env)
  let env_temp = env

  while (env_temp) {
    if (!env_temp.Simbolos[content.ID]) {
      env_temp = env_temp.Anterior
      continue
    }

    let actual = env_temp.Simbolos.get(content.ID)

    if (actual.Tipo !== value.Tipo)
      return Error(-1, -1, `No se puede asignar un valor ${value.Tipo} a '${content.ID}' (${actual.Tipo})`)

    env_temp.Simbolos.set(content.ID, value)
    return
  }
  console.log('No se encontro la variable ', content.ID)
}

const $Llamada = (content, env) => {
  const valores = []

  content.Parametros.forEach((Parametro) => {
    valores.push($Evaluar(Parametro, env))
  })

  let temp_env = env
  let funcion

  while (temp_env) {
    if (temp_env.Simbolos[content.ID]) {
      funcion = temp_env.Simbolos.get(content.ID)

      if (valores.length !== funcion.Parametros.length)
        return Error(-1, -1, `Se esperaban ${funcion.Parametros.length} parámetros para '${content.ID}'`)

      funcion.Parametros.forEach((Parametro, i) => {
        if (Parametro.Tipo !== ReservedFunctions.typeof(valores[i]))
          return Error(-1, -1, `Se esperaba un parámetro ${Parametro.Tipo} para '${Parametro.ID}' (${content.ID})`)
        return
      })
      break
    }
    temp_env = temp_env.Anterior
  }

  if (!funcion) return Error(-1, -1, `No se encontró la función o método '${content.ID}'`)

  functions.push(content.ID)
  let nuevo_env = Environment(global)

  funcion.Parametros.forEach((Parametro, i) => {
    Parametro.Expresion = valores[i]
    $Declaracion(Parametro, nuevo_env)
  })

  let result = $Instructions(funcion.Instrucciones, nuevo_env)
  let retorno

  if (funcion.Tipo === 'funcion') {
    let exp = $Evaluar(result, nuevo_env)
    if (exp.Tipo !== funcion.Tipo) return Error(-1, -1, `La función '${content.ID}' debe retornar un ${content.Tipo}`)
    else retorno = exp
  } else {
    if (result) return Error(-1, -1, 'No se esperaba un retorno')
    else retorno = Simbolo('@vacio@', 'vacio')
  }

  functions.pop()
  return retorno
}

const $Incremento = (content, env) => {}

const $Decremento = (content, env) => {}

const $DeclararVector = (content, env) => {}

const $DeclararLista = (content, env) => {}

const $ModificacionVector = (content, env) => {}

const $ModificacionLista = (content, env) => {}

const $AddLista = (content, env) => {}

const $If = (content, env) => {
  let result = $Evaluar(content.Condicion, env)

  if (result.Tipo !== 'boolean') return Error(-1, -1, 'Se esperaba una condicion dentro del if')

  let new_env = Environment(env)

  if (result.Valor) {
    return $Instructions(content.Instrucciones_true, new_env)
  } else if (content.Instrucciones_false) {
    return $Instructions(content.Instrucciones_false, new_env)
  }
}

const $Switch = (content, env) => {
  cycles.push('switch')

  let ejecutado = false
  let nuevo = Environment(env)

  content.Cases.forEach((Case) => {
    let condicion = $Evaluar(Operacion('igualacion', content.Expresion, Case.Expresion), env)

    if (condicion.Tipo !== 'boolean') {
      cycles.pop()
      return
    }

    if (condicion.Valor || ejecutado) {
      ejecutado = true
      let result = $Instructions(Case.Instrucciones, nuevo)
      if (result) {
        cycles.pop()

        if (result.Tipo === 'Break') return result
        return
      }
    }

    if (content.Default && !ejecutado) {
      $Instructions(content.Default.Instrucciones, nuevo)
    }
    cycles.pop()
    return
  })
}

const $While = (content, env) => {
  cycles.push('while')
  let nuevo = Environment(env)

  while (true) {
    let condicion = $Evaluar(content.Condicion, env)

    if (condicion.Tipo !== 'boolean') {
      console.log('Se esperaba una condicion dentro del Mientras')
      cycles.pop()
      return
    }

    if (condicion.Valor) {
      let result = $Instructions(content.Instrucciones, nuevo)
      if (result) {
        cycles.pop()

        if (result.Tipo === 'Break') return
        //return result;
      }
    } else {
      return
    }
  }
}

const $For = (content, env) => {
  cycles.push('for')
  let nuevo = Environment(env)

  if (content.Inicializacion.Tipo === 'Declaracion') $Declaracion(content.Inicializacion, nuevo)
  else $Asignacion(content.Inicializacion, nuevo)

  //mientras no se llegue al hasta
  let paso = $Evaluar(content.Actualizacion, env)
  let hasta = $Evaluar(content.Condicion, env)
  let simbolo = Simbolo(content.ExpDesde.ID, 'ID')
  if (!(paso.Tipo === 'int' && hasta.Tipo === 'int')) {
    cycles.pop()
    console.log('Se esperaban valores numericos en el Desde')
    return
  }
  while (true) {
    let inicio = $Evaluar(simbolo, nuevo)
    if (inicio.Tipo !== 'int') {
      cycles.pop()
      console.log('Se esperabam valores numericos en el Desde')
      return
    }
    if (paso.Valor > 0) {
      if (inicio.Valor <= hasta.Valor) {
        let result = $Instructions(content.Instrucciones, nuevo)
        if (result && result.Tipo === 'Break') {
          break
        } else if (result) {
          cycles.pop()
          return result
        }
      } else {
        break
      }
    } else {
      if (inicio.Valor >= hasta.Valor) {
        let result = $Instructions(content.Instrucciones, nuevo)
        if (result && result.Tipo === 'Break') {
          break
        }
      } else {
        break
      }
    }
    $Asignacion($Asignacion(content.ExpDesde.ID, Operacion(simbolo, paso, '+')), nuevo)
  }
  cycles.pop()
  return
}

const $DoWhile = (content, env) => {
  cycles.push('do-while')
  let nuevo = Environment(env)

  while (true) {
    let condicion = $Evaluar(content.Condicion, env)

    if (condicion.Tipo !== 'boolean') {
      console.log('Se esperaba una condicion dentro del do-while')
      cycles.pop()
      return
    }

    if (condicion.Valor) {
      let result = $Instructions(content.Instrucciones, nuevo)
      if (result) {
        cycles.pop()

        if (result.Tipo === 'Break') return
        //return result;
      }
    } else {
      return
    }
  }
}

const $Funcion = (content, env) => {
  console.log('nombre: ', content.ID)

  if (ReservedFunctions[content.ID]) return Error(-1, -1, `La función '${content.ID}' es una función de Typesty`)

  if (env.Simbolos[content.ID]) return Error(-1, -1, `La función '${content.ID}' ya ha sido declarada`)

  env.Simbolos.set(content.ID, content)
}

export { interpret, getPrinted }
