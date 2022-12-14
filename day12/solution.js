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

const fs = require('fs');
const entries = fs.readFileSync('sample.txt', 'utf8').toString().trim().split("\n")

let heightmap = [];
let weighted = new WeightedGraph();
let vertexes = new Map();
let start = "";
let end = "";


for(let i = 0; i < entries.length; i++) {
    //i is the column
    let row = entries[i].split('');
    heightmap.push(row);
    for(let col = 0; col < row.length; col++) {
        let val = row[col];
        if (val === "S") val = "a";
        else if (val === "E") val = "z";
        vertexes.set(`${i}, ${col}`, {"key":`${i}, ${col}`, "val": val});
    }
}

buildconnections();
//
console.log(weighted.shortestPath(start.key, end.key));
//console.log(weighted.Dijkstra(start.key, end.key).path.length);

function buildconnections() {
    for(let row = 0; row < heightmap.length; row++) {
        for(let col = 0; col < heightmap[row].length; col++) {
            let node = heightmap[row][col];
            const key = `${row}, ${col}`;
            //create a vertex if it doesnt exit
            weighted.addVertex(key);
            if(node === "S") {
                start = {"key": key , "col": col, "row":row};
                node = "a";
            } else if(node === "E") {
                end = {"key": key, "col": col, "row":row};
                node = "z";
            }
            //create an edge where we can
            //N
            if(row > 0) {
                //lowercase = 1-26, uppercase = 27-52
                const key2 = `${row - 1}, ${col}`;
                const neighbor = vertexes.get(key2).val;
                const weight = neighbor.charCodeAt(0) - node.charCodeAt(0);
                if(weight <= 1 ) {
                    //can go down but cant go up more than 1
                    weighted.addEdge(key, key2, weight);
                }
            }
            //S
            if(row < heightmap.length - 1) {
                //lowercase = 1-26, uppercase = 27-52
                const key2 = `${row + 1}, ${col}`;
                const neighbor = vertexes.get(key2).val;
                const weight = neighbor.charCodeAt(0) - node.charCodeAt(0);
                if(weight <= 1) {
                    //can go down but cant go up more than 1
                    weighted.addEdge(key, key2, weight);
                }
            }
            //E
            if(col < heightmap[row].length - 1) {
                //lowercase = 1-26, uppercase = 27-52
                const key2 = `${row}, ${col+1}`;
                const neighbor = vertexes.get(key2).val;
                const weight = neighbor.charCodeAt(0) - node.charCodeAt(0);
                if(weight <= 1) {
                    //can go down but cant go up more than 1
                    weighted.addEdge(key, key2, weight);
                }
            }
            //W
            if(col > 0) {
                //lowercase = 1-26, uppercase = 27-52
                const key2 = `${row}, ${col-1}`;
                const neighbor = vertexes.get(key2).val;
                const weight = neighbor.charCodeAt(0) - node.charCodeAt(0);
                if(weight <= 1) {
                    //can go down but cant go up more than 1
                    weighted.addEdge(key, key2, weight);
                }
            }
        }
    }
}