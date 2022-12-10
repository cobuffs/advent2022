const fs = require('fs');
const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n");

let cycle = 1;
let xreg = 1;

let screenstr = "#";

for(let i = 0; i < entries.length; i++) {
    const instructions = entries[i].split(" ");
    const op = instructions[0];
    movecycle();
    if(op === "addx") {
        const mag = parseInt(instructions[1],10);
        xreg += mag;
        movecycle();
    } 
}

console.log(screenstr);

function movecycle() {
    const col = cycle % 40;
    if(cycle % 40 === 0) screenstr += '\n';
    if(Math.abs(xreg - col) <= 1) screenstr += "#";
    else screenstr += ".";
    cycle++;
}
