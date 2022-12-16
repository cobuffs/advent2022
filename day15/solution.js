const fs = require('fs');
const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n")

let cave = new Map();
let sensors = [];
let beacons = new Set();
let xmin = 1000000;
let xmax = 0;
let ymin = 4000000;
let ymax = 0;
let distances = [];


for(let i = 0; i < entries.length; i++) {
    let line = entries[i];
    line = line.split(":");
    line[0] = line[0].substring(12).split(", ");
    line[0][1] = line[0][1].substring(2);

    line[1] = line[1].substring(24).split(", ");
    line[1][1] = line[1][1].substring(2);

    line[0][0] = Number(line[0][0]);
    line[0][1] = Number(line[0][1]);
    line[1][0] = Number(line[1][0]);
    line[1][1] = Number(line[1][1]);

    const sensor = buildsensor(line[0][0], line[0][1], line[1][0], line[1][1]);
    if (sensor.x < xmin) xmin = sensor.x;
    if (sensor.x > xmax) xmax = sensor.x;

    cave.set(sensor.key, sensor);
    sensors.push(sensor.key);
    beacons.add(sensor.beacon.key);
    distances.push(sensor.distancetobeacon);
    if(sensor.y - sensor.distancetobeacon < ymin) ymin = sensor.y - sensor.distancetobeacon < 0 ? 0 : sensor.y - sensor.distancetobeacon;
    if(sensor.y + sensor.distancetobeacon > ymax) ymax = sensor.y + sensor.distancetobeacon > 4000000 ? 4000000 : sensor.y + sensor.distancetobeacon;
}
distances.sort((a,b) => { return a-b; });

//find highest and lowest y

part2();
function part1() {
    //pick an arbitrary decreasing x to check until we hit a false 
    //const ytock = 10;
    let x = xmin;
    const ytock = 2000000;

    let invalidcount = 0;
    x += -1000000;
    while(x < xmax + 100000) {
        if (!canbeaconbehere({"x":x, "y":ytock})) invalidcount++;
        x++;
    }

    console.log(invalidcount);
    
}

function part2() {
    let possiblepoints = [];
    //let max = 20;
    let max = 4000000;
    for(let i = 0; i <= max; i++) {
        //collection of xleft to xright for the row
        let rowranges = [];
        for(let sensorn = 0; sensorn < sensors.length; sensorn++) {
            const sensor = cave.get(sensors[sensorn]);
            const rowsaway = Math.abs(sensor.y - i);
            const xchange = sensor.distancetobeacon - rowsaway;
            if(xchange >= 0){
                const range = [sensor.x - xchange < 0 ? 0 : sensor.x - xchange, sensor.x + xchange > max ? max : sensor.x + xchange];
                rowranges.push(range);
            }
        }
        //consolidate ranges?
        rowranges.sort( (a,b) => { return a[0] - b[0]; } );
        for(let j = 0; j < rowranges.length - 1;) {
            let us = rowranges[j];
            const them = rowranges [j+1]
            //if we contain the next range
            if(us[1] >= them[0] && us[1] >= them[1]) {
                //remove it
                rowranges.splice(j+1,1);
            } else if (us[1] >= them[0] && them[1] > us[1]) {
                //need to update our end
                us[1] = them[1];
                rowranges.splice(j+1,1);;
            } else if (them[0] > us[1]) {
                //keep going
                j++;
            }
        }
        //console.log(`done with sensors`);
        if(rowranges.length !== 1) {
            //we have a candidate point at differences between ranges, i
            const r2 = rowranges[1];
            const xval = r2[0] - 1;
            possiblepoints.push(`${xval},${i}: ${xval * 4000000 + i}`);
        }

    }
    console.log(possiblepoints);
}

function buildpoint(x,y) {
    return {
        "key": `${x},${y}`,
        "x": x,
        "y": y
    }
}

function canbeaconbehere(point) {
    //doubt this will work for p2, but for now its fine
    if(beacons.has(`${point.x},${point.y}`)) return true;
    for(let i = 0; i < sensors.length; i++) {
        const sensor = cave.get(sensors[i]);
        //For now, keep things simple by counting the positions where a beacon cannot possibly be
        const checkd = distance(sensor, point)
        if(checkd <= sensor.distancetobeacon) {
            //console.log(`Point ${point.x},${point.y} is closer than the sensor ${i}'s beacon of ${sensor.beacon}`);
            return false;
        }
    }
    return true;
}

function buildsensor(x, y, bx, by) {
    return {
        "key": `${x},${y}`,
        "x": x,
        "y": y,
        "beacon": {
            "x": bx, 
            "y": by,
            "key": `${bx},${by}`
        },
        "distancetobeacon": distance({"x":x,"y":y}, {"x":bx,"y":by})
    }
}

function distance(point1, point2) {
    return Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y);
}