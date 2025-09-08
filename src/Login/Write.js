const fs = require("fs");
const string = "Alt";

fs.appendFileSync("exemplu.txt",string + "\n");

let data = fs.readFileSync("exemplu.txt","utf-8")
console.log(data);

console.log("Fisier salvar.");
