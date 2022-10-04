"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAccountPresenter = void 0;
const { UseCasePresenter } = require("../../common/use_case/UseCasePresenter");
class CreateAccountPresenter extends UseCasePresenter {
    constructor(ipc_chanel) {
        super(ipc_chanel);
    }
    show(...data) { }
    show_cost_center_list(cost_center_list) {
        this._ipc_channel.send('create_account:show_cost_center_list', cost_center_list);
    }
    show_booking_period_list(booking_period_list) {
        this._ipc_channel.send('create_account:show_booking_period_list', booking_period_list);
    }
    show_new_accounts_list(new_entry_list) {
        this._ipc_channel.send('create_account:show_new_accounts_list', new_entry_list);
    }
    show_error(error_object) {
        let error_message = `Fehler: ${error_object.error}`;
        if (error_object.error === "ACCOUNT_EXIST") {
            error_message = `Das Konto ${error_object.booking_period} - ${error_object.cost_center} existiert breits.\n
            Es wurde kein neues Konto anglegt.`;
        }
        this._ipc_channel.send('create_account:show_error', error_message);
    }
    account_creation_done() {
        this._ipc_channel.send('create_account:done');
    }
}
exports.CreateAccountPresenter = CreateAccountPresenter;
module.exports = { CreateAccountPresenter };
//# sourceMappingURL=CreateAccountPresenter.js.map