# Gramática de Regexive

## Alfabeto

### Símbolos terminales

#### Expresiones regulares

|         Token         |             Lexema             |            Patrón            |
| :-------------------: | :----------------------------: | :--------------------------: |
|           L           |          **_letra_**           |          [a-zA-ZñÑ]          |
|      comentario       |   \<comentario de una linea>   |             //.*             |
| comentario_multilinea | \<comentario de varias líneas> |      /\*(\n)\|[^/\*]\*/      |
|        escape         |     \<secuencia de escape>     | (\n)\|(\\)\|(\")\|(\t)\|(\') |
|       opar_suma       |               +                |              +               |
|      opar_resta       |               -                |              -               |
|  opar_multiplicacion  |               \*               |              \*              |
|     opar_division     |               /                |              /               |
|     opar_potencia     |               ^                |              ^               |
|      opar_modulo      |               %                |              %               |
|   oprel_igualacion    |               ==               |              ==              |
| oprel_diferenciacion  |               !=               |              !=              |
|      oprel_menor      |               <                |              <               |
|   oprel_menorigual    |               <=               |              <=              |
|      oprel_mayor      |               >                |              >               |
|   oprel_mayorigual    |               >=               |              >=              |
|       oplog_or        |              \|\|              |             \|\|             |
|       oplog_and       |               &&               |              &&              |
|       oplog_not       |               !                |              !               |
|         parA          |               (                |              (               |
|         parB          |               )                |              )               |
|        llaveA         |               {                |              {               |
|        llaveB         |               }                |              }               |
|        corchA         |               [                |              [               |
|        corchB         |               ]                |              ]               |
|         igual         |               =                |              =               |
|       puntocoma       |               ;                |              ;               |
|         punto         |               .                |              .               |
|         coma          |               ,                |              ,               |
|        llaveB         |              VAR               |             VAR              |
|        llaveB         |              VAR               |             VAR              |

#### Palabras reservadas

|    Token    |   Lexema    |
| :---------: | :---------: |
|     int     |     int     |
|   double    |   double    |
|   boolean   |   boolean   |
|    char     |    char     |
|   string    |   string    |
|    list     |    list     |
|     new     |     new     |
|     if      |     if      |
|    else     |    else     |
|   switch    |   switch    |
|    case     |    case     |
|   default   |   default   |
|    while    |    while    |
|     for     |     for     |
|     do      |     do      |
|    break    |    break    |
|  continue   |  continue   |
|   return    |   return    |
|    void     |    void     |
|   tolower   |   tolower   |
|   toupper   |   toupper   |
|  truncate   |  truncate   |
|    round    |    round    |
|   typeof    |   typeof    |
|  tostring   |  tostring   |
| tochararray | tochararray |
|    exec     |    exec     |
|    print    |    print    |

### Símbolos no terminales

- INI
- PRODUCCION_1
- PRODUCCION_2

## Sintáxis

```sh
Estado inicial = INI

INI => [PRODUCCION_1]
     | [PRODUCCION_2]
```