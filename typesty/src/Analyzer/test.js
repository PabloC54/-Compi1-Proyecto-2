import { parser } from "./analyzer";

function exec(input) {
	return parser.parse(input);
}

console.log(exec("int main = 2;"));
