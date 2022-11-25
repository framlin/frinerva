import {Account} from "../../accounting/entites/Account";

type BlanceHandle = {name: string; booking_period: string}

export class Balance{
    _name: string;
    _booking_period: string;
    _accounts: Account[];

    //{booking_period, cost_center}: AccountHandle
    constructor({name, booking_period}: BlanceHandle) {
        this._name = name;
        this._booking_period = booking_period;
        this._accounts = [];
    }

    get name() {
        return this._name;
    }

    get booking_period() {
        return this._booking_period;
    }

    get accounts() {
        return this._accounts;
    }

    set accounts(accounts) {
        this._accounts = accounts;
    }

    add(account: Account) {
        this._accounts.push(account);
    }

    serialize() {
        return JSON.stringify(this);
    }

    static create_from_JSON(serialized_balance: string) {
        let balance_data = JSON.parse(serialized_balance);
        let balance = new Balance({
            name: balance_data._name,
            booking_period: balance_data._booking_period
        });
        balance.accounts = balance_data._accounts;
        return balance;
    }
}

export const BALANCE_ID = new Balance({
    booking_period: "",
    name: ""
});
