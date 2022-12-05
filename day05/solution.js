const fs = require('fs');

//windows
//const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n");

//mac
const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\n")

//                         [R] [J] [W]
//             [R] [N]     [T] [T] [C]
// [R]         [P] [G]     [J] [P] [T]
// [Q]     [C] [M] [V]     [F] [F] [H]
// [G] [P] [M] [S] [Z]     [Z] [C] [Q]
// [P] [C] [P] [Q] [J] [J] [P] [H] [Z]
// [C] [T] [H] [T] [H] [P] [G] [L] [V]
// [F] [W] [B] [L] [P] [D] [L] [N] [G]
//  1   2   3   4   5   6   7   8   9 

//let stacks = [["N","Z"],["D","C","M"],["P"]];

let stacks = [["R","Q","G","P","C","F"],
              ["P","C","T","W"],
              ["C","M","P","H","B"],
              ["R","P","M","S","Q","T","L"],
              ["N","G","V","Z","J","H","P"],
              ["J","P","D"],
              ["R","T","J","F","Z","P","G","L"],
              ["J","T","P","F","C","H","L","N"],
              ["W","C","T","H","Q","Z","V","G"]];

let instructions = [];

for(let i = 0; i < entries.length; i++) {
    const parsed = entries[i].split(" ");
    const inst = [parsed[1],parsed[3],parsed[5]].map(Number);
    instructions.push(inst);
    moveit(inst);
}

console.log(instructions[instructions.length-1]);
for(let i = 0; i < stacks.length; i++) {
    console.log(stacks[i][0]);
}

function moveit(inst) {
    //take n from x to y
    const origin = inst[1] - 1;
    const dest = inst[2] - 1;
    const steps = inst[0];
    // for(let i = 0; i < steps; i++) {
    //     stacks[dest].unshift(stacks[origin].shift());
    // }
    const newstack = stacks[origin].splice(0,steps);
    for(let i = newstack.length - 1; i >= 0; i--) {
        stacks[dest].unshift(newstack[i]);
    }

}