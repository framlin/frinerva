import {Account} from "../../accounting/entites/Account";
import {AccountHandle} from "../../accounting/entites/AccountHandle";
import {Balance, BALANCE_ID} from "./Balance";
import {DomainEntity} from "../../common/domain/DomainEntity";
import {Observable} from "../../common/observation/Observable";
import {Observer} from "../../common/observation/Observer";
import {Observatory} from "../../common/observation/Observatory";
import {DomainHelper} from "../../common/domain/DomainHelper";

export class Balancing extends DomainEntity implements Observable<Balance> {
    provide_at(observatory: Observatory): void {
        throw new Error("Method not implemented.");
    }

    constructor(domain_helper: typeof DomainHelper) {
        super(domain_helper);
        this._balances = [];
    }

    add(observer: Observer<Balance>): void {
        throw new Error("Method not implemented.");
    }
    set state(value: Balance) {
        throw new Error("Method not implemented.");
    }
    get state(): Balance {
        throw new Error("Method not implemented.");
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

    private readonly _balances: Balance[];
    CLASS_ID: Balance = BALANCE_ID;
}
