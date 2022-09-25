const UseCasePresenter = require("../../../common/use_case/UseCasePresenter");
let presenter;

class DispatchBookingEntriesPresenter extends UseCasePresenter {

    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }

    show_virtual_accounts(virtual_accounts) {
        this._ipc_channel.send('dispatch_booking_entries:show_virtual_accounts', virtual_accounts);
    }
}
module.exports = DispatchBookingEntriesPresenter;