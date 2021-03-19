

%lex

%options case-insensitive

%% //SCANNER


[\040\t\r]+                           {/*ignorar*/}
\n                                    {/*ignorar*/}
"//".*                                {/*ignorar*/}
"/*"(\n)|[^/*]"*/"                    {/*ignorar*/}

(\\n)|(\\\\)|(\\\")|(\\t)|(\\\')      return "escape";
"+"                                   return "opar_suma";
"-"                                   return "opar_resta";
"*"                                   return "opar_multiplicacion";
"/"                                   return "opar_division";
"^"                                   return "opar_potencia";
"%"                                   return "opar_modulo";
"=="                                  return "oprel_igualacion";
"!="                                  return "oprel_diferenciacion";
"<"                                   return "oprel_menor";
"<="                                  return "oprel_menorigual";
">"                                   return "oprel_mayor";
">="                                  return "oprel_mayorigual";
"||"                                  return "oplog_or";
"&&"                                  return "oplog_and";
"!"                                   return "oplog_not";
"("                                   return "parA";
")"                                   return "parB";
"["                                   return "corA";
"]"                                   return "corB";
"{"                                   return "llaveA";
"}"                                   return "llaveB";
"="                                   return "igual";
";"                                   return "puntocoma";
":"                                   return "dospuntos";
"."                                   return "punto";
","                                   return "coma";
"'"                                   return "comilla_simple";
"\""                                  return "comilla_doble";

"int"                                 return "r_int";
"double"                              return "r_double";
"boolean"                             return "r_boolean";
"char"                                return "r_char";
"string"                              return "r_string";
"list"                                return "r_list";
"new"                                 return "r_new";
"if"                                  return "r_if";
"else"                                return "r_else";
"switch"                              return "r_switch";
"case"                                return "r_case";
"default"                             return "r_default";
"while"                               return "r_while";
"for"                                 return "r_for";
"do"                                  return "r_do";
"break"                               return "r_break";
"continue"                            return "r_continue";
"return"                              return "r_return";
"void"                                return "r_void";
"add"                                 return "r_add";
"exec"                                return "r_exec";

[a-z][a-z0-9_]*                       return "id";
[0-9]("."[0-9]*)?                     return "numero ";
"'"[\x0\x255]"'"                      return "char";
\".*\"                                return "string";

<<EOF>>                               return 'EOF';
.                                     {console.error('(' + yylloc.first_line + ', ' + yylloc.first_column + ')  Error léxico: <' + yytext+'>')}

\lex //PRECEDENCIA

%left "oplog_or"
%left "oplog_and"
%left "oplog_not"
%left "oprel_igualacion" "oprel_diferenciacion" "oprel_menor" "oprel_menorigual" "oprel_mayor" "oprel_mayorigual"
%left "opar_suma" "opar_resta"
%left "opar_multiplicacion" "opar_division" "opar_modulo"
%left "opar_potencia"
//%left "opar_menor" negacion unitaria

%% // PARSER

%start INI

INI
        : SS EOF
;

SS
        : DECLARACION_FUNCION SS
        | DECLARACION_METODO SS
        | EXEC SS
        | error S                                       {console.error("("+this._$.first_line + ", " + this._$.first_column+") Error sintáctico: "+yytext);}
        | /*empty*/
;

DECLARACION_FUNCION
        : TIPO id parA PARAMETRO parB llaveA S llaveB
        | TIPO id parA parB llaveA S llaveB
;

DECLARACION_METODO
        : void id parA PARAMETRO parB llaveA S llaveB
        | void id parA parB llaveA S llaveB
;

PARAMETRO
        : TIPO id
        | TIPO id coma PARAMETRO
;

EXEC
        : r_exec S_LLAMADA
;

S
        : DECLARACION_VARIABLE S
        | ASIGNACION_VARIABLE S
        | INCREMENTO_VARIABLE S
        | DECREMENTO_VARIABLE S
        | DECLARACION_VECTOR S
        | DECLARACION_LISTA S
        | ADD_LISTA S
        | MODIFICACION_LISTA S
        | S_IF S
        | S_SWITCH S
        | S_WHILE S
        | S_FOR S
        | S_DO S
        | S_LLAMADA S
        | S_RETURN S
        | error S                                       {console.error("("+this._$.first_line + ", " + this._$.first_column+") Error sintáctico: "+yytext);}
        | /*empty*/
;

DECLARACION_VARIABLE
        : TIPO id puntocoma
        | TIPO id igual VALOR puntocoma
;

ASIGNACION_VARIABLE
        : ASIGNACION puntocoma
;

ASIGNACION
        : id igual VALOR
;

TIPO
        : r_int
        | r_double
        | r_boolean
        | r_char
        | r_string
;

/* W I P 

VALOR
        : parA TIPO parB VALOR
;

EXPRESION_ARITMETICA
        : EXPRESION_ARITMETICA opar_suma EXPRESION_ARITMETICA
;

EXPRESION_BOOLEANA
        : EXPRESION_BOOLEANA oprel_igualacion EXPRESION_BOOLEANA
;

*/

INCREMENTO_VARIABLE
        : INCREMENTO puntocoma
;

DECREMENTO_VARIABLE
        : DECREMENTO puntocoma
;

INCREMENTO
        : id opar_suma opar_suma
;

DECREMENTO
        : id opar_resta opar_resta
;

LISTA_VALORES
        : ELEMENTO_VALOR
        | /*empty*/
;

ELEMENTO_VALOR
        : VALOR
        | VALOR coma ELEMENTO_VALOR
;

DECLARACION_VECTOR
        : TIPO corA corB id igual r_new TIPO corA VALOR corB puntocoma
        | TIPO corA corB id igual llaveA LISTA_VALORES llaveB puntocoma
;

ACCESO_VECTOR
        : id corA VALOR corB
;

MODIFICACION_VECTOR
        : ACCESO_VECTOR igual VECTOR puntocoma
;

DECLARACION_LISTA
        : r_list menor TIPO mayor id igual r_new _list menor TIPO mayor puntocoma
;

ADD_LISTA
        : id punto add parA VALOR parB puntocoma
;

ACCESO_LISTA
        : id corA corA VALOR corB corB
;

MODIFICACION_LISTA
        : ACCESO_LISTA igual VALOR puntocoma
;

S_IF
        : r_if parA EXPRESION_BOOLEANA parB llaveA S llaveB S_ELSE
;


S_ELSE
        : r_else llaveA S llaveB
        | r_else S_IF
        | /*empty*/
;

S_SWITCH
        : r_switch parA id parB llaveA S_CASE llaveB
;

S_CASE
        : r_case VALOR dospuntos S /*BREAK*/ S_CASE
        | /*empty*/
;

S_DEFAULT
        : r_default dospuntos S /*BREAK*/
;

S_WHILE
        : r_while parA EXPRESION_BOOLEANA parB llaveA S llaveB
;

S_FOR
        : r_for parA DECLARACION_VARIABLE EXPRESION_BOOLEANA puntocoma ACTUALIZACION parB llaveA S llaveB
        | r_for parA ASIGNACION_VARIABLE EXPRESION_BOOLEANA puntocoma ACTUALIZACION parB llaveA S llaveB
;

ACTUALIZACION
        : INCREMENTO
        | DECREMENTO
        | ASIGNACION
;

S_DO
        : r_do llaveA S llaveB r_while parA EXPRESION_BOOLEANA parB puntocoma
;

S_LLAMADA
        : LLAMADA puntocoma
;

LLAMADA
        : id parA LISTA_VALORES parB
;

S_RETURN
        : r_return VALOR puntocoma
;




