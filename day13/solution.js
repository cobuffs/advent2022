const fs = require('fs');
const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n")

let packets = [];
//let indexofvalids = [];

for(let i = 0; i < entries.length; i=i+3) {
    //read 2 lines at a time and build pairs
    const p1 = eval(entries[i]);
    const p2 = eval(entries[i+1]);
    packets.push(p1);
    packets.push(p2);
    // const validpair = compare(p1,p2);
    // if(validpair) indexofvalids.push(pairs.length);
}
//console.log(indexofvalids.reduce((p,v) => {return p+v;}));
packets.push([[2]]);
packets.push([[6]]);

packets.sort((a,b) => {return sortpackets(a,b);});

//find 2 and 6
let index2 = -1;
let index6 = -1;
for(let i = 0; i < packets.length; i++) {
    if(packets[i].length === 1) {
        const elem = packets[i][0];
        if(elem.length === 1) {
            const deeper = packets[i][0][0];
            if(deeper === 6) index6 = i+1;
            else if(deeper === 2) index2 = i+1;
        }
    }
}
console.log(packets);
console.log(index2*index6);

function sortpackets(a,b) {
    const result = compare(a,b);
    return result ? -1 : 1;
}

function compare(p1,p2) {
    for(let i = 0; i < p1.length; i++) {
        const left = p1[i];
        const right = p2[i];
        if(right === undefined) return false;

        if(!Array.isArray(left) && !Array.isArray(right)) {
            //less than: gtg
            if(left < right) return true;
            //greater than: ded
            if(left > right) return false;
            //equal. keep going

        } else {
            if(Array.isArray(left) && Array.isArray(right)) {
                let valid = compare(left, right);
                if (valid !== null) {
                    return valid;
                }
            } else if(!Array.isArray(left) && Array.isArray(right)) {
                let valid = compare([left],right);
                if (valid !== null) return valid;
            } else {
                let valid = compare(left,[right]);
                if (valid !== null) return valid;
            }
        }
    }
    if(p1.length < p2.length) return true;
    else return null;
}
