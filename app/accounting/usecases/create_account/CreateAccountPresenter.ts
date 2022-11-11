import {UseCasePresenter} from "../../../common/usecase/UseCasePresenter";
import {AccountDescriptionLabel} from "./AccountDescriptionLabel";
import {CreateAccountResponseBoundary} from "./CreateAccountResponseBoundary";
import {CreateAccountResponseChannelName} from "./CreateAccountResponseChannelName";

export class CreateAccountPresenter extends UseCasePresenter implements CreateAccountResponseBoundary{
    show_cost_center_list(cost_center_list: string[]) {
        const channel:CreateAccountResponseChannelName = 'create_account:show_cost_center_list';
        this._response_channel.send(channel, cost_center_list);
    }

    show_booking_period_list(booking_period_list: string[]) {
        const channel:CreateAccountResponseChannelName = 'create_account:show_booking_period_list';
        this._response_channel.send(channel, booking_period_list);
    }

    show_new_accounts_list(new_entry_list: AccountDescriptionLabel[]) {
        const channel:CreateAccountResponseChannelName = 'create_account:show_new_accounts_list';
        this._response_channel.send(channel, new_entry_list);
    }

    show_error(error_object: any) {
        let error_message = `Fehler: ${error_object.error}`
        if (error_object.error === "ACCOUNT_EXIST") {
            error_message = `Das Konto ${error_object.booking_period} - ${error_object.cost_center} existiert breits.\n
            Es wurde kein neues Konto anglegt.`
        }
        const channel:CreateAccountResponseChannelName = 'create_account:show_error';
        this._response_channel.send(channel, error_message);
    }

    account_creation_done() {
        const channel:CreateAccountResponseChannelName = "create_account:account_creation_done";
        this._response_channel.send(channel);
    }

    show(...data: unknown[]): void {
    }
}

