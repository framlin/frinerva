import {UseCasePresenter} from "../../../common/use_case/UseCasePresenter";
import {AccountDescriptionLabel} from "./AccountDescriptionLabel";
import {CreateAccountResponseBoundary} from "./CreateAccountResponseBoundary";

export class CreateAccountPresenter extends UseCasePresenter implements CreateAccountResponseBoundary{
    show_cost_center_list(cost_center_list: string[]) {
        this._ipc_channel.send('create_account:show_cost_center_list', cost_center_list);
    }

    show_booking_period_list(booking_period_list: string[]) {
        this._ipc_channel.send('create_account:show_booking_period_list', booking_period_list);
    }

    show_new_accounts_list(new_entry_list: AccountDescriptionLabel[]) {
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

    show(...data: unknown[]): void {
    }
}

