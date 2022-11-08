import {UseCaseController} from "../../../../common/use_case/UseCaseController";
import {AccountData} from "../../../entites/Account";
import {DispatchBookingEntriesInteractor} from "./DispatchBookingEntriesInteractor";

export class DispatchBookingEntriesController extends UseCaseController {
    register_request_channel_receiver() {
        super.register_request_channel_receiver();
        this._request_channel.register_receiver('create_account:submit', (e, virtual_account: AccountData) => {
            this.on_submit(virtual_account);
        });
    }

    on_submit(virtual_account: AccountData) {
        (this._request_boundary as DispatchBookingEntriesInteractor).submit(virtual_account);
    }

}

