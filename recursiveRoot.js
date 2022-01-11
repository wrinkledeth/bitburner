/** @param {import(".").NS} ns **/
export async function main(ns) {
    const targets = [ns.getHostname()];
    const hosts = rscan(targets,ns);
    for (let host of hosts){
        ns.tprint('------------------------------------')
        ns.tprint(host);
        root(host,ns);

        const lit_files = ns.ls(host,'.lit');
        for (let lit of lit_files){
            await ns.scp(file,host,'server1');
        }

        // generate object with all server attributes.
        // upload weaken and grow scripts, run them.
    }
}

/** @param {import(".").NS} ns **/
function rscan(targets, ns) {
    for (let target of targets){
        let neighbors = ns.scan(target);
        for (let neighbor of neighbors){
            if (!targets.includes(neighbor)) {
                targets.push(neighbor);
            }
        }
    }
    return targets;
}

//function rscan
// for item in oldlist, run scan
// for item in newlist, if item not in oldlist, run rscan.
// return newlist

/** @param {import(".").NS} ns **/
function root(target, ns) {
    ns.brutessh(target);
    ns.ftpcrack(target);
    ns.httpworm(target);
    ns.relaysmtp(target);
    ns.sqlinject(target);
    ns.nuke(target);
    //ns.installBackdoor();
}


// Recursively Find all hosts
// Create a dictionary name, status,  

// const { server, maxMoney, securityLevel, minSecurityLevel, moneyAvailable } = serverData;x

//   run basic.js omega-net -t 420

//always use const (cant change)
//if you need to change it, use let 


//let and var both let you change it, var expands the scope outside of current context. Let keeps it within. 