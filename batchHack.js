/** @param {import(".").NS} ns **/
export async function main(ns) {
    const home = ns.getHostname();
    const target = ns.args[0];
    const cores = 8
    const serverMaxMoney = ns.getServerMaxMoney(target);
    let hackLevel = ns.getPlayer()['hacking'];
    hackLevel = ns.getPlayer()['hacking'];
    
    const hackMultiplier = .5;
    const growthAmount = 1/(1-hackMultiplier);

    //hack 50% of funds
    let hackThreads= ns.hackAnalyzeThreads(target, serverMaxMoney * hackMultiplier); //Predict the effect of hack.
    let hackSecIncrease = ns.hackAnalyzeSecurity(hackThreads);
    
    //repair hack sec increase
    let singleWeaken= ns.weakenAnalyze(1, cores); //weaken effect of one thread
    let repairHackThreads = Math.ceil(hackSecIncrease/singleWeaken);

    //grow 2x
    let growthAnalyze = ns.growthAnalyze(target, growthAmount, cores); //Calculate threads to grow 2x
    let growthThreads = Math.ceil(growthAnalyze);

    //repair growth sec increase
    let growthSecIncrease = ns.growthAnalyzeSecurity(growthThreads); //Calculate the security increase for a number of thread.
    let repairGrowthThreads = Math.ceil(growthSecIncrease/singleWeaken);

    //calculate times
    let weakenTime = ns.getWeakenTime(target);
    let growTime = ns.getGrowTime(target);
    let hackTime = ns.getHackTime(target);

    const offset = 500;
    const maxBatch = Math.floor(weakenTime/offset/2) - 1;

    let hackSleep = weakenTime - hackTime;
    let hackRepairSleep = offset/4;
    let growSleep = weakenTime - growTime + offset*2/4;
    let growRepairSleep = hackRepairSleep + offset*3/4;

    let scriptId = 0;
    let batchCount = 0;
    const threadMultiplier = 2;

    while (true){
        await ns.exec('hack.js', home, hackThreads, target, hackSleep, scriptId); //hack 50%
        await ns.exec('weaken.js', home, repairHackThreads*threadMultiplier, target, hackRepairSleep,scriptId); //repair hack sec
        await ns.exec('grow.js', home, growthThreads*threadMultiplier, target, growSleep, scriptId); //grow 100%
        await ns.exec('weaken.js', home, repairGrowthThreads*threadMultiplier, target, growRepairSleep,scriptId); //repair grow sec
        await ns.sleep(offset)
        scriptId++
        batchCount++
        if (batchCount > maxBatch){
            ns.tprint('Max Batch Achieved');
            await ns.sleep(weakenTime);
            batchCount = 0
        }
        // ns.tprint(batchCount)
    }
}


// ns.tprint('---------------');
// ns.tprint(`hackThreads: ${hackThreads}`);
// ns.tprint(`repairHackThreads: ${repairHackThreads}`);
// ns.tprint(`growthThreads: ${growthThreads}`);
// ns.tprint(`repairGrowthThreads: ${repairGrowthThreads}`);

//calculate grow %
//calculate grow threads for 100%
//calculate hack %
//calculate hack threads for 100%


    // const serverMaxRam = ns.getServerMaxRam(target);
    // const serverUsedRam = ns.getServerUsedRam(target);
