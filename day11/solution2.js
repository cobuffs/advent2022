//After each monkey inspects an item but before it tests your worry level, your relief that the monkey's inspection didn't damage the item causes your worry level to be divided by three and rounded down to the nearest integer.
let monkeys = buildmonkeys();
const p2treducer = 13*17*19*23;
//const p2treducer = 96577;
//96577
const p2reducer = 11*19*5*2*13*7*3*17;

//i think i want to pass around a set of prime factors instead of worry levels
// for(var i = 0; i < monkeys.length; i++){
//     let newitems = [];
//     let monkey = monkeys[i];
//     for(var j = 0; j < monkey.items.length; j++) {
//         //turn into prime factors
//         let updateditem = primeFactors(monkey.items[j]).sort((a,b) => { return b-a; });
//         newitems.push(updateditem);
//     }
//     monkey.items = newitems;
// }

//go 20 rounds and count the number of inspections for each monkey
for (var round = 1; round <= 10000; round++) {
    //loop through each monkey and go crazy;
    for(var i = 0; i < monkeys.length; i++){
        let monkey = monkeys[i];
        while (monkey.items.length > 0) {
            let item = monkey.items.shift();
            monkey.inspections++;
            let worrylevel = monkey.operation(item);
            //worrylevel = monkey.adjustworry(worrylevel);
            worrylevel = worrylevel % p2reducer;
            let newmonkey = monkey.test(worrylevel);
            monkeys[newmonkey].items.push(worrylevel);
        }
    }
}

let inspections = [];
for(var i = 0; i < monkeys.length; i++){
    inspections.push(monkeys[i].inspections);
}
inspections.sort((a,b) => { return b-a });
console.log(inspections);
console.log(inspections[0] * inspections[1]);


function buildtestmonkeys() { 
    let monkeys = [];
    const monkey0 = {
        "inspections":0,
        "items":[79, 98],
        "operation": function(worrylevel) { return worrylevel * 19; },
        "test": function(worrylevel) { 
            return worrylevel % 23 === 0 ? 2 : 3; 
        }
    };
    monkeys.push(monkey0);

    const monkey1 = {
        "inspections":0,
        "items":[54, 65, 75, 74],
        "operation": function(worrylevel) { return worrylevel + 6; },
        "test": function(worrylevel) { 
            return worrylevel % 19 === 0 ? 2 : 0; 
        }
    };
    monkeys.push(monkey1);

    const monkey2 = {
        "inspections":0,
        "items":[79, 60, 97],
        "operation": function(worrylevel) { return worrylevel * worrylevel; },
        "test": function(worrylevel) {     
            return worrylevel % 13 === 0 ? 1 : 3; 
        }
    };
    monkeys.push(monkey2);

    const monkey3 = {
        "inspections":0,
        "items":[74],
        "operation": function(worrylevel) { return worrylevel + 3; },      
        "test": function(worrylevel) { 
            return worrylevel % 17 === 0 ? 0 : 1; 
        }
    };
    monkeys.push(monkey3);

    return monkeys;
}

function buildmonkeys () {
    let monkeys = [];
    const monkey0 = {
        "inspections":0,
        "items":[97, 81, 57, 57, 91, 61],
        "operation": function(worrylevel) { return worrylevel * 7; },
        "test": function(worrylevel) { return worrylevel % 11 === 0 ? 5 : 6; }
    };
    monkeys.push(monkey0);

    const monkey1 = {
        "inspections":0,
        "items":[88, 62, 68, 90],
        "operation": function(worrylevel) { return worrylevel * 17; },
        "test": function(worrylevel) { return worrylevel % 19 === 0 ? 4 : 2; }
    };
    monkeys.push(monkey1);

    const monkey2 = {
        "inspections":0,
        "items":[74, 87],
        "operation": function(worrylevel) { return worrylevel + 2; },
        "test": function(worrylevel) { return worrylevel % 5 === 0 ? 7 : 4; }
    };
    monkeys.push(monkey2);

    const monkey3 = {
        "inspections":0,
        "items":[53, 81, 60, 87, 90, 99, 75],
        "operation": function(worrylevel) { return worrylevel + 1; },
        "test": function(worrylevel) { return worrylevel % 2 === 0 ? 2 : 1; }
    };
    monkeys.push(monkey3);

    const monkey4 = {
        "inspections":0,
        "items":[57],
        "operation": function(worrylevel) { return worrylevel + 6; },
        "test": function(worrylevel) { return worrylevel % 13 === 0 ? 7 : 0; }
    };
    monkeys.push(monkey4);

    const monkey5 = {
        "inspections":0,
        "items":[54, 84, 91, 55, 59, 72, 75, 70],
        "operation": function(worrylevel) { return worrylevel * worrylevel; },
        "test": function(worrylevel) { return worrylevel % 7 === 0 ? 6 : 3; }
    };
    monkeys.push(monkey5);

    const monkey6 = {
        "inspections":0,
        "items":[95, 79, 79, 68, 78],
        "operation": function(worrylevel) { return worrylevel + 3; },
        "test": function(worrylevel) { return worrylevel % 3 === 0 ? 1 : 3; }
    };
    monkeys.push(monkey6);

    const monkey7 = {
        "inspections":0,
        "items":[61, 97, 67],
        "operation": function(worrylevel) { return worrylevel + 4; },
        "test": function(worrylevel) { return worrylevel % 17 === 0 ? 0 : 5; }
    };
    monkeys.push(monkey7);


    return monkeys;
}

// function leastCommonMultiple(a, b) {
//     // Make sure a and b are positive
    
//     a = Math.abs(a);
//     b = Math.abs(b);
  
//     // Calculate the greatest common divisor (GCD) of a and b
//     let gcd = 1;
//     for (let i = 2; i <= Math.min(a, b); i++) {
//       if (a % i === 0 && b % i === 0) {
//         gcd = i;
//       }
//     }
  
//     // Return the product of a and b divided by the GCD
//     return (a * b) / gcd;
//   }

function leastCommonMultiple(min, max) {
    function range(min, max) {
        var arr = [];
        for (var i = min; i <= max; i++) {
            arr.push(i);
        }
        return arr;
    }

    function gcd(a, b) {
        return !b ? a : gcd(b, a % b);
    }

    function lcm(a, b) {
        return (a * b) / gcd(a, b);   
    }

    var multiple = min;
    range(min, max).forEach(function(n) {
        multiple = lcm(multiple, n);
    });

    return multiple;
}

function primeFactors(n) {
    const factors = [];
    let divisor = 2;
  
    while (n >= 2) {
        if (n % divisor == 0) {
            factors.push(divisor);
            n = n / divisor;
        } else {
            divisor++;
        }
    }
    return factors;
}