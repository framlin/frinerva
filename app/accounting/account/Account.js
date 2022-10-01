"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
class Account {
    constructor(_booking_period, _cost_center) {
        this._booking_period = _booking_period;
        this._cost_center = _cost_center;
        this._booking_entries = [];
    }
    get cost_center() {
        return this._cost_center;
    }
    get booking_period() {
        return this._booking_period;
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
        let account = new Account(account_data._booking_period, account_data._cost_center);
        account.booking_entries = account_data._booking_entries;
        return account;
    }
}
exports.Account = Account;
module.exports = Account;
//# sourceMappingURL=Account.js.map