"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchBookingEntriesInteractor = void 0;
const Accounting_1 = require("../../account/Accounting");
const UseCaseInteractor_1 = require("../../../common/use_case/UseCaseInteractor");
const BookingEntry_1 = require("../../account/BookingEntry");
class DispatchBookingEntriesInteractor extends UseCaseInteractor_1.UseCaseInteractor {
    async execute(booking_records) {
        let account_dict = this.create_account_dict(booking_records);
        let virtual_accounts = await this.create_virtual_accounts(account_dict);
        this.response_boundary.show(virtual_accounts);
    }
    create_account_dict(booking_records) {
        let result = {};
        for (let booking_record of booking_records) {
            let { booking_entry, cost_center, booking_period } = booking_record;
            let key = `${booking_period}!${cost_center}`;
            if (key in result) {
                result[key].push(booking_entry);
            }
            else {
                result[key] = [booking_entry];
            }
        }
        return result;
    }
    _extract_account_data(account) {
        let result = {
            booking_entries: [],
            booking_period: account.booking_period,
            cost_center: account.cost_center
        };
        for (let booking_entry of account.booking_entries) {
            let booking_entry_data = BookingEntry_1.BookingEntry.implement_booking_entry_data();
            for (let prop in booking_entry_data) {
                // @ts-ignore
                booking_entry_data[prop] = booking_entry[prop];
            }
            result.booking_entries.push(booking_entry_data);
        }
        return result;
    }
    async create_virtual_accounts(account_dict) {
        let accounting = new Accounting_1.Accounting(this.helper);
        let result = [];
        let keys = Object.keys(account_dict);
        for await (let account_key of keys) {
            let [booking_period, cost_center] = account_key.split('!');
            let account = await accounting.create_virtual_account(booking_period, cost_center);
            let account_data = this._extract_account_data(account);
            let booking_entries = account_dict[account_key];
            for (let booking_entry of booking_entries) {
                account_data.booking_entries.push(booking_entry);
            }
            result.push(account_data);
        }
        return result;
    }
    get helper() {
        return this._helper;
    }
    get response_boundary() {
        return this._response_boundary;
    }
    set helper(value) {
        this._helper = value;
    }
    set response_boundary(value) {
        this._response_boundary = value;
    }
}
exports.DispatchBookingEntriesInteractor = DispatchBookingEntriesInteractor;
module.exports = { DispatchBookingEntriesInteractor };
//# sourceMappingURL=DispatchBookingEntriesInteractor.js.map