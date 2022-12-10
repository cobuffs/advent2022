const fs = require('fs');
const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n");

// Find the signal strength during the 20th, 60th, 100th, 140th, 180th, and 220th cycles. What is the sum of these six signal strengths?
let cycle = 1;
let xreg = 1;

let screenstr = "#";

for(let i = 0; i < entries.length; i++) {
    const instructions = entries[i].split(" ");
    const op = instructions[0];
    if(op === "addx") {
        const mag = parseInt(instructions[1],10);
        movecycle();
        xreg += mag;
        movecycle();
    } else {
        movecycle();
    }
}

console.log(screenstr);

function movecycle() {
    const col = cycle % 40;
    if(cycle % 40 === 0) screenstr += '\n';
    if(xreg - 1 === col || xreg + 1 === col || xreg === col) screenstr += "#";
    else screenstr += ".";
    cycle++;
    
}
