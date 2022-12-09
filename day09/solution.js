const fs = require('fs');
const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n");

//infinite grid keyed off x,y
let positions = new Map();
positions.set("0,0", buildpos(0,0));

let tailvisited = new Set();
tailvisited.add("0,0");
let headx = 0;
let heady = 0;
let knots = [];

for(var i = 0; i < 9; i++) {
    knots.push(buildpos(0,0));
}

for(let i = 0; i < entries.length; i++) {
    const instructions = entries[i].split(" ");
    //0 is R,U,L,D
    //1 is number of spaces
    if(instructions[0] === "R") {
        moveit(1,0,parseInt(instructions[1],10),entries[i]);
    } else if(instructions[0] === "L") {
        moveit(-1,0,parseInt(instructions[1],10),entries[i]);
    } else if(instructions[0] === "U") {
        moveit(0,1,parseInt(instructions[1],10),entries[i]);
    } else {
        moveit(0,-1,parseInt(instructions[1],10),entries[i]);
    }
}

console.log(tailvisited.size);

//functionally moving the head
function moveit(xinc, yinc, mag, og) {
    if(xinc !== 0) {
        let counter = 0;
        while (counter < mag) {
            headx = headx + xinc;
            positions.set(`${headx},${heady}`, buildpos(headx,heady));
            movekids(og);
            counter++;
        }
    } else {
        let counter = 0;
        while (counter < mag) {
            heady = heady + yinc;
            positions.set(`${headx},${heady}`, buildpos(headx,heady));
            movekids(og);
            counter++;
        }
    }
    //console.log(`instruction: ${og} --- xinc: ${xinc}, yinc: ${yinc}, mag: ${mag} resulted in ${headx}, ${heady} with tail at ${knots[8].x}, ${knots[8].y}`);
}

function movekids(og) {
    let prior = {"x":headx, "y": heady};
    for(let i = 0; i < knots.length; i++) {
        movenode(prior, knots[i], i === 8, og);
        prior = knots[i];
    }
}

function movenode(neighbor, me, tail, og) {
    const distance = Math.max(
        Math.abs(me.x - neighbor.x),
        Math.abs(me.y - neighbor.y)
      );
    if (distance > 1) {
        const directionX = neighbor.x - me.x;
        me.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX;
        const directionY = neighbor.y - me.y;
        me.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
        if(tail) tailvisited.add(`${me.x},${me.y}`);
    }
}

function buildpos(x,y) {
    return {
        "key":`${x},${y}`,
        "x":x,
        "y":y
    }
}
