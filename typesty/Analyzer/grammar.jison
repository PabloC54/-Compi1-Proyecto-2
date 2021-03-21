%{
    function Exec(Llamada){
        return {
            Instruccion: "Exec",
            LLamada: Llamada
        }
    }

    function Funcion(Tipo, ID, Parametros, Instrucciones){
        return {
            Instruccion: "Funcion",
            Tipo: Tipo,
            ID: ID,
            Parametros: Parametros,
            Instrucciones: Instrucciones
        }
    }

    function Metodo(ID, Parametros, Instrucciones){
        return {
            Instruccion: "Metodo",
            Tipo: null,
            ID: ID,
            Parametros: Parametros,
            Instrucciones: Instrucciones
        }
    }

    function Parametro(Tipo, ID){
        return {
            Tipo: Tipo,
            ID: ID
        }
    }

    function Simbolo(Tipo, Valor){
        return {
            Tipo: Tipo,
            Valor: Valor
        }
    }

    function Operacion(Tipo, Izquierda, Derecha){
        return {
            Tipo: Tipo,
            Izquierda: Izquierda,
            Derecha: Derecha
        }
    }

    function Declaracion(Tipo, ID, Expresion){
        return {
            Instruccion: "Declaracion",
            Tipo: Tipo,
            ID: ID,
            Expresion: Expresion
        }
    }

    function Asignacion(ID, Expresion){
        return {
            Instruccion: "Asignacion",
            ID: ID,
            Expresion: Expresion
        }
    }

    function Ternaria(Condicion, Expresion_t, Expresion_f){
        return {
            Tipo: "Ternaria",
            Condicion: Condicion,
            Expresion_t: Expresion_t,
            Expresion_f: Expresion_f
        }
    }

    function LLamada(ID, Parametros){
        return {
            Instruccion: "Llamada",
            ID: ID,
            Parametros: Parametros
        }
    }

    function Incremento(ID){
        return {
            Instruccion: "Incremento",
            ID: ID
        }
    }

    function Decremento(ID){
        return {
            Instruccion: "Decremento",
            ID: ID
        }
    }

    function Vector(Tipo, ID, Tipo_i, Tamano, Valores){
        return {
            Instruccion: "Declarar_vector",
            Tipo: Tipo,
            ID: ID,
            Tipo_i: Tipo_i,
            Tamano: Tamano,
            Valores
        }
    }

    function Lista(Tipo, ID){
        return {
            Instruccion: "Declarar_lista",
            Tipo: Tipo,
            ID: ID
        }
    }

    function Acceso_vector(ID, Index){
        return {
            Instruccion: "Acceso_vector",
            ID: ID,
            Index: Index
        }
    }

    function Acceso_lista(ID, Index){
        return {
            Instruccion: "Acceso_lista",
            ID: ID,
            Index: Index
        }
    }

    function Modificacion_vector(ID, Index, Expresion){
        return {
            Instruccion: "Modificacion_vector",
            ID: ID,
            Index: Index,
            Expresion: Expresion
        }
    }

    function Modificacion_lista(ID, Index, Expresion){
        return {
            Instruccion: "Modificacion_lista",
            ID: ID,
            Index: Index,
            Expresion: Expresion
        }
    }

    function Add_lista(ID, Expresion){
        return {
            Instruccion: "Add_lista",
            ID: ID,
            Expresion: Expresion
        }
    }

    function If(Condicion, Instrucciones_t, Instrucciones_f){
        return {
            Instruccion: "If",
            Condicion: Condicion,
            Instrucciones_t: Instrucciones_t,
            Instrucciones_f: Instrucciones_f
        }
    }

    function Switch(Expresion, Cases, Default){
        return {
            Instruccion: "Switch",
            Expresion: Expresion,
            Cases: Cases,
            Default: Default
        }
    }

    function Case(Expresion, Instrucciones){
        return {
            Instruccion: "Case",
            Expresion: Expresion,
            Instrucciones: Instrucciones
        }
    }

    function While(Condicion, Instrucciones){
        return {
            Instruccion: "While",
            Condicion: Condicion,
            Instrucciones: Instrucciones
        }
    }

    function For(Inicializacion, Condicion, Actualizacion, Instrucciones){
        return {
            Instruccion: "For",
            Inicializacion: Inicializacion,
            Condicion: Condicion,
            Actualizacion: Actualizacion,
            Instrucciones: Instrucciones
        }
    }

    function Do_while(Condicion, Instrucciones){
        return {
            Instruccion: "Do-while",
            Condicion: Condicion,
            Instrucciones: Instrucciones
        }
    }

    function Return(Expresion){
        return {
            Instruccion:"Return",
            Expresion: Expresion
        }
    }

    function Break(){
        return {
            Instruccion:"Break"
        }
    }

    function Continue(){
        return {
            Instruccion:"Continue"
        }
    }
}%

%lex

%options case-insensitive

%%
[\040\r\t]+                           {/*ignorar*/}
\n                                    {/*ignorar*/}
"//".*                                {/*ignorar*/}
"/*"(\n)|[^*/]"*/"                    {/*ignorar*/}

(\\n)|(\\\\)|(\\\")|(\\t)|(\\\')      return "escape";
"+"                                   return "opar_suma";
"-"                                   return "opar_resta";
"*"                                   return "opar_multiplicacion";
"/"                                   return "opar_division";
"^"                                   return "opar_potencia";
"%"                                   return "opar_modulo";
"=="                                  return "oprel_igualacion";
"!="                                  return "oprel_diferenciacion";
"<="                                  return "oprel_menorigual";
">="                                  return "oprel_mayorigual";
"<"                                   return "oprel_menor";
">"                                   return "oprel_mayor";
"||"                                  return "oplog_or";
"&&"                                  return "oplog_and";
"!"                                   return "oplog_not";
"?"                                   return "ternary";
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
[0-9]+                                return "int";
[0-9]+"."[0-9]+                       return "double";
"'"[ABC]"'"                           return "char";
\"((\\\")|[^\n\"])*\"                 { yytext = yytext.substr(1,yyleng-2); return 'string'};
\'((\\\')|[^\n\'])*\'	              { yytext = yytext.substr(1,yyleng-2); return 'string'};

<<EOF>>                               return "EOF";
.                                     { console.error('(' + yylloc.first_line + ', ' + yylloc.first_column + ')  Error léxico: <' + yytext+'>'); }

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
        : SS EOF
                { console.log(JSON.stringify($1, null, 2)); } 
	    | error EOF
                { console.log("Sintactico","Error en : '"+yytext+"'",this._$.firstline,this.$.first_column); }
;

SS
        : SS DECLARACION_FUNCION
                { $$ = $1; $$.push($2); }
        | SS DECLARACION_METODO
                { $$ = $1; $$.push($2); }
        | SS EXEC
                { $$ = $1; $$.push($2); }
        | SS error
                { console.error("("+this._$.first_line + ", " + this._$.first_column+") Error sintáctico: "+yytext); }
        | /*empty*/
                { $$ = []; }
;

DECLARACION_FUNCION
        : TIPO id parA LISTA_PARAMETROS parB llaveA S llaveB
                { $$ = Funcion($1, $2, $4, $7); }
        | TIPO id parA parB llaveA S llaveB
                { $$ = Funcion($1, $2, null, $6); }
;

DECLARACION_METODO
        : r_void id parA LISTA_PARAMETROS parB llaveA S llaveB
                { $$ = Metodo($2, $4, $7); }
        | r_void id parA parB llaveA S llaveB
                { $$ = Metodo($2, [], $6); }
;

LISTA_PARAMETROS
        : LISTA_PARAMETROS coma PARAMETRO
                { $$ = $1; $$.push($3); }
        | PARAMETRO
                { $$ = [$1]; }
;

PARAMETRO
        : TIPO id
                { $$ = Parametro($1, $2); }
;

EXEC
        : r_exec S_LLAMADA
                { $$ = Exec($2); }
;

S
        : S DECLARACION_VARIABLE
                { $$ = $1; $$.push($2); }
        | S ASIGNACION_VARIABLE
                { $$ = $1; $$.push($2); }
        | S INCREMENTO_VARIABLE
                { $$ = $1; $$.push($2); }
        | S DECREMENTO_VARIABLE
                { $$ = $1; $$.push($2); }
        | S DECLARACION_VECTOR
                { $$ = $1; $$.push($2); }
        | S DECLARACION_LISTA
                { $$ = $1; $$.push($2); }
        | S ADD_LISTA
                { $$ = $1; $$.push($2); }
        | S MODIFICACION_LISTA
                { $$ = $1; $$.push($2); }
        | S S_IF
                { $$ = $1; $$.push($2); }
        | S S_SWITCH
                { $$ = $1; $$.push($2); }
        | S S_WHILE
                { $$ = $1; $$.push($2); }
        | S S_FOR
                { $$ = $1; $$.push($2); }
        | S S_DO
                { $$ = $1; $$.push($2); }
        | S S_LLAMADA
                { $$ = $1; $$.push($2); }
        | S S_RETURN
                { $$ = $1; $$.push($2); }
        | S S_BREAK
                { $$ = $1; $$.push($2); }
        | S S_CONTINUE
                { $$ = $1; $$.push($2); }
        | S error
                { console.error("("+this._$.first_line + ", " + this._$.first_column+") Error sintáctico: "+yytext); }
        | /*empty*/
                { $$ = []; }
;

DECLARACION_VARIABLE
        : TIPO id puntocoma
                { $$ = Declaracion($1, $2, null); }
        | TIPO id igual EXPRESION puntocoma
                { $$ = Declaracion($1, $2, $4); }
;

ASIGNACION_VARIABLE
        : id igual EXPRESION puntocoma
                { $$ = Asignacion($1, $3); }
        | id igual OPERACION_TERNARIA puntocoma
                { $$ = Asignacion($1, $3); }
;

OPERACION_TERNARIA
        : EXPRESION ternary EXPRESION dospuntos EXPRESION
                { $$ = Ternaria($1, $3, $5); }
;

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

EXPRESION
        : EXPRESION opar_suma EXPRESION
                { $$ = Operacion("suma", $1, $3); }
        | EXPRESION opar_resta EXPRESION
                { $$ = Operacion("resta", $1, $3); }
        | EXPRESION opar_multiplicacion EXPRESION
                { $$ = Operacion("multiplicacion", $1, $3); }
        | EXPRESION opar_division EXPRESION
                { $$ = Operacion("division", $1, $3); }
        | EXPRESION opar_potencia EXPRESION
                { $$ = Operacion("potencia", $1, $3); }
        | EXPRESION opar_modulo EXPRESION
                { $$ = Operacion("modulo", $1, $3); }
        | EXPRESION oprel_igualacion EXPRESION
                { $$ = Operacion("igualacion", $1, $3); }
        | EXPRESION oprel_diferenciacion EXPRESION
                { $$ = Operacion("diferenciacion", $1, $3); }
        | EXPRESION oprel_menor EXPRESION
                { $$ = Operacion("menor", $1, $3); }
        | EXPRESION oprel_menorigual EXPRESION
                { $$ = Operacion("menorigual", $1, $3); }
        | EXPRESION oprel_mayor EXPRESION
                { $$ = Operacion("mayor", $1, $3); }
        | EXPRESION oprel_mayorigual EXPRESION
                { $$ = Operacion("mayorigual", $1, $3); }
        | EXPRESION oplog_or EXPRESION
                { $$ = Operacion("or", $1, $3); }
        | EXPRESION oplog_and EXPRESION
                { $$ = Operacion("and", $1, $3); }
        | opar_resta EXPRESION %prec opar_negacion
                { $$ = Operacion("negacion", $2, null); }
        | oplog_not EXPRESION
                { $$ = Operacion("not", $2, null); }
        | parA TIPO parB EXPRESION
                { $$ = Operacion("casteo", $2, $4); }
        | parA EXPRESION parB
                { $$ = $2; }
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

LISTA_VALORES
        : LISTA_VALORES coma EXPRESION
                { $$ = $1; $$.push($3); }
        | EXPRESION
                { $$ = [$1]; }
;

DECLARACION_VECTOR
        : TIPO corA corB id igual r_new TIPO corA EXPRESION corB puntocoma
                { $$ = Vector($1, $4, $7, $9, null); }
        | TIPO corA corB id igual llaveA LISTA_VALORES llaveB puntocoma
                { $$ = Vector($1, $4, null, null, $7); }
;

ACCESO_VECTOR
        : id corA EXPRESION corB
                { $$ = Acceso_vector($1, $3); }
;

MODIFICACION_VECTOR
        : id corA EXPRESION corB igual EXPRESION puntocoma
                { $$ = Modificacion_vector($1, $3, $6); }
;

DECLARACION_LISTA
        : r_list menor TIPO mayor id igual r_new _list menor TIPO mayor puntocoma
                { $$ = Lista($3, $5, $10); }
;

ADD_LISTA
        : id punto r_add parA EXPRESION parB puntocoma
                { $$ = Add_lista($1, $5); }
;

ACCESO_LISTA
        : id corA corA EXPRESION corB corB
                { $$ = Acceso_lista($1, $4); }
;

MODIFICACION_LISTA
        : id corA corA EXPRESION corB corB igual EXPRESION puntocoma
                { $$ = Modificacion_lista($1, $4, $8); }
;

S_IF
        : r_if parA Expresion parB llaveA S llaveB S_ELSE
                { $$ = If($3, $6, $8); }
;


S_ELSE
        : r_else llaveA S llaveB
                { $$ = $3; }
        | r_else S_IF
                { $$ = $2; }
        | /*empty*/
                { $$ = null; }
;

S_SWITCH
        : r_switch parA EXPRESION parB llaveA S_CASE S_DEFAULT llaveB
                { $$ = Switch($3, $6, $7); }
;

S_CASE
        : S_CASE r_case EXPRESION dospuntos S
                { $$ = $1; $$.push(Case($3, $5)); }
        | /*empty*/
                { $$ = []; }
;

S_DEFAULT
        : r_default dospuntos S
                { $$ = Default($3); }
;

S_WHILE
        : r_while parA EXPRESION parB llaveA S llaveB
                { $$ = While($3, $6); }
;

S_FOR
        : r_for parA INICIALIZACION puntocoma EXPRESION puntocoma ACTUALIZACION parB llaveA S llaveB
                { $$ = For($3, $5, $7, $10); }
;

ASIGNACION
        : id igual EXPRESION
                { $$ = Asignacion($1, $3); }
;

DECLARACION
        : TIPO id igual EXPRESION
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

S_DO
        : r_do llaveA S llaveB r_while parA EXPRESION parB puntocoma
                { $$ = Do_while($7, $3); }
;

S_LLAMADA
        : LLAMADA puntocoma
                { $$ = $1; }
;

LLAMADA
        : id parA LISTA_VALORES parB
                { $$ = LLamada($1, $2); }
;

S_RETURN
        : r_return EXPRESION puntocoma
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
