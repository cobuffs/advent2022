const fs = require('fs');

const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n");
let elfpairs = [];
let count = 0;
let count2 = 0;

for(let i = 0; i < entries.length; i++) {
    const pairs = entries[i].split(",");
    elfpairs.push([buildrange(pairs[0]), buildrange(pairs[1])]);
}

for (let i = 0; i < elfpairs.length; i++) {
    count += checkforredundency(elfpairs[i]);
    count2 += checkforoverlap(elfpairs[i]);
}
console.log(count);
console.log(count2);

function buildrange(range) {
    const [start,end] = range.split('-').map(Number);
    return {"start": start, "end": end};
}

function checkforoverlap(pair) {
    const p1 = pair[0];
    const p2 = pair[1];

    if((p1.end < p2.start || p2.end < p1.start)) {
        console.log(pair);
        return 0;
    } else return 1;
}

function checkforredundency(pair) {
    const p1 = pair[0];
    const p2 = pair[1];

    if((p1.start >= p2.start && p1.end <= p2.end) || (p2.start >= p1.start && p2.end <= p1.end)) {
        //console.log(pair);
        return 1;
    } else return 0;
}

