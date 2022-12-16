const fs = require('fs');
const entries = fs.readFileSync('sample.txt', 'utf8').toString().trim().split("\r\n")
let valves = new Map();
let valveswithvals = new Set();

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

    valves.set(valve.key, valve);
    if(valve.flow > 0) valveswithvals.add(valve.key);
    
    console.log(valve);
}

part1();

//part 1: just brute force this piece for now. build every combination of rooms/valves that you can hit in 30 minutes and take the highest flow
function part1() {

    const start = valves.get("AA");
    let sets = [];

    generatetraversal(start, [], 0, [], 0);

    sets.sort((a,b) => {return b[1] - a[1];});

    console.log(`${sets[0][0]} had the most pressure released: ${sets[0][1]}`);

    function generatetraversal(curroom, path, minutes, openvalves, releasedpressure) {
        //walk into the room
        minutes++;
        path.push(curroom.key);
        if (minutes > 30 || openvalves.length == valveswithvals.size) {
            //store off the path and the pressure and return
            //console.log("out of time");
            sets.push([path, releasedpressure]);
            return;
        } else {
            //release pressure
            releasedpressure += releasepressure(openvalves);
            

            //options for the room. i can open a valve or go to a neighbor
            if (!openvalves.includes(curroom.key) && curroom.flow > 0) {
                //leave it closed and go to neighbors
                for (let i = 0; i < curroom.connections.length; i++) {
                    const neighbor = valves.get(curroom.connections[i]);
                    generatetraversal(neighbor, path, minutes, openvalves, releasedpressure);
                }
                //lets open it
                openvalves.push(curroom.key);
                //keep going
                generatetraversal(curroom, path, minutes, openvalves, releasedpressure);

            } else {
                //need to go to neighbors
                for (let i = 0; i < curroom.connections.length; i++) {
                    const neighbor = valves.get(curroom.connections[i]);
                    generatetraversal(neighbor, path, minutes, openvalves, releasedpressure);
                }
            }
        }
        function releasepressure(openvalves) {
            let pressures = [0];
            for(var i = 0; i < openvalves.length; i++) {
                pressures.push(valves.get(openvalves[i]).flow);
            }
            return pressures.reduce((p, v) => { return p + v; });
        }

    }
}

function createvalve(key, flow) {
    return {
        "key": key,
        "flow": 0,
        "state": 0,
        "connections":[]
    };
}

//in case we need more dijk
class Node {
    constructor(val, priority) {
        this.val = val;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

//Dijkstra's algorithm only works on a weighted graph.

class WeightedGraph {
    constructor() {
        this.adjacencyList = {};
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
    }
    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight });
        //this.adjacencyList[vertex2].push({ node: vertex1, weight });
    }
    shortestPath(start, finish) {
        let adj = this.adjacencyList;

        const queue = [];
        queue.push(start);

        const discovered = [];
        discovered[start] = true;

        const edges = [];
        edges[start] = 0;

        const predecessors = [];
        predecessors[start] = null;

        const buildPath = (finish, start, predecessors) => {
            const stack = [];
            stack.push(finish);

            let u = predecessors[finish];

            while(u != start) {
                stack.push(u);
                u = predecessors[u];
            }

            stack.push(start);

            let path = stack.reverse().join('-');

            return path;
        }
    

        while(queue.length) {
            let v = queue.shift();

            if (v === finish) {
                return { 
                    distance: edges[finish],
                    path: buildPath(finish, start, predecessors)
                };
            }

            for (let i = 0; i < adj[v].length; i++) {
                if (!discovered[adj[v][i]]) {
                    discovered[adj[v][i]] = true;
                    queue.push(adj[v][i].node);
                    edges[adj[v][i]] = edges[v] + 1;
                    predecessors[adj[v][i]] = v;
                }
            }
        }

        return false;
    }
    Dijkstra(start, finish) {
        const nodes = new PriorityQueue();
        const distances = {};
        const previous = {};
        let path = []; //to return at end
        let smallest;
        //build up initial state
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0;
                nodes.enqueue(vertex, 0);
            } else {
                distances[vertex] = Infinity;
                nodes.enqueue(vertex, Infinity);
            }
            previous[vertex] = null;
        }
        // as long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val;
            if (smallest === finish) {
                //WE ARE DONE
                //BUILD UP PATH TO RETURN AT END
                while (previous[smallest]) {
                    path.push(smallest);
                    smallest = previous[smallest];
                }
                break;
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    //find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor];
                    //calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight;
                    let nextNeighbor = nextNode.node;
                    if (candidate < distances[nextNeighbor]) {
                        //updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate;
                        //updating previous - How we got to neighbor
                        previous[nextNeighbor] = smallest;
                        //enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate);
                    }
                }
            }
        }
        return {"path": path.concat(smallest).reverse(),"distance":distances[finish]};
    }
}
