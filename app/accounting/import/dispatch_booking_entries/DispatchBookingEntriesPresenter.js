const UseCasePresenter = require("../../../common/use_case/UseCasePresenter");
let presenter;

class DispatchBookingEntriesPresenter extends UseCasePresenter {

    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }

    show_virtual_accounts(_virtual_accounts) {
        let virtual_accounts = [];
        for (let _account of _virtual_accounts) {
            let virtual_account = {
                booking_period: _account._booking_period,
                cost_center: _account.cost_center,
                booking_entries: []
            }
            for (let _entry of _account._booking_entries) {
                let entry = {}
                for (let _prop of Object.getOwnPropertyNames(_entry)) {
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