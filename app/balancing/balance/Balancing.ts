import {Account} from "../../accounting/account/Account";
import {AccountHandle} from "../../accounting/account/AccountHandle";
import {Balance} from "./Balance";

export class Balancing {
    _balances: Balance[];

    constructor() {
        this._balances = [];
    }
    register(balance: Balance){
        this._balances.push(balance)
    }

    get_accounts({booking_period, cost_center}:AccountHandle): Account[]  {
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
