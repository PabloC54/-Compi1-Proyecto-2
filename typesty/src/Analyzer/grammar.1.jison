%{const Exec = function (Llamada) {
	return { Instruccion: "hola" };
};

const Funcion = function (Tipo, ID, Parametros, Instrucciones) {
	return { Instruccion: "hola" };
};

const Metodo = function (ID, Parametros, Instrucciones) {
	return { Instruccion: "hola" };
};

const Parametro = function (Tipo, ID) {
	return { Instruccion: "hola" };
};

const Operacion = function (Tipo, Izquierda, Derecha) {
	return { Instruccion: "hola" };
};

const Simbolo = function (Tipo, Valor) {
	return { Instruccion: "hola" };
};

const Declaracion = function (Tipo, ID, E) {
	return { Instruccion: "hola" };
};

const Asignacion = function (ID, E) {
	return { Instruccion: "hola" };
};

const Ternaria = function (Condicion, E_t, E_f) {
	return { Instruccion: "hola" };
};

const Llamada = function (ID, Parametros) {
	return { Instruccion: "hola" };
};

const Incremento = function (ID) {
	return { Instruccion: "hola" };
};

const Decremento = function (ID) {
	return { Instruccion: "hola" };
};

const Vector = function (Tipo, ID, Tipo_i, Tamano, Valores) {
	return { Instruccion: "hola" };
};

const Lista = function (Tipo, ID) {
	return { Instruccion: "hola" };
};

const Acceso_vector = function (ID, Index) {
	return { Instruccion: "hola" };
};

const Acceso_lista = function (ID, Index) {
	return { Instruccion: "hola" };
};

const Modificacion_vector = function (ID, Index, E) {
	return { Instruccion: "hola" };
};

const Modificacion_lista = function (ID, Index, E) {
	return { Instruccion: "hola" };
};

const Add_lista = function (ID, E) {
	return { Instruccion: "hola" };
};

const If = function (Condicion, Instrucciones_t, Instrucciones_f) {
	return { Instruccion: "hola" };
};

const Switch = function (E, Cases, Default) {
	return { Instruccion: "hola" };
};

const Case = function (E, Instrucciones) {
	return { Instruccion: "hola" };
};

const While = function (Condicion, Instrucciones) {
	return { Instruccion: "hola" };
};

const For = function (Inicializacion, Condicion, Actualizacion, Instrucciones) {
	return { Instruccion: "hola" };
};

const Do_while = function (Condicion, Instrucciones) {
	return { Instruccion: "hola" };
};

const Return = function (E) {
	return { Instruccion: "hola" };
};

const Break = function () {
	return { Instruccion: "hola" };
};

const Continue = function () {
	return { Instruccion: "hola" };
};

}%

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
                { $$ = Funcion($1, $2, $4, $5); }
        | TIPO id parA parB BLOQUE
                { $$ = Funcion($1, $2, null, $4); }
;

DECLARACION_METODO
        : r_void id parA PARAMETROS parB BLOQUE
                { $$ = Metodo($2, $4, $6); }
        | r_void id parA parB BLOQUE
                { $$ = Metodo($2, [], $5); }
;

PARAMETROS
        : PARAMETROS coma TIPO id
                { $$ = $1; $$.push(Parametro($3, $4)); }
        | TIPO id
                { $$ = [Parametro($1, $2)]; }
;

EXEC
        : r_exec S_LLAMADA
                { $$ = Exec($2); }
;

DECLARACION_VARIABLE
        : TIPO id puntocoma
                { $$ = Declaracion($1, $2, null); }
        | TIPO id igual E puntocoma
                { $$ = Declaracion($1, $2, $4); }
;

ASIGNACION_VARIABLE
        : id igual E puntocoma
                { $$ = Asignacion($1, $3); }
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
                { $$ = Operacion("suma", $1, $3); }
        | E opar_resta E
                { $$ = Operacion("resta", $1, $3); }
        | E opar_multiplicacion E
                { $$ = Operacion("multiplicacion", $1, $3); }
        | E opar_division E
                { $$ = Operacion("division", $1, $3); }
        | E opar_potencia E
                { $$ = Operacion("potencia", $1, $3); }
        | E opar_modulo E
                { $$ = Operacion("modulo", $1, $3); }
        | E oprel_igualacion E
                { $$ = Operacion("igualacion", $1, $3); }
        | E oprel_diferenciacion E
                { $$ = Operacion("diferenciacion", $1, $3); }
        | E oprel_menor E
                { $$ = Operacion("menor", $1, $3); }
        | E oprel_menorigual E
                { $$ = Operacion("menorigual", $1, $3); }
        | E oprel_mayor E
                { $$ = Operacion("mayor", $1, $3); }
        | E oprel_mayorigual E
                { $$ = Operacion("mayorigual", $1, $3); }
        | E oplog_or E
                { $$ = Operacion("or", $1, $3); }
        | E oplog_and E
                { $$ = Operacion("and", $1, $3); }
        | opar_resta E %prec opar_negacion
                { $$ = Operacion("negacion", $2, null); }
        | oplog_not E
                { $$ = Operacion("not", $2, null); }
        //| parA E parB
        //        { $$ = $2; }
        | LLAMADA
                { $$ = $1; }
        | ACCESO_VECTOR
                { $$ = $1; }
        | ACCESO_LISTA
                { $$ = $1; }
        | id
                { $$ = Simbolo("id", $1); }
        | int
                { $$ = Simbolo("int", $1); }
        | double
                { $$ = Simbolo("double", $1); }
        | char
                { $$ = Simbolo("char", $1); }
        | string
                { $$ = Simbolo("string", $1); }
        | boolean
                { $$ = Simbolo("boolean", $1); }
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
                { $$ = Incremento($1); }
;

DECREMENTO
        : id opar_resta opar_resta
                { $$ = Decremento($1); }
;

VALORES
        : VALORES coma E
                { $$ = $1; $$.push($3); }
        | E
                { $$ = [$1]; }
;

DECLARACION_VECTOR
        : TIPO corA corB id igual r_new TIPO corA E corB puntocoma
                { $$ = Vector($1, $4, $7, $9, null); }
        | TIPO corA corB id igual llaveA VALORES llaveB puntocoma
                { $$ = Vector($1, $4, null, null, $7); }
;

ACCESO_VECTOR
        : id corA E corB
                { $$ = Acceso_vector($1, $3); }
;

MODIFICACION_VECTOR
        : id corA E corB igual E puntocoma
                { $$ = Modificacion_vector($1, $3, $6); }
;

DECLARACION_LISTA
        : r_list menor TIPO mayor id igual r_new _list menor TIPO mayor puntocoma
                { $$ = Lista($3, $5, $10); }
;

ADD_LISTA
        : id punto r_add parA E parB puntocoma
                { $$ = Add_lista($1, $5); }
;

ACCESO_LISTA
        : id corA corA E corB corB
                { $$ = Acceso_lista($1, $4); }
;

MODIFICACION_LISTA
        : id corA corA E corB corB igual E puntocoma
                { $$ = Modificacion_lista($1, $4, $8); }
;

S_IF
        : r_if parA E parB BLOQUE
                { $$ = If($3, $5, null); }
        | r_if parA E parB BLOQUE S_ELSE
                { $$ = If($3, $5, $6); }
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
                { $$ = Switch($3, $6, $7); }
        | r_switch parA E parB llaveA CASES llaveB
                { $$ = Switch($3, $6, $7); }
        | r_switch parA error llaveB
                { console.log("Recuperación de error en ",yytext," (",this._$.last_line,",",this._$.last_column,")"); }
;

CASES
        : CASES r_case E dospuntos INS
                { $$ = $1; $$.push(Case($3, $5)); }
        | r_case E dospuntos INS
                { $$ = [Case($2, $4)]; }
;

S_DEFAULT
        : r_default dospuntos INS
                { $$ = Default($3); }
;

S_WHILE
        : r_while parA E parB BLOQUE
                { $$ = While($3, $5); }
        | r_while parA error llaveB
                { console.log("Recuperación de error en ",yytext," (",this._$.last_line,",",this._$.last_column,")"); }
;

S_FOR
        : r_for parA INICIALIZACION puntocoma E puntocoma ACTUALIZACION parB BLOQUE
                { $$ = For($3, $5, $7, $9); }
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
                { $$ = Asignacion($1, $3); }
;

DECLARACION
        : TIPO id igual E
                { $$ = Declaracion($1, $2, $3); }
;

S_DO
        : r_do BLOQUE r_while parA E parB puntocoma
                { $$ = Do_while($5, $2); }
        | r_do error puntocoma
                { console.log("Recuperación de error en ",yytext," (",this._$.last_line,",",this._$.last_column,")"); }
;

S_LLAMADA
        : LLAMADA puntocoma
                { $$ = $1; }
;

LLAMADA
        : id parA parB
                { $$ = Llamada($1, null); }
        | id parA VALORES parB
                { $$ = Llamada($1, $2); }
;

S_RETURN
        : r_return E puntocoma
                { $$ = Return($2); }
;

S_BREAK
        : r_break puntocoma
                { $$ = Break(); }
;

S_CONTINUE
        : r_continue puntocoma
                { $$ = Continue(); }
;
