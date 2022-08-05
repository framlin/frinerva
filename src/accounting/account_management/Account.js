class Account {
    constructor(name, cost_center) {
        this._name = name;
        this._cost_center = cost_center;
        this._booking_entries = [];
    }

    get cost_center() {
        return this._cost_center;
    }

    get name() {
        return this._name;
    }

    get booking_entries() {
        return this._booking_entries;
    }

    set booking_entries(booking_entries) {
        this._booking_entries = booking_entries;
    }

    add(booking_entry) {
        this._booking_entries.push(booking_entry);
    }

    serialize() {
        return JSON.stringify(this);
    }

    static create_from_JSON(json_string) {
        let account_data = JSON.parse(json_string);
        let account = new Account(account_data._name, account_data._cost_center);
        account.booking_entries = account_data._booking_entries;
        return account;
    }

}

module.exports = Account;