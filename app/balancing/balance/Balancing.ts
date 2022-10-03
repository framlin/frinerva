import {Balance} from "./Balance";

class Balancing {
    _balances: Balance[];

    constructor() {
        this._balances = [];
    }
    register(balance: Balance){
        this._balances.push(balance)
    }

    get_accounts(cost_center: string, booking_period: string) {
        let balances = [];
        let accounts = []
        for(let balance of this._balances) {
            if (balance.booking_period === booking_period){
                balances.push(balance);
            }
        }

        for(let balance of balances) {
            for (let account of balance.accounts) {
                if (account.cost_center === cost_center) {
                    accounts.push(account);
                }
            }
        }
        return accounts;
    }
}

module.exports = Balancing;
export {Balancing}