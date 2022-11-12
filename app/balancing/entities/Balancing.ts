import {Account, ACCOUNT_ID} from "../../accounting/entites/Account";
import {AccountHandle} from "../../accounting/entites/AccountHandle";
import {Subject} from "../../common/observation/Subject";
import {Balance, BALANCE_ID} from "./Balance";
import {DomainEntity} from "../../common/domain/DomainEntity";
import {Observable} from "../../common/observation/Observable";
import {Observer} from "../../common/observation/Observer";
import {Observatory} from "../../common/observation/Observatory";
import {DomainHelper} from "../../common/domain/DomainHelper";

export class Balancing extends DomainEntity implements Observable<Balance> {
    constructor(domain_helper: typeof DomainHelper) {
        super(domain_helper);
        this._balances = [];
    }

    add(observer: Observer<Balance>): void {
        this._subject.add(observer)
    }

    set state(value: Balance) {
        this._subject.state = value;
    }

    get state(): Balance {
        return this._subject.state;
    }

    provide_at(observatory: Observatory): void {
        observatory.provide(this);
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

    protected _subject: Observable<Balance> = new Subject<Balance>(BALANCE_ID);

    private readonly _balances: Balance[];
    CLASS_ID: Balance = BALANCE_ID;
}
