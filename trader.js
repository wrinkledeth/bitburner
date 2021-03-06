/** @param {import(".").NS} ns **/
export async function main(ns) {
    const sym = ns.args[0]; //FLCM, WDS etc..
    const maxShares = ns.stock.getMaxShares(sym);
    let holding = false;
    let shares;
    let cost;
    while (true) {
        await ns.sleep(6000);
        let forecast = ns.stock.getForecast(sym);
        //ns.tprint(forecast); 
        if (forecast > .6 & !holding) {
            ns.tprint('------------------');
            ns.tprint(`Forecast % = ${forecast}`)
            shares, cost = buy(sym);
            holding = true;
        }
        if (forecast < .54 & holding) {
            ns.tprint('------------------');
            ns.tprint(`Forecast % = ${forecast}`);
            sell(sym, shares, cost);
            holding = false;
        }
    }

    function buy(sym) {
        const ask = ns.stock.getAskPrice(sym);
        const money = ns.getPlayer().money;
        shares = Math.min((money -100000)/ ask, maxShares);
        cost = ask * shares;
        if (true){        
            ns.tprint(`buying ${ns.nFormat(shares-1,'0.00a')} shares of ${sym} at ${ns.nFormat(ask,'$0.00a')} price`);
            ns.stock.buy(sym, shares);
        }
        return shares, cost;
    }

    function sell(sym, shares, cost) {
        const bid = ns.stock.getBidPrice(sym);
        ns.tprint(`selling ${ns.nFormat(shares,'0.00a')} shares of ${sym} at ${ns.nFormat(bid,'$0.00a')} price`)
        ns.stock.sell(sym, shares);
        const profit = ns.nFormat(bid * shares - cost, '$0.00a');
        ns.tprint(`PROFIT = ${profit}`);
        ns.tprint(`cash = ${ns.nFormat(ns.getPlayer().money, '$0.00a')}`);
    }
}