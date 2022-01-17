/** @param {import(".").NS} ns **/
export async function main(ns) {
    const hackableTargets = returnHackableTargets(ns)
    for (let target of hackableTargets){
        getRoot(ns, target);
        uploadScripts(ns, target);
    }
    for (let target of hackableTargets){
        let maxMoney = ns.getServerMaxMoney(target);
        let currentMoney = ns.getServerMoneyAvailable(target);
        if ((maxMoney > 1500000000) & (currentMoney === maxMoney)){
            ns.exec('batchHack.js',ns.getHostname(),1,target);  
            // ns.tprint(target);
            // ns.tprint(maxMoney);
        }
    }
}

/** @param {import(".").NS} ns **/
function uploadScripts(ns, target){

}

/** @param {import(".").NS} ns **/
function doSomething(ns, target){

}


/** @param {import(".").NS} ns **/
function getRoot(ns, target) {
    const purchasedExecutables = getPurchasedExecutables(ns);
    for (let exe of purchasedExecutables){
        switch(exe){
            case 'BruteSSH.exe': 
                ns.brutessh(target);
                break;
            case 'FTPCrack.exe': 
                ns.ftpcrack(target)
                break;
            case 'relaySMTP.exe': 
                ns.relaysmtp(target);
                break;
            case 'HTTPWorm.exe': 
                ns.httpworm(target)
                break;
            case 'SQLInject.exe': 
                ns.sqlinject(target);
        }
    }
    ns.nuke(target);
}

/** @param {import(".").NS} ns **/
function returnHackableTargets(ns){
    const currentHost = ns.getHostname();
    const initialTargets = [currentHost];
    const targets = recursiveScan(initialTargets,ns);
    const hackLevel = ns.getHackingLevel();
    const exe_count = getPurchasedExecutables(ns).length;
    const hackableTargets = []
    for (let target of targets){
        const hackLevelNeeded = ns.getServerRequiredHackingLevel(target);
        const portsNeeded = ns.getServerNumPortsRequired(target);
        if ((exe_count >= portsNeeded) & (hackLevel >= hackLevelNeeded)){
            
            hackableTargets.push(target);
        }
    }
    return hackableTargets
}

/** @param {import(".").NS} ns **/
function getPurchasedExecutables(ns) {
    const currentHost = ns.getHostname();
    const executables = ['BruteSSH.exe', 'FTPCrack.exe', 'relaySMTP.exe', 'HTTPWorm.exe', 'SQLInject.exe'];
    const purchasedExecutables = [];
    for (let exe of executables){
        if (ns.fileExists(exe,currentHost)){
            purchasedExecutables.push(exe);
        }
    }
    return purchasedExecutables;
}

/** @param {import(".").NS} ns **/
function recursiveScan(targets, ns) {
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

// /** @param {import(".").NS} ns **/
// function rootBox(target, ns) {
//     ns.brutessh(target);
//     ns.ftpcrack(target);
//     ns.httpworm(target);
//     ns.relaysmtp(target);
//     ns.sqlinject(target);
//     ns.nuke(target);
//     //ns.installBackdoor();
// }




// Recursively Find all hosts
// Create a dictionary name, status,  

// const { server, maxMoney, securityLevel, minSecurityLevel, moneyAvailable } = serverData;x

//   run basic.js omega-net -t 420

//always use const (cant change)
//if you need to change it, use let 


//let and var both let you change it, var expands the scope outside of current context. Let keeps it within. 



        // rootBox(host,ns);

        // const lit_files = ns.ls(host,'.lit');
        // for (let lit of lit_files){
        //     await ns.scp(lit_files,host,'server1');
        // }

        // generate object with all server attributes.
        // upload weaken and grow scripts, run them.