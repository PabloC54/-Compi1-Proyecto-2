
%lex

%options case-insensitive

%%
\n                                                 {}
[\040\t\r]+                                        {}
"//".*                                             {}
[/][*][^*]*[*]+([^/][^*]*[*]+)*[/]                 {}

"+"                                                return "opar_suma";
"-"                                                return "opar_resta";
"*"                                                return "opar_multiplicacion";
"/"                                                return "opar_division";
"^"                                                return "opar_potencia";
"%"                                                return "opar_modulo";
"=="                                               return "oprel_igualacion";
"!="                                               return "oprel_diferenciacion";
"<="                                               return "oprel_menorigual";
">="                                               return "oprel_mayorigual";
"<"                                                return "oprel_menor";
">"                                                return "oprel_mayor";
"||"                                               return "oplog_or";
"&&"                                               return "oplog_and";
"!"                                                return "oplog_not";
"?"                                                return "ternary";
"("                                                return "parA";
")"                                                return "parB";
"["                                                return "corA";
"]"                                                return "corB";
"{"                                                return "llaveA";
"}"                                                return "llaveB";
"="                                                return "igual";
";"                                                return "puntocoma";
":"                                                return "dospuntos";
"."                                                return "punto";
","                                                return "coma";

"int"                                              return "r_int";
"double"                                           return "r_double";
"boolean"                                          return "r_boolean";
"char"                                             return "r_char";
"string"                                           return "r_string";
"list"                                             return "r_list";
"new"                                              return "r_new";
"if"                                               return "r_if";
"else"                                             return "r_else";
"switch"                                           return "r_switch";
"case"                                             return "r_case";
"default"                                          return "r_default";
"while"                                            return "r_while";
"for"                                              return "r_for";
"do"                                               return "r_do";
"break"                                            return "r_break";
"continue"                                         return "r_continue";
"return"                                           return "r_return";
"void"                                             return "r_void";
"add"                                              return "r_add";
"exec"                                             return "r_exec";

[0-9]+                                             return "int";
[0-9]+"."[0-9]+                                    return "double";
'[\x00-\x7F]'                                      return "char";
\"((\\n)|(\\\\)|(\\\")|(\\t)|(\\\')|[^\n\"])*\"    { yytext = yytext.substr(1,yyleng-2); return 'string'};
'((\\n)|(\\\\)|(\\\")|(\\t)|(\\\')|[^\n\'])*'      { yytext = yytext.substr(1,yyleng-2); return 'string'};
[a-z][a-z0-9_]*                                    return "id";

<<EOF>>                                            return "EOF";
.                                                  {console.error("error!");}
//.                                                  { console.error('(' + yylloc.first_line + ', ' + yylloc.first_column + ')  Error léxico: <' + yytext+'>'); }

/lex //PRECEDENCIA

%left "oplog_or"
%left "oplog_and"
%right "oplog_not"
%left "oprel_igualacion" "oprel_diferenciacion" "oprel_menor" "oprel_menorigual" "oprel_mayor" "oprel_mayorigual"
%left "opar_suma" "opar_resta"
%left "opar_multiplicacion" "opar_division" "opar_modulo"
%left "opar_potencia"
%left  opar_negacion

%start INI

%% // PARSER

INI
        : INS EOF
                {console.log($1);}
                //{ console.log(JSON.stringify($1, null, 2)); }
	| error EOF
                { console.error("("+this._$.first_line + ", " + this._$.first_column+") Error sintáctico: "+yytext); }
;

INS
        : INS S
                { $$ = $1; $$.push($2); }
        | S
                { $$ = [$1]; }
;

S
        : DECLARACION_FUNCION
                { $$ = $1; }
        | DECLARACION_METODO
                { $$ = $1; }
        | EXEC
                { $$ = $1; }
        | DECLARACION_VARIABLE
                { $$ = $1; }
        | ASIGNACION_VARIABLE
                { $$ = $1; }
        | INCREMENTO_VARIABLE
                { $$ = $1; }
        | DECREMENTO_VARIABLE
                { $$ = $1; }
        | DECLARACION_VECTOR
                { $$ = $1; }
        | DECLARACION_LISTA
                { $$ = $1; }
        | ADD_LISTA
                { $$ = $1; }
        | MODIFICACION_LISTA
                { $$ = $1; }
        | S_IF
                { $$ = $1; }
        | S_SWITCH
                { $$ = $1; }
        | S_WHILE
                { $$ = $1; }
        | S_FOR
                { $$ = $1; }
        | S_DO
                { $$ = $1; }
        | S_LLAMADA
                { $$ = $1; }
        | S_RETURN
                { $$ = $1; }
        | S_BREAK
                { $$ = $1; }
        | S_CONTINUE
                { $$ = $1; }
;

BLOQUE
        : llaveA INS llaveB
                { $$ = $2; }
        | llaveA llaveB
                { $$ = []; }
	| llaveA error llaveB
                { console.log("Recuperación de error en ",yytext," (",this._$.last_line,",",this._$.last_column,")"); }
;

DECLARACION_FUNCION
        : TIPO id parA PARAMETROS parB BLOQUE
                { $$ = {
            Instruccion: "Funcion",
            Tipo: $1,
            ID: $2,
            Parametros: $4,
            Instrucciones: $6
        }; }
        | TIPO id parA parB BLOQUE
                { $$ = {
            Instruccion: "Funcion",
            Tipo: $1,
            ID: $2,
            Parametros: null,
            Instrucciones: $5
        }; }
;

DECLARACION_METODO
        : r_void id parA PARAMETROS parB BLOQUE
                { $$ = {
            Instruccion: "Metodo",
            Tipo: null,
            ID: $2,
            Parametros: $4,
            Instrucciones: $6
        }; }
        | r_void id parA parB BLOQUE
                { $$ = {
            Instruccion: "Metodo",
            Tipo: null,
            ID: $2,
            Parametros: null,
            Instrucciones: $5
        }; }
;

PARAMETROS
        : PARAMETROS coma TIPO id
                { $$ = $1; $$.push({
            Tipo: $3,
            ID: $4
        }); }
        | TIPO id
                { $$ = [{
            Tipo: $1,
            ID: $2
        }]; }
;

EXEC
        : r_exec S_LLAMADA
                { $$ = {
            Instruccion: "Exec",
            Llamada: $2
        }; }
;

DECLARACION_VARIABLE
        : TIPO id puntocoma
                { $$ = {
            Instruccion: "Declaracion",
            Tipo: $1,
            ID: $2,
            E:null
        }; }
        | TIPO id igual E puntocoma
                { $$ = {
            Instruccion: "Declaracion",
            Tipo: $1,
            ID: $2,
            E: $4
        }; }
;

ASIGNACION_VARIABLE
        : id igual E puntocoma
                { $$ = {
            Instruccion: "Asignacion",
            ID: $1,
            E: $3
        }; }
        //| id igual OPERACION_TERNARIA puntocoma
        //        { $$ = Asignacion($1, $3); }
;

//OPERACION_TERNARIA
//        : E ternary E dospuntos E
//                { $$ = Ternaria($1, $3, $5); }
//;

TIPO
        : r_int
                { $$ = $1; }
        | r_double
                { $$ = $1; }
        | r_boolean
                { $$ = $1; }
        | r_char
                { $$ = $1; }
        | r_string
                { $$ = $1; }
;

E
        : E opar_suma E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | E opar_resta E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | E opar_multiplicacion E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | E opar_division E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | E opar_potencia E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | E opar_modulo E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | E oprel_igualacion E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | E oprel_diferenciacion E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | E oprel_menor E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | E oprel_menorigual E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | E oprel_mayor E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | E oplog_or E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | E oplog_and E
                { $$ = {
            Izquierda: $1,
            Derecha: $3
        }; }
        | opar_resta E %prec opar_negacion
                { $$ = {
            Izquierda: $2,
            Derecha: null
        }; }
        | oplog_not E
                { $$ = {
            Izquierda: $2,
            Derecha: null
        }; }
        | parA E parB
                { $$ = $2; }
        | LLAMADA
                { $$ = $1; }
        | ACCESO_VECTOR
                { $$ = $1; }
        | ACCESO_LISTA
                { $$ = $1; }
        | id
                { $$ = {
            Tipo: "id",
            Valor: $1
        }; }
        | int
                { $$ = {
            Tipo: "int",
            Valor: $1
        }; }
        | double
                { $$ = {
            Tipo: "double",
            Valor: $1
        }; }
        | char
                { $$ = {
            Tipo: "char",
            Valor: $1
        }; }
        | string
                { $$ = {
            Tipo: "string",
            Valor: $1
        }; }
        | boolean
                { $$ = {
            Tipo: "boolean",
            Valor: $1
        }; }
;

INCREMENTO_VARIABLE
        : INCREMENTO puntocoma
                { $$ = $1; }
;

DECREMENTO_VARIABLE
        : DECREMENTO puntocoma
                { $$ = $1; }
;

INCREMENTO
        : id opar_suma opar_suma
                { $$ = {
            Instruccion: "Incremento",
            ID: $1
        }; }
;

DECREMENTO
        : id opar_resta opar_resta
                { $$ = {
            Instruccion: "Decremento",
            ID: $1
        }; }
;

VALORES
        : VALORES coma E
                { $$ = $1; $$.push($3); }
        | E
                { $$ = [$1]; }
;

DECLARACION_VECTOR
        : TIPO corA corB id igual r_new TIPO corA E corB puntocoma
                { $$ = {
            Instruccion: "Declarar_vector"
        }; }
        | TIPO corA corB id igual llaveA VALORES llaveB puntocoma
                { $$ = {
            Instruccion: "Declarar_vector"
        }; }
;

ACCESO_VECTOR
        : id corA E corB
                { $$ = {
            Instruccion: "Declarar_vector"
        }; }
;

MODIFICACION_VECTOR
        : id corA E corB igual E puntocoma
                { $$ = {
            Instruccion: "Declarar_vector"
        }; }
;

DECLARACION_LISTA
        : r_list menor TIPO mayor id igual r_new _list menor TIPO mayor puntocoma
                { $$ = {
            Instruccion: "Declarar_vector"
        }; }
;

ADD_LISTA
        : id punto r_add parA E parB puntocoma
                { $$ = {
            Instruccion: "Declarar_vector"
        }; }
;

ACCESO_LISTA
        : id corA corA E corB corB
                { $$ = {
            Instruccion: "Declarar_vector"
        }; }
;

MODIFICACION_LISTA
        : id corA corA E corB corB igual E puntocoma
                { $$ = {
            Instruccion: "Declarar_vector"
        }; }
;

S_IF
        : r_if parA E parB BLOQUE
                { $$ = {
            Instruccion: "If",
            Condicion: $3,
            Instrucciones_t: $5,
            Instrucciones_f: null
        }; }
        | r_if parA E parB BLOQUE S_ELSE
                { $$ = {
            Instruccion: "If",
            Condicion: $3,
            Instrucciones_t: $5,
            Instrucciones_f: $6
        }; }
	| r_if parA error llaveB
                { console.log("Recuperación de error en ",yytext," (",this._$.last_line,",",this._$.last_column,")"); }
;


S_ELSE
        : r_else BLOQUE
                { $$ = $2; }
        | r_else S_IF
                { $$ = $2; }
;

S_SWITCH
        : r_switch parA E parB llaveA CASES S_DEFAULT llaveB
                { $$ = {
            Instruccion: "Switch",
            E: $3,
            Cases: $6,
            Default: $7
        };}
        | r_switch parA E parB llaveA CASES llaveB
                { $$ = {
            Instruccion: "Switch",
            E: $3,
            Cases: $6,
            Default: null
        };}
        | r_switch parA error llaveB
                { console.log("Recuperación de error en ",yytext," (",this._$.last_line,",",this._$.last_column,")"); }
;

CASES
        : CASES r_case E dospuntos INS
                { $$ = $1; $$.push( {
            Instruccion: "Case",
            E: $3,
            Instrucciones: $5
        }); }
        | r_case E dospuntos INS
                { $$ = {
            Instruccion: "Case",
            E: $3,
            Instrucciones: $5
        }; }
;

S_DEFAULT
        : r_default dospuntos INS
                { $$ = {i:"def"}; }
;

S_WHILE
        : r_while parA E parB BLOQUE
                { $$ = {
            Instruccion: "While",
            Condicion: $3,
            Instrucciones: $5
        }; }
        | r_while parA error llaveB
                { console.log("Recuperación de error en ",yytext," (",this._$.last_line,",",this._$.last_column,")"); }
;

S_FOR
        : r_for parA INICIALIZACION puntocoma E puntocoma ACTUALIZACION parB BLOQUE
                { $$ = {Instruccion:For} }
        | r_for parA error llaveB
                { console.log("Recuperación de error en ",yytext," (",this._$.last_line,",",this._$.last_column,")"); }
;

INICIALIZACION
        : ASIGNACION
                { $$ = $1; }
        | DECLARACION
                { $$ = $1; }
;

ACTUALIZACION
        : INCREMENTO
                { $$ = $1; }
        | DECREMENTO
                { $$ = $1; }
        | ASIGNACION
                { $$ = $1; }
;

ASIGNACION
        : id igual E
        { $$ ={
            Instruccion: "Asignacion",
            ID: $1,
            E: $3
            }
        }
;

DECLARACION
        : TIPO id igual E
                { $$ = {
            Instruccion: "Declaracion",
            Tipo: $1,
            ID: $2,
            E: $4
        }; }
;

S_DO
        : r_do BLOQUE r_while parA E parB puntocoma
                { $$ = {Instruccion:DO} }
        | r_do error puntocoma
                { console.log("Recuperación de error en ",yytext," (",this._$.last_line,",",this._$.last_column,")"); }
;

S_LLAMADA
        : LLAMADA puntocoma
                { $$ = $1; }
;

LLAMADA
        : id parA parB
                { $$ = {Instruccion:Llamada} }
        | id parA VALORES parB
                { $$ = {Instruccion:Llamada} }
;

S_RETURN
        : r_return E puntocoma
                { $$ = {Instruccion:Return}; }
;

S_BREAK
        : r_break puntocoma
                { $$ = {Instruccion:Break}; }
;

S_CONTINUE
        : r_continue puntocoma
                { $$ = {Instruccion:Continue}; }
;
