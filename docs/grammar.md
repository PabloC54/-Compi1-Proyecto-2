# 1. Gramática de Regexive

## 1.1. Contenidos
- [1. Gramática de Regexive](#1-gramática-de-regexive)
  - [1.1. Contenidos](#11-contenidos)
  - [1.2. Alfabeto](#12-alfabeto)
    - [1.2.1. Símbolos terminales](#121-símbolos-terminales)
      - [1.2.1.1. Expresiones regulares](#1211-expresiones-regulares)
      - [1.2.1.2. Palabras reservadas](#1212-palabras-reservadas)
    - [1.2.2. Símbolos no terminales](#122-símbolos-no-terminales)
  - [1.3. Sintáxis](#13-sintáxis)

## 1.2. Alfabeto

### 1.2.1. Símbolos terminales

#### 1.2.1.1. Expresiones regulares

| Token                 |             Lexema             |                    Patrón                    |
| --------------------- | :----------------------------: | :------------------------------------------: |
| comentario            |   \<comentario de una linea>   |                     //.*                     |
| comentario_multilinea | \<comentario de varias líneas> | /\*([^*]\|[\r\n]\|(\*+([^*/]\|[\r\n])))*\*+/ |
| escape                |     \<secuencia de escape>     |       (\n)\|(\r)\|(\t)\|(")\|(')\|(\\)       |
| op_incremento         |               ++               |                      ++                      |
| op_decremento         |               --               |                      --                      |
| opar_suma             |               +                |                      +                       |
| opar_resta            |               -                |                      -                       |
| opar_multiplicacion   |               \*               |                      \*                      |
| opar_division         |               /                |                      /                       |
| opar_potencia         |               ^                |                      ^                       |
| opar_modulo           |               %                |                      %                       |
| oprel_igualacion      |               ==               |                      ==                      |
| oprel_diferenciacion  |               !=               |                      !=                      |
| oprel_menor           |               <                |                      <                       |
| oprel_menorigual      |               <=               |                      <=                      |
| oprel_mayor           |               >                |                      >                       |
| oprel_mayorigual      |               >=               |                      >=                      |
| oplog_or              |              \|\|              |                     \|\|                     |
| oplog_and             |               &&               |                      &&                      |
| oplog_not             |               !                |                      !                       |
| op_ternario           |               ?                |                      ?                       |
| parA                  |               (                |                      (                       |
| parB                  |               )                |                      )                       |
| corA                  |               [                |                      [                       |
| corB                  |               ]                |                      ]                       |
| llaveA                |               {                |                      {                       |
| llaveB                |               }                |                      }                       |
| igual                 |               =                |                      =                       |
| puntocoma             |               ;                |                      ;                       |
| dospuntos             |               :                |                      :                       |
| punto                 |               .                |                      .                       |
| coma                  |               ,                |                      ,                       |
| comilla_simple        |               '                |                      '                       |
| comilla_doble         |               "                |                      "                       |
| id                    |        <identificador>         |              [a-z_$][a-z0-9_$]*              |
| int                   |        <número entero>         |                    [0-9]+                    |
| double                |        <número decimal>        |                [0-9]+\.[0-9]+                |
| char                  |        <cualquier char>        | '({escape}\|[\x00-\x26\x28-\x5B\x5D-\x7F])'  |
| boolean               |        <valor booleano>        |                 true\|false                  |
| string                |       <cualquier cadena>       |           "({escape}\|[^\n\"\\])*\           |

#### 1.2.1.2. Palabras reservadas

| Token      | Lexema   |
| ---------- | -------- |
| r_int      | int      |
| r_double   | double   |
| r_boolean  | boolean  |
| r_char     | char     |
| r_string   | string   |
| r_list     | list     |
| r_new      | new      |
| r_if       | if       |
| r_else     | else     |
| r_switch   | switch   |
| r_case     | case     |
| r_default  | default  |
| r_while    | while    |
| r_for      | for      |
| r_do       | do       |
| r_break    | break    |
| r_continue | continue |
| r_return   | return   |
| r_void     | void     |
| r_add      | add      |
| r_exec     | exec     |

### 1.2.2. Símbolos no terminales

| Token                | Descripción                                                    |
| -------------------- | -------------------------------------------------------------- |
| INI                  | Estado inicial de la sintáxis                                  |
| INS                  | Lista de instrucciones                                         |
| S                    | Instrucción                                                    |
| DECLARACION_FUNCION  | Declaración de una función                                     |
| DECLARACION_METODO   | Declaración de un método                                       |
| EXEC                 | Definición del inicio de la ejecución                          |
| DECLARACION_VARIABLE | Declaración de una variable con su tipo                        |
| ASIGNACION_VARIABLE  | Asignación de valor a una variable declarada                   |
| INCREMENTO_VARIABLE  | Sentencia de incremento de una variable                        |
| DECREMENTO_VARIABLE  | Sentencia de decremento de una variable                        |
| DECLARACION_VECTOR   | Declaración de un vector                                       |
| MODIFICACION_VECTOR  | Modificación del valor de un vector en una posición específica |
| DECLARACION_LISTA    | Declaración de una lista dinámica                              |
| ADD_LISTA            | Agregación de un valor al final de una lista                   |
| MODIFICACION_LISTA   | Modificación del valor de una lista en una posición específica |
| S_IF                 | Sentencia de control if                                        |
| S_SWITCH             | Sentencia de control switch                                    |
| S_WHILE              | Sentencia cíclica while                                        |
| S_FOR                | Sentencia cíclica for                                          |
| S_DO                 | Sentencia cíclica do-while                                     |
| S_LLAMADA            | LLamada a una función o método previamente definido            |
| S_RETURN             | Retorno de valor en una función                                |
| S_BREAK              | Sentencia de interrupcion de un ciclo                          |
| S_CONTINUE           | Sentencia de continuación de un ciclo                          |
| BLOQUE               | Bloque de instrucciones de una sentencia o función             |
| TIPO                 | Tipo de una variable o función                                 |
| PARAMETROS           | Lista de parámetros                                            |
| PARAMETRO            | Parámetro de una función                                       |
| E                    | Expresion de cualquier tipo                                    |
| LLAMADA              | Llamada de una funcion en una expresion                        |
| ACCESO_VECTOR        | Acceso a la posición de un vector                              |
| ACCESO_LISTA         | Acceso a la posición de una lista                              |
| INCREMENTO           | Incremento del valor de expresion                              |
| DECREMENTO           | Decremento del valor de expresion                              |
| VALORES              | Lista de expresiones                                           |
| S_ELSE               | Sentencia else de una sentencia if                             |
| CASES                | Lista de sentencias case                                       |
| CASE                 | Sentencia case de una sentencia switch                         |
| DEFAULT              | Sentencia default de una sentencia switch                      |
| INICIALIZACION       | Inicialización de una sentencia for                            |
| ACTUALIZACION        | Actualización de una sentencia for                             |
| DECLARACION          | Declaración de inicializacion de un for                        |
| ASIGNACION           | Asignación de inicializacion de un for                         |
| EOF                  | Final de las instrucciones                                     |

## 1.3. Sintáxis

Estado inicial = [INI]

```py

INI
     : [INS] [EOF]
	| error [EOF]

INS
        : [INS] [S]
        | [S]

S
        : [DECLARACION_FUNCION]
        | [DECLARACION_METODO]
        | [EXEC]
        | [DECLARACION_VARIABLE]
        | [ASIGNACION_VARIABLE]
        | [INCREMENTO_VARIABLE]
        | [DECREMENTO_VARIABLE]
        | [DECLARACION_VECTOR]
        | [MODIFICACION_VECTOR]
        | [DECLARACION_LISTA]
        | [ADD_LISTA]
        | [MODIFICACION_LISTA]
        | [S_IF]
        | [S_SWITCH]
        | [S_WHILE]
        | [S_FOR]
        | [S_DO]
        | [S_LLAMADA]
        | [S_RETURN]
        | [S_BREAK]
        | [S_CONTINUE]
        | error puntocoma

BLOQUE
        : llaveA [INS] llaveB
        | llaveA llaveB
	      | llaveA error llaveB

DECLARACION_FUNCION
        : [TIPO] id parA [PARAMETROS] parB [BLOQUE]
        | [TIPO] id parA parB [BLOQUE]
        | [TIPO] id parA error llaveB

DECLARACION_METODO
        : r_void id parA [PARAMETROS] parB [BLOQUE]
        | r_void id parA parB [BLOQUE]
        | r_void id parA error llaveB

[PARAMETROS]
        : [PARAMETROS] coma [TIPO] id
        | [TIPO] id

[EXEC]
        : r_exec [S_LLAMADA]

[DECLARACION_VARIABLE]
        : [TIPO] id puntocoma
        | [TIPO] id igual E puntocoma

[ASIGNACION_VARIABLE]
        : id igual E puntocoma

[TIPO]
        : r_int
        | r_double
        | r_boolean
        | r_char
        | r_string

E
        : [E] opar_suma [E]
        | [E] opar_resta [E]
        | [E] opar_multiplicacion [E]
        | [E] opar_division [E]
        | [E] opar_potencia [E]
        | [E] opar_modulo [E]
        | [E] oprel_igualacion [E]
        | [E] oprel_diferenciacion [E]
        | [E] oprel_menor [E]
        | [E] oprel_menorigual [E]
        | [E] oprel_mayor [E]
        | [E] oprel_mayorigual [E]
        | [E] oplog_or [E]
        | [E] oplog_and [E]
        | opar_resta [E] %prec op_negacion
        | oplog_not [E]
        | [E] op_ternario [E] dospuntos [E] %prec op_condicional
        | parA [E] parB %prec op_group
        | [LLAMADA] %prec op_call
        | [ACCESO_VECTOR]  %prec op_vector
        | [ACCESO_LISTA] %prec op_list
        | parA [TIPO] parB [E] %prec op_casteo
        | [E] op_incremento
        | [E] op_decremento
        | id
        | int
        | double
        | char
        | string
        | boolean

INCREMENTO_VARIABLE
        : [INCREMENTO] puntocoma

DECREMENTO_VARIABLE
        : [DECREMENTO] puntocoma

INCREMENTO
        : id op_incremento

DECREMENTO
        : id op_decremento

VALORES
        : [VALORES] coma [E]
        | [E]

DECLARACION_VECTOR
        : [TIPO] corA corB id igual r_new [TIPO] corA [E] corB puntocoma
        | [TIPO] corA corB id igual llaveA [VALORES] llaveB puntocoma

ACCESO_VECTOR
        : id corA [E] corB

MODIFICACION_VECTOR
        : id corA [E] corB igual [E] puntocoma

DECLARACION_LISTA
        : r_list oprel_menor [TIPO] oprel_mayor id igual r_new r_list oprel_menor [TIPO] oprel_mayor puntocoma
        | r_list oprel_menor [TIPO] oprel_mayor id igual [E] puntocoma

ADD_LISTA
        : id punto r_add parA [E] parB puntocoma

ACCESO_LISTA
        : id corA corA [E] corB corB

MODIFICACION_LISTA
        : id corA corA [E] corB corB igual [E] puntocoma

S_IF
        : r_if parA [E] parB [BLOQUE]
        | r_if parA [E] parB [BLOQUE] [S_ELSE]
	| r_if parA error parB [BLOQUE]


S_ELSE
        : r_else [BLOQUE]
        | r_else [S_IF]

S_SWITCH
        : r_switch parA [E] parB llaveA [CASES] [S_DEFAULT] llaveB
        | r_switch parA [E] parB llaveA [CASES] llaveB
        | r_switch parA [E] parB llaveA [S_DEFAULT] llaveB
        | r_switch parA error llaveB

CASES
        : [CASES] r_case [E] dospuntos [INS]
        | r_case [E] dospuntos [INS]

S_DEFAULT
        : r_default dospuntos [INS]

S_WHILE
        : r_while parA [E] parB [BLOQUE]
        | r_while parA error llaveB

S_FOR
        : r_for parA [INICIALIZACION] puntocoma [E] puntocoma [ACTUALIZACION] parB [BLOQUE]
        | r_for parA error llaveB

INICIALIZACION
        : [ASIGNACION]
        | [DECLARACION]

ACTUALIZACION
        : [INCREMENTO]
        | [DECREMENTO]
        | [ASIGNACION]

ASIGNACION
        : id igual [E]

DECLARACION
        : [TIPO] id igual [E]

S_DO
        : r_do [BLOQUE] r_while parA [E] parB puntocoma
        | r_do error puntocoma

S_LLAMADA
        : [LLAMADA] puntocoma

LLAMADA
        : id parA parB
        | id parA [VALORES] parB

S_RETURN
        : r_return [E] puntocoma
        | r_return puntocoma

S_BREAK
        : r_break puntocoma

S_CONTINUE
        : r_continue puntocoma

```
