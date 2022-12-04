const fs = require('fs');

const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n");
let elves = []
elves.push(createelf());
let curelfpos = 0;
let maxsum = 0;
let sums = [];
for(var i = 0; i < entries.length; i++) {
    let elf = elves[curelfpos];
    const entry = parseInt(entries[i], 10);
    if(!entry) {
        //log off the sum
        sums.push(elf.sum);
        elves.push(createelf());
        curelfpos++;
    } else {
        elf.food.push(entry);
        elf.sum += entry;
        //if(elf.sum > maxsum) maxsum = elf.sum;
    }

}
const sums2 = elves.map(x => x.sum);
console.log(sums2.sort((a,b) => b-a).slice(0,3).reduce((p,c) => p+c));

function createelf() {
    return {"food":[], "sum":0};
}