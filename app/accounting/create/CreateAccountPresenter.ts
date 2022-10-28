import {CreateAccountResponseBoundary} from "./CreateAccountResponseBoundary";
import {WebContents} from "electron";

const {UseCasePresenter} = require("../../common/use_case/UseCasePresenter");

class CreateAccountPresenter extends UseCasePresenter implements CreateAccountResponseBoundary{
    constructor(ipc_chanel: WebContents) {
        super(ipc_chanel);
    }

    show(...data: any[]) {}

    show_cost_center_list(cost_center_list: any) {
        this._ipc_channel.send('create_account:show_cost_center_list', cost_center_list);
    }

    show_booking_period_list(booking_period_list: any) {
        this._ipc_channel.send('create_account:show_booking_period_list', booking_period_list);
    }

    show_new_accounts_list(new_entry_list: any) {
        this._ipc_channel.send('create_account:show_new_accounts_list', new_entry_list);
    }

    show_error(error_object: any) {
        let error_message = `Fehler: ${error_object.error}`
        if (error_object.error === "ACCOUNT_EXIST") {
            error_message = `Das Konto ${error_object.booking_period} - ${error_object.cost_center} existiert breits.\n
            Es wurde kein neues Konto anglegt.`
        }
        this._ipc_channel.send('create_account:show_error', error_message);
    }

    account_creation_done() {
        this._ipc_channel.send('create_account:done');
    }

}

module.exports = {CreateAccountPresenter};
export {CreateAccountPresenter}