const fs = require('fs');
const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n")
let forest = [];

for(let i = 0; i < entries.length; i++) {
    const row = entries[i];
    forest.push(row.split("").map(Number));
}

part2();

function part1(){
    let visibletrees = [];

    //check every tree
    for(let x = 0; x < forest.length; x++) {
        for (let y = 0; y < forest[x].length; y++) {
            const treeh = forest[x][y];
            //edge
            if (x === 0 || y === 0 || x === (forest.length - 1) || y === (forest[x].length - 1)) visibletrees.push(treeh);
            else {
                //go till you hit an edge in every direction
                //N
                let N = x - 1;
                let added = false;
                while (N >= 0) {
                    if(forest[N][y] >= treeh) {
                        break;
                    }
                    N--;
                    if(N === -1) {
                        added = true;
                        visibletrees.push(treeh);
                    }
                }
                //S
                let S = x + 1;
                while (S < forest.length && !added) {
                    if(forest[S][y] >= treeh) {
                        visible = false;
                        break;
                    }
                    S++;
                    if(S === forest.length) {
                        added = true;
                        visibletrees.push(treeh);
                    }
                }
                //E
                let E = y + 1;
                while (E < forest[x].length && !added) {
                    if(forest[x][E] >= treeh) {
                        visible = false;
                        break;
                    }
                    E++;
                    if(E === forest[x].length) {
                        added = true;
                        visibletrees.push(treeh);
                    }
                }
                //W
                let W = y - 1;
                while (W >= 0 && !added) {
                    if(forest[x][W] >= treeh) {
                        visible = false;
                        break;
                    }
                    W--;
                    if(W === -1) {
                        added = true;
                        visibletrees.push(treeh);
                    }
                }
            }
        }
    }
    console.log(visibletrees.length);
}

function part2(){
    
    let maxtrees = 0;

    //how many trees can i see?

    //check every tree
    for(let x = 0; x < forest.length; x++) {
        for (let y = 0; y < forest[x].length; y++) {
            const treeh = forest[x][y];
            //I can see trees until I hit one taller than the one I am checking
            
            //N
            let N = x - 1;
            let Ns = [];
            if(N !== -1) {
                let Nheight = forest[N][y];
                Ns.push(Nheight);
                N--;
                if (Nheight < treeh) {
                    let doit = true;
                    while (N >= 0 && doit) {
                        Nheight = forest[N][y];
                        if(Nheight >= treeh) {
                            doit = false;
                        }
                        N--;
                        Ns.push(Nheight);
                    }
                }
            }

            //S
            let S = x + 1;
            let Ss = [];
            if(S < forest.length) {
                let Sheight = forest[S][y];
                Ss.push(Sheight);
                S++;
                if (Sheight < treeh) {
                    let doit = true;
                    while (S < forest.length && doit) {
                        Sheight = forest[S][y];
                        if(Sheight >= treeh) {
                            doit = false;
                        }
                        S++;
                        Ss.push(Sheight);
                    }
                }
            }

            //E
            let E = y + 1;
            let Es = [];
            if (E < forest[x].length) {
                let Eheight = forest[x][E];
                Es.push(Eheight);
                E++;
                if (Eheight < treeh) {
                    let doit = true;
                    while (E < forest[x].length && doit) {
                        Eheight = forest[x][E];
                        if(Eheight >= treeh) {
                            doit = false;
                        }
                        E++;
                        Es.push(Eheight);
                    }
                }
            }

            //W
            let W = y - 1;
            let Ws = [];
            if (W !== -1) {
                let Wheight = forest[x][W];
                Ws.push(Wheight);
                W--;
                if (Wheight < treeh) {
                    let doit = true;
                    while (W >= 0 && doit) {
                        Wheight = forest[x][W];
                        if(Wheight >= treeh) {
                            doit = false;
                        }
                        W--;
                        Ws.push(Wheight);
                    }
                }
            }
            let score = Ns.length * Ss.length * Es.length * Ws.length;
            if(score > maxtrees) maxtrees = score;
        }
    }
    console.log(maxtrees);
}
