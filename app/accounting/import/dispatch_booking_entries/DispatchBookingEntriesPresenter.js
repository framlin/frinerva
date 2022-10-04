"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchBookingEntriesPresenter = void 0;
const BookingEntry_1 = require("../../account/BookingEntry");
const { UseCasePresenter } = require("../../../common/use_case/UseCasePresenter");
let presenter;
class DispatchBookingEntriesPresenter extends UseCasePresenter {
    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }
    implement_booking_entry_data() {
        let properties = BookingEntry_1.BookingEntry.property_mapping.slice();
        let entry = properties.reduce((previous, current) => {
            previous[current] = "";
            return previous;
        }, {});
        return entry;
    }
    show(_virtual_accounts) {
        let properties = BookingEntry_1.BookingEntry.property_mapping.slice();
        let virtual_accounts = [];
        for (let _account of _virtual_accounts) {
            let virtual_account = {
                booking_period: _account.booking_period,
                cost_center: _account.cost_center,
                booking_entries: []
            };
            for (let _entry of _account.booking_entries) {
                let entry = this.implement_booking_entry_data();
                for (let prop of properties) {
                    // @ts-ignore
                    entry[prop] = _entry["_" + prop];
                }
                virtual_account.booking_entries.push(entry);
            }
            virtual_accounts.push(virtual_account);
        }
        this._ipc_channel.send('dispatch_booking_entries:show_virtual_accounts', virtual_accounts);
    }
}
exports.DispatchBookingEntriesPresenter = DispatchBookingEntriesPresenter;
module.exports = { DispatchBookingEntriesPresenter };
//# sourceMappingURL=DispatchBookingEntriesPresenter.js.map