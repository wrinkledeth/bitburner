/** @param {import(".").NS} ns **/
export async function main(ns) {  //targetServer, sleeptime
    const target = ns.args[0];
    const sleepTime = ns.args[1];
    await ns.sleep(sleepTime);
    let hackedMoney = await ns.hack(target);
    if (hackedMoney){
        ns.tprint(`${target} hacked for $${ns.nFormat(hackedMoney,'0.00a')}`);
    }
    //ns.tprint(`Sever Security Level = ${ns.getServerSecurityLevel(target)}`);
}
