const fs = require('fs');
const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n")

let pairs = [];
let indexofvalids = [];

for(let i = 0; i < entries.length; i=i+3) {
    //read 2 lines at a time and build pairs
    const p1 = eval(entries[i]);
    const p2 = eval(entries[i+1]);
    pairs.push([p1,p2]);
    const validpair = compare(p1,p2);
    if(validpair) indexofvalids.push(pairs.length);
}
console.log(indexofvalids.reduce((p,v) => {return p+v;}));


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


// function compare(p1,p2) {
//     //get types to match
//     let valid = true;
//     if(p2 === undefined) valid = false;
//     for(var index = 0; index < p1.length && valid; index++) {
//         if(index >= p2.length) return false;
//         const left = p1[index];
//         const right = p2[index];
//         //check if p2 is out of items
//         if(!Array.isArray(left) && Array.isArray(right)) valid = compare([left],right);
//         if(Array.isArray(left) && !Array.isArray(right) && valid) valid = compare(left,[right]);
        
//         if(!Array.isArray(left) && !Array.isArray(right)) {
//             if(left < right) return true;
//             else if(left > right) {
//                 //console.log(`compare ${p1[index]} and ${p2[index]}`);
//                 return false;
//             }
//         } else {
//             valid = compare(left, right);
//         }
//     }

//     return valid;
// }