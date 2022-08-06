class Balance{
    constructor(name, booking_period) {
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

    add(account) {
        this._accounts.push(account);
    }

    serialize() {
        return JSON.stringify(this);
    }

    static create_from_JSON(serialized_balance) {
        let balance_data = JSON.parse(serialized_balance);
        let balance = new Balance(balance_data._name, balance_data._booking_period);
        balance.accounts = balance_data._accounts;
        return balance;
    }
}

module.exports = Balance;