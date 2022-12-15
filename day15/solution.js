const fs = require('fs');
const entries = fs.readFileSync('sample.txt', 'utf8').toString().trim().split("\r\n")

let cave = new Map();
let sensors = [];
let beacons = new Set();
let xmin = 1000000;
let xmax = 0
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
}

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
    //with the beacon distance for each sensor we know that sensors scan field pretty easily. maybe we can just choose points that fall adjacent to field for each sensor?
    let pointstocheck = new Set();
    const max = 20;
    //const max = 4000000;

    for(let i = 0; i < sensors.length; i++) {
        const sensor = cave.get(sensors[i]);
        //check a diamond perimeter 1 unit greater than the current distance
        const newdistance = sensor.distancetobeacon + 1;
        console.log(`working on sensor ${sensor.key} with distance: ${sensor.distancetobeacon}`);
        
        // //check tips
        // const top = `${sensor.x},${sensor.y - newdistance}`;
        // if (pointstocheck.has(top)) pointstocheck.delete(top);
        // else pointstocheck.add(top);

        // const bottom = `${sensor.x},${sensor.y + newdistance}`;
        // if (pointstocheck.has(bottom)) pointstocheck.delete(bottom);
        // else pointstocheck.add(bottom);

        // const left = `${sensor.x - newdistance},${sensor.y}`;
        // if (pointstocheck.has(left)) pointstocheck.delete(left);
        // else pointstocheck.add(left);

        // const right = `${sensor.x + newdistance},${sensor.y}`;
        // if (pointstocheck.has(right)) pointstocheck.delete(right);
        // else pointstocheck.add(right);
        let loops = 0;

        //NE
        for(let i = 1; i <= newdistance; i++) {
            let point = `${sensor.x + i},${sensor.y - newdistance + i}`;
            if (pointstocheck.has(point)) pointstocheck.delete(point);
            else pointstocheck.add(point);
            loops++;
        }

        //SE
        for(let i = 1; i <= newdistance; i++) {
            let point = `${sensor.x + newdistance - i},${sensor.y + i}`;
            if (pointstocheck.has(point)) pointstocheck.delete(point);
            else pointstocheck.add(point);
            loops++;
        }

        //SW
        for(let i = 1; i <= newdistance; i++) {
            let point = `${sensor.x - i},${sensor.y + newdistance - i}`;
            if (pointstocheck.has(point)) pointstocheck.delete(point);
            else pointstocheck.add(point);
            loops++;
        }
        //NW
        for(let i = 1; i <= newdistance; i++) {
            let point = `${sensor.x - newdistance + i},${sensor.y - i}`;
            if (pointstocheck.has(point)) pointstocheck.delete(point);
            else pointstocheck.add(point);
            loops++;
        }
        console.log(`resulting size of points to check: ${pointstocheck.size} with ${loops}`);
    }

    console.log(pointstocheck.size);
}

// function part2() {
    
//     let starty = 0;
//     const endx = 4000000;
//     const endy = 4000000;

//     //const endx = 20;
//     //const endy = 20;

//     let firstfalse = false;

//     for(;starty <= endy; starty++) {
//         console.log(`row ${starty}`);
//         for(let startx = 0; startx <= endx; startx++) {
//             //we dont start until we start getting falses
//             const pointtocheck = {"x":startx, "y":starty};
//             const ck = canbeaconbehere(pointtocheck);
//             if(!ck && !firstfalse) {
//                 firstfalse = true;
//             } else if (ck && firstfalse) {
//                 //check the next one to see if we get another true. if we do, we can break. if we don't we have a beacon loc if there isnt already one there
//                 const nextpt = {"x":startx + 1, "y":starty};
//                 const nextck = canbeaconbehere(nextpt);
//                 if(nextck) break;
//                 else {
//                     //candidate
//                     console.log(`candidate found at ${pointtocheck.x}, ${pointtocheck.y}`);
//                     if(beacons.has(`${pointtocheck.x},${pointtocheck.y}`)) {
//                         //too bad
//                     } else {
//                         console.log((4000000 * pointtocheck.x) + pointtocheck.y);
//                         return;
//                     }
//                 }
//             }
//         }
//     }
// }

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