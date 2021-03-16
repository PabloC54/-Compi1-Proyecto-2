# Gramática de Regexive

## Alfabeto

### Símbolos terminales

|         Token         |            Lexema            |                                  Patrón                                   |
| :-------------------: | :--------------------------: | :-----------------------------------------------------------------------: |
|           L           |         **_letra_**          |                                [a-zA-ZñÑ]                                 |

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