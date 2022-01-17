/** @param {import(".").NS} ns **/
export async function main(ns) {  //targetServer, sleeptime
    const target = ns.args[0];
    const sleepTime = ns.args[1];
    await ns.sleep(sleepTime);
    await ns.grow(target);
}
