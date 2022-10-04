"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchBookingEntriesInteractor = void 0;
const Accounting_1 = require("../../account/Accounting");
const { UseCaseInteractor } = require("../../../common/use_case/UseCaseInteractor");
//const {Accounting} = require("../../account/Accounting");
class DispatchBookingEntriesInteractor extends UseCaseInteractor {
    async execute(booking_records) {
        let account_dict = this.create_account_dict(booking_records);
        let virtual_accounts = await this.create_virtual_accounts(account_dict);
        this._response_boundary.show(virtual_accounts);
    }
    create_account_dict(booking_records) {
        let result = {};
        for (let booking_record of booking_records) {
            let { booking_entry, cost_center, year } = booking_record;
            let key = `${year}!${cost_center}`;
            if (key in result) {
                result[key].push(booking_entry);
            }
            else {
                result[key] = [booking_entry];
            }
        }
        return result;
    }
    async create_virtual_accounts(account_dict) {
        let accounting = new Accounting_1.Accounting(this._helper);
        let result = [];
        let keys = Object.keys(account_dict);
        for await (let account_key of keys) {
            let [booking_period, cost_center] = account_key.split('!');
            let account = await accounting.create_virtual_account(booking_period, cost_center);
            let booking_entries = account_dict[account_key];
            for (let booking_entry of booking_entries) {
                account.booking_entries.push(booking_entry);
            }
            result.push(account);
        }
        return result;
    }
}
exports.DispatchBookingEntriesInteractor = DispatchBookingEntriesInteractor;
module.exports = { DispatchBookingEntriesInteractor };
//# sourceMappingURL=DispatchBookingEntriesInteractor.js.map