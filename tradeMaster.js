/** @param {import(".").NS} ns **/
export async function main(ns) {
    const host = ns.getHostname();
    const symbols = ns.stock.getSymbols();
    const symlist = [];
    for (let sym of symbols){
        let price = ns.stock.getPrice(sym);
        let maxShares = ns.stock.getMaxShares(sym);
        let product = price * maxShares; // marketcap
        symlist.push({'sym': sym, 'max': product});
    };
    symlist.sort((b,a)=> (a.max - b.max)); //sort by descending marketcap
    for (let sym of symlist){
        let symbol = sym['sym']
        ns.exec('trader.js', host, 1, symbol)
    }

}