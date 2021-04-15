import { readFileSync, writeFileSync } from "fs";
import { Parser } from "jison";

const gr = readFileSync(
	"/home/pablo/Documentos/src/Universidad/-Compi1-Proyecto-2/typesty/src/Analyzer/grammar.jison",
	"utf8"
);

const parser = new Parser(gr);

const parserSource = parser.generate();
writeFileSync(
	"/home/pablo/Documentos/src/Universidad/-Compi1-Proyecto-2/typesty/src/Analyzer/analyzer.js",
	parserSource
);
