import {Account, AccountData} from "../../account/Account";
import {WebContents} from 'electron';
import {BookingEntry, BookingEntryData} from "../../account/BookingEntry";
import {DispatchBookingEntriesResponseBoundary} from "./DispatchBookingEntriesResponseBoundary";

const {UseCasePresenter} = require("../../../common/use_case/UseCasePresenter");
let presenter: DispatchBookingEntriesPresenter;


class DispatchBookingEntriesPresenter extends UseCasePresenter implements DispatchBookingEntriesResponseBoundary{

    constructor(ipc_chanel: WebContents) {
        super(ipc_chanel);
        presenter = this;
    }

    private implement_booking_entry_data() {
        let properties = BookingEntry.property_mapping.slice();
        let entry: BookingEntryData = properties.reduce((previous: any, current: any) => {
            previous[current] = ""
            return previous;
        }, {});
        return entry;
    }

    show(_virtual_accounts: Account[]) {
        let properties = BookingEntry.property_mapping.slice();
        let virtual_accounts: AccountData[]  = [];
        for (let _account of _virtual_accounts) {
            let virtual_account:AccountData = {
                booking_period: _account.booking_period,
                cost_center: _account.cost_center,
                booking_entries: []
            }
            for (let _entry of _account.booking_entries) {
                let entry : BookingEntryData = this.implement_booking_entry_data();
                for (let prop of properties) {
                    // @ts-ignore
                    entry[prop] = _entry["_"+prop];
                }
                virtual_account.booking_entries.push(entry);
            }
            virtual_accounts.push(virtual_account);
        }

        this._ipc_channel.send('dispatch_booking_entries:show_virtual_accounts', virtual_accounts);
    }
}
module.exports = {DispatchBookingEntriesPresenter};
export {DispatchBookingEntriesPresenter}