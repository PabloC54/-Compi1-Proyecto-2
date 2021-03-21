# Gramática de Regexive

## Alfabeto

### Símbolos terminales

#### Expresiones regulares

| Token                 |             Lexema             |            Patrón            |
| --------------------- | :----------------------------: | :--------------------------: |
| comentario            |   \<comentario de una linea>   |             //.*             |
| comentario_multilinea | \<comentario de varias líneas> |      /\*(\n)\|[^/\*]\*/      |
| escape                |     \<secuencia de escape>     | (\n)\|(\\)\|(\")\|(\t)\|(\') |
| opar_suma             |               +                |              +               |
| opar_resta            |               -                |              -               |
| opar_multiplicacion   |               \*               |              \*              |
| opar_division         |               /                |              /               |
| opar_potencia         |               ^                |              ^               |
| opar_modulo           |               %                |              %               |
| oprel_igualacion      |               ==               |              ==              |
| oprel_diferenciacion  |               !=               |              !=              |
| oprel_menor           |               <                |              <               |
| oprel_menorigual      |               <=               |              <=              |
| oprel_mayor           |               >                |              >               |
| oprel_mayorigual      |               >=               |              >=              |
| oplog_or              |              \|\|              |             \|\|             |
| oplog_and             |               &&               |              &&              |
| oplog_not             |               !                |              !               |
| parA                  |               (                |              (               |
| parB                  |               )                |              )               |
| corA                  |               [                |              [               |
| corB                  |               ]                |              ]               |
| llaveA                |               {                |              {               |
| llaveB                |               }                |              }               |
| igual                 |               =                |              =               |
| puntocoma             |               ;                |              ;               |
| dospuntos             |               :                |              :               |
| punto                 |               .                |              .               |
| coma                  |               ,                |              ,               |
| comilla_simple        |               '                |              '               |
| comilla_doble         |               "                |              "               |
| id                    |        <identificador>         |       [a-z][a-z0-9_]*        |
| int                   |        <número entero>         |            [0-9]+            |
| double                |        <número decimal>        |        [0-9]+\.[0-9]+        |
| char                  |        <cualquier char>        |        '[\x0-\x255]'         |
| boolean               |        <valor booleano>        |         true\|false          |
| string                |       <cualquier cadena>       |             ".*"             |

#### Palabras reservadas

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

### Símbolos no terminales

| Token                | Descripción                                                        |
| -------------------- | ------------------------------------------------------------------ |
| INI                  | Estado inicial de la sintáxis                                      |
| SS                   | Cuerpo del documento para declaración de funciones, métodos y exec |
| DECLARACION_FUNCION  | Declaración de una función                                         |
| DECLARACION_METODO   | Declaración de un método                                           |
| EXEC                 | Definición del inicio de la ejecución                              |
| PARAMETRO            | Parámetro de entrada a una función                                 |
| S                    | Cuerpo de una función, método, o cualquier otra estructura         |
| DECLARACION_VARIABLE | Declaración de una variable con su tipo                            |
| ASIGNACION_VARIABLE  | Asignación de valor a una variable                                 |
| INCREMENTO_VARIABLE  | Sentencia de incremento de una variable                            |
| INCREMENTO           | Incremento del valor de una variable numérica                      |
| DECREMENTO_VARIABLE  | Sentencia de decremento de una variable                            |
| DECREMENTO           | Decremento del valor de una variable numérica                      |
| DECLARACION_VECTOR   | Declaración de un vector                                           |
| ACCESI_VECTOR        | Acceso al valor de un vector en una posición específica            |
| MODIFICACION_VECTOR  | Modificación del valor de un vector en una posición específica     |
| DECLARACION_LISTA    | Declaración de una lista dinámica                                  |
| ADD_LISTA            | Agregación de un valor al final de una lista                       |
| ACCESO_LISTA         | Acceso al valor de una lista en una posición específica            |
| MODIFICACION_LISTA   | Modificación del valor de una lista en una posición específica     |
| S_IF                 | Sentencia de control if                                            |
| S_SWITCH             | Sentencia de control switch                                        |
| S_WHILE              | Sentencia cíclica while                                            |
| S_FOR                | Sentencia cíclica for                                              |
| S_DO                 | Sentencia cíclica do-while                                         |
| S_LLAMADA            | LLamada a una función o método previamente definid                 |
| S_RETURN             | Retorno de valor en una función                                    |
| TIPO                 | Tipo otorgado a una variable                                       |
| EXPRESION_ARITMETICA | Expresión de operación aritmética                                  |
| PRODUCCION_2         | d                                                                  |
| PRODUCCION_2         | d                                                                  |
| PRODUCCION_2         | d                                                                  |
| PRODUCCION_2         | d                                                                  |
| PRODUCCION_2         | d                                                                  |
| PRODUCCION_2         | d                                                                  |
| EOF                  | d                                                                  |

## Sintáxis

```rust

Estado inicial = INI

INI  =>  [SS] EOF

SS
     =>   [DECLARACION_FUNCION] [SS]
     |    [DECLARACION_METODO] [SS]
     |    [EXEC] [SS]
     |    error [SS]
     |    empty

DECLARACION_FUNCION
     =>   [TIPO] id parA [PARAMETRO] parB llaveA [S] llaveB
     |    [TIPO] id parA  parB llaveA [S] llaveB

DECLARACION_METODO
     =>   r_void id parA [PARAMETRO] parB llaveA [S] llaveB
     |    r_void id parA  parB llaveA [S] llaveB

TIPO
     =>   r_int
     |    r_double
     |    r_boolean
     |    r_char
     |    r_string

PARAMETRO
     =>   [TIPO] id
     |    [TIPO] id coma [PARAMETRO]

EXEC  =>  r_exec [S_LLAMADA]

S
     =>   [DECLARACION_VARIABLE] [S]
     |    [ASIGNACION_VARIABLE] [S]
     |    [INCREMENTO_VARIABLE] [S]
     |    [DECREMENTO_VARIABLE] [S]
     |    [DECLARACION_VECTOR] [S]
     |    [MODIFICACION_VECTOR] [S]
     |    [DECLARACION_LISTA] [S]
     |    [ADD_LISTA] [S]
     |    [MODIFICACION_LISTA] [S]
     |    [S_IF] [S]
     |    [S_SWITCH] [S]
     |    [S_WHILE] [S]
     |    [S_FOR] [S]
     |    [S_DO] [S]
     |    [S_LLAMADA] [S]
     |    [S_RETURN] [S]
     |    error [S]
     |    empty

DECLARACION_VARIABLE
     =>   [TIPO] id puntocoma
     |    [TIPO] id igual [VALOR] puntocoma

ASIGNACION_VARIABLE
     =>   [ASIGNACION] puntocoma

ASIGNACION
     =>   id igual [EXPRESION]

EXPRESION
     =>   [EXPRESION] opar_suma [EXPRESION]
     |    [EXPRESION] opar_resta [EXPRESION]
     |    [EXPRESION] opar_multiplicacion [EXPRESION]
     |    [EXPRESION] opar_division [EXPRESION]
     |    [EXPRESION] opar_potencia [EXPRESION]
     |    [EXPRESION] opar_modulo [EXPRESION]
     |    [EXPRESION] oprel_igualacion [EXPRESION]
     |    [EXPRESION] oprel_diferenciacion [EXPRESION]
     |    [EXPRESION] oprel_menor [EXPRESION]
     |    [EXPRESION] oprel_menorigual [EXPRESION]
     |    [EXPRESION] oprel_mayor [EXPRESION]
     |    [EXPRESION] oprel_mayorigual [EXPRESION]
     |    [EXPRESION] oplog_or [EXPRESION]
     |    [EXPRESION] oplog_and [EXPRESION]
     |    opar_resta [EXPRESION]
     |    parA [TIPO] parB [EXPRESION]
     |    oplog_not [EXPRESION]
     |    opar_resta [EXPRESION]
     |    parA [EXPRESION] parB
     |    id
     |    int
     |    double
     |    char
     |    string
     |    boolean
     |    [LLAMADA]
     |    [ACCESO_VECTOR]
     |    [ACCESO_LISTA]


INCREMENTO_VARIABLE  =>  [INCREMENTO] puntocoma

DECREMENTO_VARIABLE  =>  [DECREMENTO] puntocoma

INCREMENTO  =>  id opar_suma opar_suma

DECREMENTO  =>  id opar_resta opar_resta

LISTA_VALORES
     =>   [ELEMENTO_VALOR]
     |    empty

ELEMENTO_VALOR
     =>   [EXPRESION]
     |    [EXPRESION] coma [ELEMENTO_VALOR]


DECLARACION_VECTOR
     =>   [TIPO] corA corB id igual r_new [TIPO] corA [EXPRESION] corB puntocoma
     |    [TIPO] corA corB id igual llaveA [LISTA_VALORES] llaveB puntocoma

ACCESO_VECTOR  =>  id corA [EXPRESION] corB

MODIFICACION_VECTOR  =>  [ACCESO_VECTOR] igual [EXPRESION] puntocoma


DECLARACION_LISTA  =>  r_list menor [TIPO] mayor id igual r_new r_list menor [TIPO] mayor puntocoma

ADD_LISTA  =>  id punto add parA [EXPRESION] parB puntocoma

ACCESO_LISTA  =>  id corA corA [EXPRESION] corB corB

MODIFICACION_LISTA  =>  [ACCESO_LISTA] igual [EXPRESION] puntocoma

S_IF  =>  r_if parA [EXPRESION_BOOLEANA] parB llaveA [S] llaveB S_ELSE

S_ELSE
     =>   r_else llaveA [S] llaveB
     |    r_else S_IF
     |    empty

S_SWITCH  =>  r_switch parA id parB llaveA S_CASE llaveB

C
     =>  [S] [C]
     |   r_break puntocoma [C]

S_CASE
     =>   r_case [EXPRESION] dospuntos [C] S_CASE
     |    empty

S_DEFAULT  =>  r_default dospuntos [C]


S_WHILE  =>  r_while parA [CONDICION] parB llaveA [C] llaveB

S_FOR
     =>   r_for parA [DECLARACION_VARIABLE] [CONDICION] puntocoma [ACTUALIZACION] parB llaveA [C] llaveB
     |    r_for parA [ASIGNACION_VARIABLE] [CONDICION] puntocoma [ACTUALIZACION] parB llaveA [C] llaveB

CONDICION
     =>   [EXPRESION] oprel_igualacion [EXPRESION]
     |    [EXPRESION] oprel_diferenciacion [EXPRESION]
     |    [EXPRESION] oprel_menor [EXPRESION]
     |    [EXPRESION] oprel_menorigual [EXPRESION]
     |    [EXPRESION] oprel_mayor [EXPRESION]
     |    [EXPRESION] oprel_mayorigual [EXPRESION]
        
ACTUALIZACION
     =>   [INCREMENTO]
     |    [DECREMENTO]
     |    [ASIGNACION]

S_DO  =>  r_do llaveA [S] llaveB r_while parA [EXPRESION_BOOLEANA] parB puntocoma


S_LLAMADA  =>  [LLAMADA] puntocoma

LLAMADA  =>  id parA [LISTA_VALORES] parB

S_RETURN  =>  r_return [EXPRESION] puntocoma

```
