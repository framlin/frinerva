import {Account, AccountData} from "../../account/Account";
import {WebContents} from 'electron';
import {BookingEntryData} from "../../account/BookingEntry";

const UseCasePresenter = require("../../../common/use_case/UseCasePresenter");
let presenter: DispatchBookingEntriesPresenter;


class DispatchBookingEntriesPresenter extends UseCasePresenter {

    constructor(ipc_chanel: WebContents) {
        super(ipc_chanel);
        presenter = this;
    }

    show_virtual_accounts(_virtual_accounts: Account[]) {
        let virtual_accounts: AccountData[]  = [];
        for (let _account of _virtual_accounts) {
            let virtual_account:AccountData = {
                booking_period: _account.booking_period,
                cost_center: _account.cost_center,
                booking_entries: []
            }
            for (let _entry of _account.booking_entries) {
                // @ts-ignore
                let entry : BookingEntryData = {};
                for (let _prop of Object.getOwnPropertyNames(_entry)) {
                    // @ts-ignore
                    entry[_prop.substring(1)] = _entry[_prop];
                }
                virtual_account.booking_entries.push(entry);
            }
            virtual_accounts.push(virtual_account);
        }

        this._ipc_channel.send('dispatch_booking_entries:show_virtual_accounts', virtual_accounts);
    }
}
module.exports = DispatchBookingEntriesPresenter;
export {DispatchBookingEntriesPresenter}