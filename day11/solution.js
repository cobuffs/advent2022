//After each monkey inspects an item but before it tests your worry level, your relief that the monkey's inspection didn't damage the item causes your worry level to be divided by three and rounded down to the nearest integer.
let monkeys = buildtestmonkeys();

//go 20 rounds and count the number of inspections for each monkey
for (var round = 1; round <= 10000; round++) {
    //loop through each monkey and go crazy;
    for(var i = 0; i < monkeys.length; i++){
        let monkey = monkeys[i];
        while (monkey.items.length > 0) {
            item = monkey.items.shift();
            monkey.inspections++;
            let worrylevel = monkey.operation(item);
            //worrylevel = Math.floor(worrylevel / 3);
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
console.log(isdivby11("512006"));

function buildtestmonkeys() { 
    let monkeys = [];
    const monkey0 = {
        "inspections":0,
        "items":[79, 98],
        "operation": function(worrylevel) { return worrylevel * 19; },
        "test": function(worrylevel) { return worrylevel % 23 === 0 ? 2 : 3; }
    };
    monkeys.push(monkey0);

    const monkey1 = {
        "inspections":0,
        "items":[54, 65, 75, 74],
        "operation": function(worrylevel) { return worrylevel + 6; },
        "test": function(worrylevel) { return worrylevel % 19 === 0 ? 2 : 0; }
    };
    monkeys.push(monkey1);

    const monkey2 = {
        "inspections":0,
        "items":[79, 60, 97],
        "operation": function(worrylevel) { return worrylevel * worrylevel; },
        "test": function(worrylevel) { return worrylevel % 13 === 0 ? 1 : 3; }
    };
    monkeys.push(monkey2);

    const monkey3 = {
        "inspections":0,
        "items":[74],
        "operation": function(worrylevel) { return worrylevel + 3; },
        "test": function(worrylevel) { return worrylevel % 17 === 0 ? 0 : 1; }
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

function isdivby23(strnum) {
    while(strnum.length > 2) {
        //remove last digit
        const lastdigit = Number(strnum.substring(strnum.length - 1));
        strnum = strnum.slice(0, -1);
        if (strnum.length > 4) {
            let newend = Number(strnum.substring(strnum.length - 3)) + (lastdigit*7);
            strnum = strnum.slice(0, -3);
            strnum += newend;  
        } else {
            strnum = "" + (Number(strnum) + (lastdigit*7))
        }
    }
    return Number(strnum) % 23 === 0
}

function isdivby19(strnum) {
    while(strnum.length > 2) {
        //remove last digit
        const lastdigit = Number(strnum.substring(strnum.length - 1));
        strnum = strnum.slice(0, -1);
        if (strnum.length > 4) {
            let newend = Number(strnum.substring(strnum.length - 3)) + (lastdigit*2);
            strnum = strnum.slice(0, -3);
            strnum += newend;  
        } else {
            strnum = "" + (Number(strnum) + (lastdigit*2))
        }
    }
    return Number(strnum) % 19 === 0
}

function isdivby13(strnum) {
    while(strnum.length > 2) {
        //remove last digit
        const lastdigit = Number(strnum.substring(strnum.length - 1));
        strnum = strnum.slice(0, -1);
        if (strnum.length > 4) {
            let newend = Number(strnum.substring(strnum.length - 3)) + (lastdigit*4);
            strnum = strnum.slice(0, -3);
            strnum += newend;  
        } else {
            strnum = "" + (Number(strnum) + (lastdigit*4))
        }
    }
    return Number(strnum) % 13 === 0
}

function isdivby17(strnum) {
    while(strnum.length > 2) {
        //remove last digit
        const lastdigit = Number(strnum.substring(strnum.length - 1));
        strnum = strnum.slice(0, -1);
        if (strnum.length > 4) {
            let newend = Number(strnum.substring(strnum.length - 3)) - (lastdigit*5);
            strnum = strnum.slice(0, -3);
            strnum += newend;  
        } else {
            strnum = "" + (Number(strnum) - (lastdigit*5))
        }
    }
    return Number(strnum) % 17 === 0
}

function isdivby3(strnum) {
    //sum the digits
    const digits = strnum.split("");
    let sum = 0;
    for (var i = 0; i < digits.length; i++) {
        sum += Number(digits[i]);
    }
    return sum % 3 === 0;
}

function isdivby7(strnum) {
    while(strnum.length > 2) {
        //remove last digit
        const lastdigit = Number(strnum.substring(strnum.length - 1));
        strnum = strnum.slice(0, -1);
        if (strnum.length > 4) {
            let newend = Number(strnum.substring(strnum.length - 3)) + (lastdigit*5);
            strnum = strnum.slice(0, -3);
            strnum += newend;  
        } else {
            strnum = "" + (Number(strnum) + (lastdigit*5))
        }
    }
    return Number(strnum) % 7 === 0
}

function isdivby2(strnum) {
    return Number(strnum.substring(strnum.length - 1)) % 2 === 0;
}

function isdivby5(strnum) {
    const last = strnum.substring(strnum.length - 1);
    return last === "5" || last === "0";
}

function isdivby11(strnum) {
    //sum the digits
    const digits = strnum.split("");
    let oddsum = 0;
    let evensum = 0;
    for (var i = 0; i < digits.length; i++) {
        if(i % 2 === 0) {
            evensum += Number(digits[i]);
        } else oddsum += Number(digits[i]);
    }
    return (oddsum - evensum) % 11 === 0;
}