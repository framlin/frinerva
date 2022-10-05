"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchBookingEntriesPresenter = void 0;
const UseCasePresenter_1 = require("../../../common/use_case/UseCasePresenter");
let presenter;
class DispatchBookingEntriesPresenter extends UseCasePresenter_1.UseCasePresenter {
    constructor(ipc_chanel) {
        super(ipc_chanel);
        presenter = this;
    }
    show(_virtual_accounts) {
        this._ipc_channel.send('dispatch_booking_entries:show_virtual_accounts', _virtual_accounts);
    }
}
exports.DispatchBookingEntriesPresenter = DispatchBookingEntriesPresenter;
module.exports = { DispatchBookingEntriesPresenter };
//# sourceMappingURL=DispatchBookingEntriesPresenter.js.map