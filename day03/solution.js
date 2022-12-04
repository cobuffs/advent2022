const fs = require('fs');

const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n");
let sacks = [];
let sum = 0;
console.log(findCommonTypes(entries));
for(let i = 0; i < entries.length; i++) {
    let contents = entries[i];
    let compartment1 = contents.substring(0, contents.length / 2).split('');
    let compartment2 = contents.substring(contents.length / 2).split('');
    const sack = {
        "priority":convertitemtopriority(compartment1.filter(v => compartment2.includes(v))[0]),
        "contents":contents.split(''),
        "compartments":[compartment1, compartment2]
        };
    sacks.push(sack);
    sum+= sack.priority;
//    console.log(`for contents: ${contents}, comp1: ${compartment1} and comp2: ${compartment2}`);
}

let badgesum = 0;
for(let i = 0; i < sacks.length; i = i+3) {
    const sack1 = sacks[i].contents;
    const sack2 = sacks[i+1].contents;
    const sack3 = sacks[i+2].contents;
    const common1 = sack1.filter(v => sack2.includes(v));
    const common2 = common1.filter(v => sack3.includes(v));
    const badge = common2[0];
    badgesum += convertitemtopriority(badge);
}

console.log(badgesum);
function convertitemtopriority(item) {
    const code = item.charCodeAt(0);
    if (code > 96) {
        //lower case
        return code - 96;
    } else return code - 38;
}


// Create a function to find the common item types in each rucksack
function findCommonTypes(rucksacks) {
    // Create a variable to keep track of the sum of the priorities
    let sum = 0;
  
    // Loop through each rucksack
    for (const rucksack of rucksacks) {
      // Create a Set to store the items in the first compartment
      const firstCompartment = new Set(rucksack.slice(0, rucksack.length / 2));
  
      // Create a Set to store the items in the second compartment
      const secondCompartment = new Set(rucksack.slice(rucksack.length / 2));
  
      // Find the intersection of the two Sets
      const commonTypes = new Set([...firstCompartment].filter(x => secondCompartment.has(x)));
  
      // If there are any common types, calculate the priority and add it to the sum
      if (commonTypes.size > 0) {
        // Convert the common type to a priority (lowercase = 1-26, uppercase = 27-52)
        const priority = commonTypes.values().next().value.charCodeAt(0);
        if (priority >= 97) {
          sum += priority - 96;
        } else {
          sum += priority - 38;
        }
      }
    }
  
    // Return the sum of the priorities
    return sum;
  }
  
  // Test the function with the example from the prompt
//   console.log(findCommonTypes([
//     'vJrwpWtwJgWrhcsFMMfFFhFp',
//     'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
//     'PmmdzqPrVvPwwTWBwg',
//     'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
//     'ttgJtRGJQctTZtZT',
//     'CrZsJsPPZsGzwwsLwLmpwMDw'
//   ])); // 157