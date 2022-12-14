const fs = require('fs');
const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n")

let cave = new Map();
let maxy = 0;
let miny = 100000;
let maxx = 0;
let minx = 100000;
const sandpoint = buildpoint(500,0,"+");
cave.set(sandpoint.key, sandpoint);


for(let i = 0; i < entries.length; i++) {
    //each row represents continuous rocks
    let row = entries[i];
    row = row.split(" -> ");
    for(let n = 0; n < row.length - 1; n++) {
        let start = row[n].split(",").map(Number);
        let end = row[n + 1].split(",").map(Number);
        //check for new boundaries
        if(maxx < start[0] || maxx < end[0]) maxx = start[0] > end[0] ? start[0] : end[0];
        if(minx > start[0] || minx > end[0]) minx = start[0] < end[0] ? start[0] : end[0];
        if(maxy < start[1] || maxy < end[1]) maxy = start[1] > end[1] ? start[1] : end[1];
        //x
        if(start[0] !== end[0]) {
            //go toward it
            const dir = start[0] - end[0] < 0 ? 1 : -1;
            while(start[0] !== end[0]) {
                let point = buildpoint(start[0], start[1], "#");
                cave.set(point.key, point);
                start[0] += dir;
            }
        } else {
            //y
            const dir = (start[1] - end[1]) < 0 ? 1 : -1
            while(start[1] !== end[1]) {
                let point = buildpoint(start[0], start[1], "#");
                cave.set(point.key, point);
                start[1] += dir;
                if(maxy < point.y) maxy = point.y;
            }
        }
        //add the endpoint
        let point = buildpoint(start[0], start[1], "#");
        cave.set(point.key, point);
    }
}

maxy += 2;
//and put a ridiculous floor in
for(var i = 0; i < 10000; i++) {
    const pt = buildpoint(i,maxy,"#");
    cave.set(pt.key,pt);
}

drawcave();
solve();

function solve() {
    //let the sand fall. goes straight down until it hits sand or rock. if it gets past maxy, its gone forever.
    //A unit of sand always falls down one step if possible. If the tile immediately below is blocked (by rock or sand), 
    //the unit of sand attempts to instead move diagonally one step down and to the left. If that tile is blocked, the unit of sand attempts to instead move diagonally one step down and to the right.
    
    let doit = true;
    let sandunits = 0;

    while(doit) {
        let sand = buildpoint(sandpoint.x, sandpoint.y, "o");
        while(true) {
            //decide where to go
            //D
            const downpt = `${sand.x},${sand.y + 1}`;
            const dlpt = `${sand.x - 1},${sand.y + 1}`;
            const drpt = `${sand.x + 1},${sand.y + 1}`;
            //see if anything is there
            if(cave.has(downpt)) {
                if(cave.has(dlpt)) {
                    if(cave.has(drpt)) {
                        //sand comes to rest
                        if(sand.x === sandpoint.x && sand.y === sandpoint.y) {
                            //done
                            doit = false;
                            break;
                        }
                        cave.set(sand.key, sand);
                        break;
                    } else {
                        sand.x = sand.x + 1;
                        sand.y = sand.y + 1;
                        sand.key = drpt;
                    }
                } else {
                    sand.x = sand.x - 1;
                    sand.y = sand.y + 1;
                    sand.key = dlpt;
                }
            } else {
                sand.y = sand.y + 1;
                sand.key = downpt;
            }

        }
        sandunits++;
        
    }
    //drawcave();
    //console.log(sandunits);
}

function drawcave() {
    const xoffset = minx;
    const width = maxx - minx;
    const depth = maxy;
    let cavesketch = "";
    for(var i = 0; i <= depth; i++) {
        cavesketch += "\n";
        for(var j = 0; j <= width; j++) {
            if(!cave.has(`${j + xoffset},${i}`)) cavesketch += " ";
            else {cavesketch += cave.get(`${j + xoffset},${i}`).tile};
        }
    }
    console.log(cavesketch);
}

function buildpoint(x, y, tile = ".") {
    return {
        "x":x,
        "y":y,
        "key": `${x},${y}`,
        "tile": tile
    }
}