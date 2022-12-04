const fs = require('fs');

const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n");
let scores = [];

for(var i = 0; i < entries.length; i++) {
    let round = entries[i].split(" ")
    scores.push(calcscore2(round[0], round[1]));
}

console.log(scores.reduce((p,c) => p+c));

function calcscore2(them, outcome) {
    let throwscore = 0;
    let result = 0;
    if(them === "A") {
        if (outcome === "X") {
            //lose
            throwscore = 3;
        } else if (outcome === "Y") {
            //tie
            throwscore = 1;
            result = 3;
        } else {
            //win
            throwscore = 2;
            result = 6;
        }
    } else if (them === "B") {
        //paper
        if (outcome === "X") {
            //lose
            throwscore = 1;
        } else if (outcome === "Y") {
            //tie
            throwscore = 2;
            result = 3;
        } else {
            //win
            throwscore = 3;
            result = 6;
        }
    } else {
        if (outcome === "X") {
            //lose
            throwscore = 2;
        } else if (outcome === "Y") {
            //tie
            throwscore = 3;
            result = 3;
        } else {
            //win
            throwscore = 1;
            result = 6;
        }
    }

    return throwscore + result;
}

function calcscore(them, us) {
    let throwscore = 0;
    let result = 0;
    
    if(us === "X") {
        //lose
        throwscore = 1;
        if (them === "A") result = 3;
        else if (them === "B") result = 0;
        else result = 6;
    }
    else if(us === "Y") {
        //tie
        throwscore = 2;
        if (them === "A") result = 6;
        else if (them === "B") result = 3;
        else result = 0;
    }
    else {
        throwscore = 3;
        if (them === "A") result = 0;
        else if (them === "B") result = 6;
        else result = 3;
    }

    return throwscore + result;

}