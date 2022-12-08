const fs = require('fs');
const entries = fs.readFileSync('input.txt', 'utf8').toString().trim().split("\r\n")
//for each entry $ is a command...either cd or ls

let root =  buildnode("/", null);
let workingfolder = root;

for(var i = 0; i < entries.length;) {
    const entry = entries[i].split(" ");
    if(entry[0] === "$") {
        //command
        if(entry[1] === "cd") {
            //set working directory
            // can be .., a dir name, or /
            const location = entry[2];
            if(location === "..") {
                //go up a directory
                workingfolder = workingfolder.parent;
            } else if (location === "/"){
                workingfolder = root;
            } else {
                //go to a folder
                workingfolder = workingfolder.folders.get(location);
            }
            i++;
        } else {
            //ls
            //read until we get to a $
            while(i < entries.length - 1) {
                i = i+1;
                const content = entries[i].split(" ");
                if (content[0] === "$") {
                    break;
                } else {
                    if (content[0] === "dir") {
                        const folder = buildnode(content[1], workingfolder);
                        workingfolder.folders.set(folder.name, folder);
                    } else {
                        //file
                        const file = buildfile(content[1], Number(content[0]));
                        workingfolder.files.set(file.name, file);
                    }
                }
            }
        }
    } else {
        i++;
    }
}


function buildnode(dirname, parent) {
    return {
        "files":new Map(),
        "folders":new Map(),
        "name":dirname,
        "parent":parent,
        "size":0
    }
}

function buildfile(filename, size) {
    return {
        "name":filename, 
        "size":size
    }
}
//doit();
//dfs?


let totalsize = 0;
recur(root);

function recur(node) {
    //get sizes
    node.files.forEach((v,k) => node.size += v.size);
    node.folders.forEach((v,k) => node.size += recur(v));
    //console.log(`checking ${node.name} ${node.size}`);
    if(node.size <= 100000) {
        totalsize += node.size;
    }
    return node.size;
}
console.log(totalsize);
const totaldrive = 70000000;
const amountforupdate = 30000000;
const amounttofree = amountforupdate - (totaldrive - root.size);
console.log(amounttofree);

//find candidates that free up at least amounttofree
let candidates = [];
doit();
function doit() {
    let stack = [];
    stack.push(root);
    while(stack.length > 0) {
        const workingnode = stack.pop();
        //console.log(`working on ${workingnode.name} with size ${workingnode.size}. need to free ${amounttofree}`);
        if(workingnode.size >= amounttofree) candidates.push(workingnode.size);
        //put each folder into the hopper
        workingnode.folders.forEach((v,k) => stack.push(v));
    }
}
console.log(candidates.sort((a,b) => a-b)[0]);