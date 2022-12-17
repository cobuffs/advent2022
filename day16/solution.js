class Graph {
    constructor(props) {
        this.neighbors = {}
    }

    addEdge(u, v) {
        if (!this.neighbors[u]) this.neighbors[u] = []
        this.neighbors[u].push(v)
    }

    bfs(start) {
        if (!this.neighbors[start] || !this.neighbors[start].length) {
            return [start]
        }

        var results = { "nodes": [] },
            queue = this.neighbors[start],
            count = 1

        while (queue.length) {
            var node = queue.shift()
            if (!results[node] || !results[node].visited) {
                results[node] = { visited: true, steps: count }
                results["nodes"].push(node)
                if (this.neighbors[node]) {
                    if (this.neighbors[node].length) {
                        count++
                        queue.push(...this.neighbors[node])
                    } else {
                        continue
                    }
                }
            }
        }
        return results
    }

    shortestPath(start, end) {
        if (start == end) {
            return [start, end]
        }

        var queue = [start],
            visited = {},
            predecessor = {},
            tail = 0,
            path

        while (tail < queue.length) {
            var u = queue[tail++]
            if (!this.neighbors[u]) {
                continue
            }

            var neighbors = this.neighbors[u]
            for (var i = 0; i < neighbors.length; ++i) {
                var v = neighbors[i]
                if (visited[v]) {
                    continue
                }
                visited[v] = true
                if (v === end) {   // Check if the path is complete.
                    path = [v]   // If so, backtrack through the path.
                    while (u !== start) {
                        path.push(u)
                        u = predecessor[u]
                    }
                    path.push(u)
                    path.reverse()
                    return path
                }
                predecessor[v] = u
                queue.push(v)
            }
        }

        return path
    }
}

const fs = require('fs');
const entries = fs.readFileSync('sample.txt', 'utf8').toString().trim().split("\r\n")
let valves = new Map();

let valveswithvals = new Set();
let rooms = new Graph();

for(let i = 0; i < entries.length; i++) {
    let processing = entries[i];
    processing = processing.slice(6);
    //next 2 are the valve
    let valve = createvalve(processing.substring(0,2));
    processing = processing.split("; ");
    processing[0] = processing[0].split("=");
    valve.flow = Number(processing[0][1]);
    processing[1] = processing[1].replaceAll(",","");
    processing[1] = processing[1].replace("valves","foo");
    processing[1] = processing[1].replace("valve","foo");
    processing[1] = processing[1].replace("tunnels","foo");
    processing[1] = processing[1].replace("tunnel","foo");
    processing[1] = processing[1].replace("leads","foo");
    processing[1] = processing[1].replace("lead","foo");
    processing[1] = processing[1].split("foo foo to foo ");
    valve.connections = processing[1][1].split(" ");
    for(var j = 0; j < valve.connections.length; j++) {
        rooms.addEdge(valve.key, valve.connections[j]);
    }

    valves.set(valve.key, valve);
    if(valve.flow > 0) valveswithvals.add(valve.key);
    
    
}

part1();

function part1() {
    //get all the distances between valves
    let distancesfromvtov = {};
    //add starting node
    distancesfromvtov["AA"] = {};
    valveswithvals.forEach((v2, k2) => {     
        distancesfromvtov["AA"][k2] = rooms.shortestPath("AA",k2).length;
    });

    valveswithvals.forEach((v, k) => {
        distancesfromvtov[k] = {};    
        valveswithvals.forEach((v2, k2) => {     
            if(k2 !== k) {
                distancesfromvtov[k][k2] = rooms.shortestPath(k,k2).length;
            }
        });
    });

    console.log(doit("AA", "AA", 30));

    function doit(valvek, decisions, minutesremaining) {
        if(minutesremaining < 1) return 0;
        const valve = valves.get(valvek);
        //if we're here, the valve got open and will remain open
        let pressurereleased = valve.flow * minutesremaining;

        const possibilities = [];

        let disttoothervalves = Object.keys(distancesfromvtov[valve.key]);

        //walk the paths to other valves and figure it out
        for(var i = 0; i < disttoothervalves.length; i++) {
            const vkey = disttoothervalves[i];
            if(decisions.includes(vkey)) continue;
            if(minutesremaining - distancesfromvtov[valve.key][vkey] < 0) continue;
            possibilities.push({valve: vkey, cost: distancesfromvtov[valve.key][vkey]});
        }
        if (possibilities.length > 0) {
            let pressures = [];
            for(var i = 0; i < possibilities.length; i++ ){
                //see what we get
                let possibility = possibilities[i];
                pressures = [...pressures, doit(possibility.valve, decisions + ", " + possibility.valve, minutesremaining - possibility.cost)];
                
            }

            pressurereleased += Math.max(pressures);
        }
        return pressurereleased;
    }

    //console.log(distancesfromvtov);
}
    
    

function releasepressure(openvalves) {
    let pressures = [0];
    for(var i = 0; i < openvalves.length; i++) {
        pressures.push(valves.get(openvalves[i]).flow);
    }
    return pressures.reduce((p, v) => { return p + v; });
}
// function part1() {

//     const start = valves.get("AA");
//     let sets = [];

//     generatetraversal(start, [], 0, [], 0);

//     sets.sort((a,b) => {return b[1] - a[1];});

//     console.log(`${sets[0][0]} had the most pressure released: ${sets[0][1]}`);

//     function generatetraversal(curroom, path, minutes, openvalves, releasedpressure) {
//         //walk into the room
//         minutes++;
//         if (minutes > 10 || openvalves.length === valveswithvals.size) {
//             //store off the path and the pressure and return
//             //console.log("out of time");
//             sets.push([path, releasedpressure]);
//             return;
//         } else {
//             //release pressure
//             releasedpressure += releasepressure(openvalves);
//             path.push(curroom.key);
            
//             //options for the room. i can open a valve or go to a neighbor
//             if (!openvalves.includes(curroom.key) && curroom.flow > 0) {
//                 //leave it closed and go to neighbors
//                 for (let i = 0; i < curroom.connections.length; i++) {
//                     const neighbor = valves.get(curroom.connections[i]);
//                     generatetraversal(neighbor, [...path], minutes, [...openvalves], releasedpressure);
//                 }
//                 //lets open it
//                 openvalves.push(curroom.key);
//                 //keep going
//                 generatetraversal(curroom, [...path], minutes, [...openvalves], releasedpressure);

//             } else {
//                 //need to go to neighbors
//                 for (let i = 0; i < curroom.connections.length; i++) {
//                     const neighbor = valves.get(curroom.connections[i]);
//                     generatetraversal(neighbor, [...path], minutes, [...openvalves], releasedpressure);
//                 }
//             }
//         }
//         function releasepressure(openvalves) {
//             let pressures = [0];
//             for(var i = 0; i < openvalves.length; i++) {
//                 pressures.push(valves.get(openvalves[i]).flow);
//             }
//             return pressures.reduce((p, v) => { return p + v; });
//         }

//     }
// }

function createvalve(key, flow) {
    return {
        "key": key,
        "flow": 0,
        "state": 0,
        "connections":[]
    };
}

