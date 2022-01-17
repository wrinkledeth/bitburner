/** @param {import(".").NS} ns **/
async function weakenMax(ns, target){
    const cores = 8;
    const serverMinSecurityLevel = ns.getServerMinSecurityLevel(target);
    let serverSecurityLevel = ns.getServerSecurityLevel(target);
    if (serverSecurityLevel > serverMinSecurityLevel){
        
        let singleWeaken= ns.weakenAnalyze(1, cores); //weaken effect of one thread
        let weakenThreads = Math.ceil((serverSecurityLevel - serverMinSecurityLevel)/singleWeaken);
        await ns.exec('weaken.js','home',weakenThreads, target, 0, 1); 
        let weakenTime = ns.getWeakenTime(target);
        await ns.sleep(weakenTime + 1000);
    }
}

/** @param {import(".").NS} ns **/
async function growMax(ns, target){
    const cores = 8;
    const serverMaxMoney = ns.getServerMaxMoney(target);
    let serverMoneyAvailable = ns.getServerMoneyAvailable(target);
    if (serverMoneyAvailable < serverMaxMoney){
        let maxGrowthMultiplier = Math.ceil(serverMaxMoney/serverMoneyAvailable);
        let growthThreads = ns.growthAnalyze(target, maxGrowthMultiplier, cores); //threads needed to grow to max
        await ns.exec('grow.js','home', growthThreads, target, 0, 1); //script, thisServer, threads, targetServer, sleeptime, number
        let growTime = ns.getGrowTime(target);
        await ns.sleep(growTime + 1000);
    }
}

/** @param {import(".").NS} ns **/
export async function main(ns) {
    const target = ns.args[0];
    if (ns.getServerMoneyAvailable(target) === 0){
        let growTime = ns.getGrowTime(target);
        await ns.grow(target);
        await ns.sleep(growTime + 1000);
    }
    ns.tprint(`initial weaken executed on ${target}`);
    await weakenMax(ns,target); 
    ns.tprint(`initial grow executed on ${target}`);
    await growMax(ns,target);
    ns.tprint(`final weaken executed on ${target}`);
    await weakenMax(ns,target);
    ns.tprint(`${target} fully prepped`)
}