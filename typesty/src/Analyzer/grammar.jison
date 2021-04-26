%{
  const s = require('/home/pablo/Documentos/src/Universidad/-Compi1-Proyecto-2/typesty/src/Analyzer/symbols.js')
  const errors = []

  const Error = function (Linea, Columna, Tipo, Mensaje) {
    errors.push({
      Linea,
      Columna,
      Tipo,
      Mensaje
    })
  }

  const getErrores = function () {
    const temp = [...errors];
    errors.length = 0;
    return temp;
  }
%}

%lex

%options case-insensitive

%%
[\040\t\r]+                                        {}
\n                                                 {}
'//'.*                                             {}
'/*'([^*]|[\r\n]|('*'+([^*/]|[\r\n])))*'*'+'/'     {}

'+'                                                return 'opar_suma';
'-'                                                return 'opar_resta';
'*'                                                return 'opar_multiplicacion';
'/'                                                return 'opar_division';
'^'                                                return 'opar_potencia';
'%'                                                return 'opar_modulo';
'=='                                               return 'oprel_igualacion';
'!='                                               return 'oprel_diferenciacion';
'<='                                               return 'oprel_menorigual';
'>='                                               return 'oprel_mayorigual';
'<'                                                return 'oprel_menor';
'>'                                                return 'oprel_mayor';
'||'                                               return 'oplog_or';
'&&'                                               return 'oplog_and';
'!'                                                return 'oplog_not';
'?'                                                return 'ternario';
'('                                                return 'parA';
')'                                                return 'parB';
'['                                                return 'corA';
']'                                                return 'corB';
'{'                                                return 'llaveA';
'}'                                                return 'llaveB';
'='                                                return 'igual';
';'                                                return 'puntocoma';
':'                                                return 'dospuntos';
'.'                                                return 'punto';
','                                                return 'coma';

'int'                                              return 'r_int';
'double'                                           return 'r_double';
'boolean'                                          return 'r_boolean';
'char'                                             return 'r_char';
'string'                                           return 'r_string';
'list'                                             return 'r_list';
'new'                                              return 'r_new';
'if'                                               return 'r_if';
'else'                                             return 'r_else';
'switch'                                           return 'r_switch';
'case'                                             return 'r_case';
'default'                                          return 'r_default';
'while'                                            return 'r_while';
'for'                                              return 'r_for';
'do'                                               return 'r_do';
'break'                                            return 'r_break';
'continue'                                         return 'r_continue';
'return'                                           return 'r_return';
'void'                                             return 'r_void';
'add'                                              return 'r_add';
'exec'                                             return 'r_exec';

'true'|'false'                                     return 'boolean';
[0-9]+'.'[0-9]+                                    return 'double';
[0-9]+                                             return 'int';
\'[\x00-\x7F]\'                                    { yytext = yytext.substr(1, yyleng - 2); return 'char'; }
\"((\\n)|(\\\\)|(\\\')|(\\t)|(\\\")|[^\n\"])*\"    { yytext = yytext.substr(1, yyleng - 2); return 'string'; }
[a-z][a-z0-9_]*                                    return 'id';

<<EOF>>                                            return 'EOF';
.                                                  { Error(yylloc.first_line, yylloc.first_column, 'Léxico', `No se reconoció el lexema '${yytext}'`); }

/lex

%left JError
%right ternario

%left 'oplog_or'
%left 'oplog_and'
%right 'oplog_not'
%left 'oprel_igualacion' 'oprel_diferenciacion' 'oprel_menor' 'oprel_menorigual' 'oprel_mayor' 'oprel_mayorigual'
%left 'opar_suma' 'opar_resta'
%left 'opar_multiplicacion' 'opar_division' 'opar_modulo'
%left 'opar_potencia'
%right op_negacion

%right op_casteo
%nonassoc op_incremento op_decremento
%left op_call
%left op_vector op_list
%nonassoc op_group


%start INI

%% // PARSER

INI
        : INS EOF
                { return { body: $1, errors: getErrores() } }
	| error EOF
                { Error(this._$.last_line, this._$.last_column, 'Sintáctico', `Se recuperó en '${yytext}'`); }
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
        | MODIFICACION_VECTOR
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
                { Error(this._$.last_line, this._$.last_column, 'Sintáctico', `Se recuperó en '${yytext}'`); }
;

DECLARACION_FUNCION
        : TIPO id parA PARAMETROS parB BLOQUE
                { $$ = s.Funcion(this._$.first_line, this._$.first_column, $1, $2, $4, $6); }
        | TIPO id parA parB BLOQUE
                { $$ = s.Funcion(this._$.first_line, this._$.first_column, $1, $2, [], $5); }
        | TIPO id parA error llaveB
                { Error(this._$.last_line, this._$.last_column, 'Sintáctico', `Se recuperó en '${yytext}'`); }
;

DECLARACION_METODO
        : r_void id parA PARAMETROS parB BLOQUE
                { $$ = s.Metodo(this._$.first_line, this._$.first_column, $2, $4, $6); }
        | r_void id parA parB BLOQUE
                { $$ = s.Metodo(this._$.first_line, this._$.first_column, $2, [], $5); }
        | r_void id parA error llaveB
                { Error(this._$.last_line, this._$.last_column, 'Sintáctico', `Se recuperó en '${yytext}'`); }
;

PARAMETROS
        : PARAMETROS coma TIPO id
                { $$ = $1; $$.push(s.Parametro(this._$.first_line, this._$.first_column, $3, $4)); }
        | TIPO id
                { $$ = [s.Parametro(this._$.first_line, this._$.first_column, $1, $2)]; }
;

EXEC
        : r_exec S_LLAMADA
                { $$ = s.Exec(this._$.first_line, this._$.first_column, $2); }
;

DECLARACION_VARIABLE
        : TIPO id puntocoma
                { $$ = s.Declaracion(this._$.first_line, this._$.first_column, $1, $2, null); }
        | TIPO id igual E puntocoma
                { $$ = s.Declaracion(this._$.first_line, this._$.first_column, $1, $2, $4); }
;

ASIGNACION_VARIABLE
        : id igual E puntocoma
                { $$ = s.Asignacion(this._$.first_line, this._$.first_column, $1, $3); }
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

E
        : E opar_suma E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'suma', $1, $3); }
        | E opar_resta E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'resta', $1, $3); }
        | E opar_multiplicacion E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'multiplicacion', $1, $3); }
        | E opar_division E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'division', $1, $3); }
        | E opar_potencia E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'potencia', $1, $3); }
        | E opar_modulo E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'modulo', $1, $3); }
        | E oprel_igualacion E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'igualacion', $1, $3); }
        | E oprel_diferenciacion E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'diferenciacion', $1, $3); }
        | E oprel_menor E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'menor', $1, $3); }
        | E oprel_menorigual E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'menorigual', $1, $3); }
        | E oprel_mayor E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'mayor', $1, $3); }
        | E oprel_mayorigual E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'mayorigual', $1, $3); }
        | E oplog_or E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'or', $1, $3); }
        | E oplog_and E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'and', $1, $3); }
        | opar_resta E %prec op_negacion
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'negacion', $2); }
        | oplog_not E
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'not', $2); }
        | E ternario E dospuntos E %prec op_condicional
                { $$ = s.Ternaria(this._$.first_line, this._$.first_column, $1, $3, $5); }
        | parA E parB %prec op_group
                { $$ = $2; }
        | LLAMADA %prec op_call
                { $$ = $1; }
        | ACCESO_VECTOR  %prec op_vector
                { $$ = $1; }
        | ACCESO_LISTA %prec op_list
                { $$ = $1; }
        | parA TIPO parB E %prec op_casteo
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'casteo', s.Simbolo(this._$.first_line, this._$.first_column, $2, $2), $4); }
        | E opar_suma opar_suma %prec op_incremento
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'incremento',$1); }
        | E opar_resta opar_resta %prec op_decremento
                { $$ = s.Operacion(this._$.first_line, this._$.first_column, 'decremento', $1); }
        | id
                { $$ = s.Simbolo(this._$.first_line, this._$.first_column, 'id', $1); }
        | int
                { $$ = s.Simbolo(this._$.first_line, this._$.first_column, 'int', parseInt($1)); }
        | double
                { $$ = s.Simbolo(this._$.first_line, this._$.first_column, 'double', parseFloat($1)); }
        | char
                { $$ = s.Simbolo(this._$.first_line, this._$.first_column, 'char', $1); }
        | string
                { $$ = s.Simbolo(this._$.first_line, this._$.first_column, 'string', $1); }
        | boolean
                { $$ = s.Simbolo(this._$.first_line, this._$.first_column, 'boolean', $1.toLowerCase() === 'true'); }
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
                { $$ = s.Incremento(this._$.first_line, this._$.first_column, $1); }
;

DECREMENTO
        : id opar_resta opar_resta
                { $$ = s.Decremento(this._$.first_line, this._$.first_column, $1); }
;

VALORES
        : VALORES coma E
                { $$ = $1; $$.push($3); }
        | E
                { $$ = [$1]; }
;

DECLARACION_VECTOR
        : TIPO corA corB id igual r_new TIPO corA E corB puntocoma
                { $$ = s.Vector(this._$.first_line, this._$.first_column, $1, $4, $7, $9); }
        | TIPO corA corB id igual llaveA VALORES llaveB puntocoma
                { $$ = s.Vector(this._$.first_line, this._$.first_column, $1, $4, $1, null, $7); }
;

ACCESO_VECTOR
        : id corA E corB
                { $$ = s.Acceso_vector(this._$.first_line, this._$.first_column, $1, $3); }
;

MODIFICACION_VECTOR
        : id corA E corB igual E puntocoma
                { $$ = s.Modificacion_vector(this._$.first_line, this._$.first_column, $1, $3, $6); }
;

DECLARACION_LISTA
        : r_list oprel_menor TIPO oprel_mayor id igual r_new r_list oprel_menor TIPO oprel_mayor puntocoma
                { $$ = s.Lista(this._$.first_line, this._$.first_column, $3, $5, $10); }
        | r_list oprel_menor TIPO oprel_mayor id igual E puntocoma
                { $$ = s.Lista(this._$.first_line, this._$.first_column, $3, $5, null, $7); }
;

ADD_LISTA
        : id punto r_add parA E parB puntocoma
                { $$ = s.Add_lista(this._$.first_line, this._$.first_column, $1, $5); }
;

ACCESO_LISTA
        : id corA corA E corB corB
                { $$ = s.Acceso_lista(this._$.first_line, this._$.first_column, $1, $4); }
;

MODIFICACION_LISTA
        : id corA corA E corB corB igual E puntocoma
                { $$ = s.Modificacion_lista(this._$.first_line, this._$.first_column, $1, $4, $8); }
;

S_IF
        : r_if parA E parB BLOQUE
                { $$ = s.If(this._$.first_line, this._$.first_column, $3, $5, null); }
        | r_if parA E parB BLOQUE S_ELSE
                { $$ = s.If(this._$.first_line, this._$.first_column, $3, $5, $6); }
	| r_if parA error parB BLOQUE
                { Error(this._$.last_line, this._$.last_column, 'Sintáctico', `Se recuperó en '${yytext}'`); }
;


S_ELSE
        : r_else BLOQUE
                { $$ = $2; }
        | r_else S_IF
                { $$ = $2; }
;

S_SWITCH
        : r_switch parA E parB llaveA CASES S_DEFAULT llaveB
                { $$ = s.Switch(this._$.first_line, this._$.first_column, $3, $6, $7); }
        | r_switch parA E parB llaveA CASES llaveB
                { $$ = s.Switch(this._$.first_line, this._$.first_column, $3, $6, null); }
        | r_switch parA error llaveB
                { Error(this._$.last_line, this._$.last_column, 'Sintáctico', `Se recuperó en '${yytext}'`); }
;

CASES
        : CASES r_case E dospuntos INS
                { $$ = $1; $$.push(s.Case(this._$.first_line, this._$.first_column, $3, $5)); }
        | r_case E dospuntos INS
                { $$ = [s.Case(this._$.first_line, this._$.first_column, $2, $4)]; }
;

S_DEFAULT
        : r_default dospuntos INS
                { $$ = s.Default(this._$.first_line, this._$.first_column, $3); }
;

S_WHILE
        : r_while parA E parB BLOQUE
                { $$ = s.While(this._$.first_line, this._$.first_column, $3, $5); }
        | r_while parA error llaveB
                { Error(this._$.last_line, this._$.last_column, 'Sintáctico', `Se recuperó en '${yytext}'`); }
;

S_FOR
        : r_for parA INICIALIZACION puntocoma E puntocoma ACTUALIZACION parB BLOQUE
                { $$ = s.For(this._$.first_line, this._$.first_column, $3, $5, $7, $9); }
        | r_for parA error llaveB
                { Error(this._$.last_line, this._$.last_column, 'Sintáctico', `Se recuperó en '${yytext}'`); }
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
                { $$ = s.Asignacion(this._$.first_line, this._$.first_column, $1, $3); }
;

DECLARACION
        : TIPO id igual E
                { $$ = s.Declaracion(this._$.first_line, this._$.first_column, $1, $2, $4); }
;

S_DO
        : r_do BLOQUE r_while parA E parB puntocoma
                { $$ = s.Do_while(this._$.first_line, this._$.first_column, $5, $2); }
        | r_do error puntocoma
                { Error(this._$.last_line, this._$.last_column, 'Sintáctico', `Se recuperó en '${yytext}'`); }
;

S_LLAMADA
        : LLAMADA puntocoma
                { $$ = $1; }
;

LLAMADA
        : id parA parB
                { $$ = s.Llamada(this._$.first_line, this._$.first_column, $1, []); }
        | id parA VALORES parB
                { $$ = s.Llamada(this._$.first_line, this._$.first_column, $1, $3); }
;

S_RETURN
        : r_return E puntocoma
                { $$ = s.Return(this._$.first_line, this._$.first_column, $2); }
        | r_return puntocoma
                { $$ = s.Return(this._$.first_line, this._$.first_column); }
;

S_BREAK
        : r_break puntocoma
                { $$ = s.Break(this._$.first_line, this._$.first_column); }
;

S_CONTINUE
        : r_continue puntocoma
                { $$ = s.Continue(this._$.first_line, this._$.first_column); }
;
